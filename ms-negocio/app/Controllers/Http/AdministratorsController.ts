import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import DriverValidator from "App/Validators/DriverValidator";
import { Exception } from "@adonisjs/core/build/standalone";

export default class DriversController {
  
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const driver = await Driver.findOrFail(params.id);  
      const userData = await this.getUserData(driver.user_id, request.headers().authorization || "");  
      await this.loadDriverRelations(driver);

      if (!userData) {
        throw new Exception("No se encontró información de usuario en el microservicio", 404);  
      }

      return { driver, user: userData };  
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);  
      } else {
        return await Driver.query();  
      }
    }
  }


  public async create({ request, response }: HttpContextContract) {
    const body = request.body();  

    await request.validate(DriverValidator);

    const userData = await this.getUserData(body.user_id, request.headers().authorization || "");

    if (!userData) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto", 
      });
    }

    const driver = await Driver.create(body);
    return driver;
  }

  public async update({ params, request }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);  
    const body = request.body();  
    driver.user_id = body.user_id;
    driver.license_number = body.license_number;
    driver.license_expiration_date = body.license_expiration_date;
    driver.contact_phone = body.contact_phone;

    return await driver.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);  
    response.status(204);  
    return await driver.delete();
  }

  private async getUserData(userId: string, authorization: string) {
    try {
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${userId}`,
        {
          headers: { Authorization: authorization || "" },
        }
      );
      return userResponse.data;  
    } catch (error) {
      return null;  
    }
  }

  private async loadDriverRelations(driver: Driver) {
    await driver.load("spents");  
    await driver.load("turns");  
    await driver.load("vehicle_drivers"); 
    await driver.load("owners");  
  }
}
