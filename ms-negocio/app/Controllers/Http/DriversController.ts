import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Driver from 'App/Models/Driver';
import DriverValidator from 'App/Validators/DriverValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class DriversController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const driver = await Driver.findOrFail(params.id);
      const userData = await this.getUserData(
        driver.user_id,
        request.headers().authorization || ""
      );
      await this.loadDriverRelations(driver);
      return { driver, usuario: userData };
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
    const userResponse = await this.getUserData(
      body.user_id,
      request.headers().authorization || ""
    );
    if (!userResponse) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto",
      });
    }
    const licenseExpirationDate = body.license_expiration_date.replace(/T.*/, '');
    const newDriver = await Driver.create({
      user_id: body.user_id,
      license_number: body.license_number,
      license_expiration_date: licenseExpirationDate,
      contact_phone: body.contact_phone,
    });
    return newDriver;
  }

  public async update({ params, request }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);
    const body = await request.validate(DriverValidator);
    driver.license_expiration_date = body.license_expiration_date;
    driver.license_number = body.license_number;
    driver.contact_phone = body.contact_phone;
    driver.user_id = body.user_id;
    await this.loadDriverRelations(driver);
    return await driver.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);
    response.status(204);
    return await driver.delete();
  }

  private async getUserData(userId: string, authorization: string) {
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/api/users/${userId}`,
      {
        headers: { Authorization: authorization || "" },
      }
    );
    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      return null;
    }
    return userResponse.data;
  }

  private async loadDriverRelations(driver: Driver) {
    await driver.load("spents");
    await driver.load("turns");
    await driver.load("vehicle_drivers");
    await driver.load("owners");
    return driver;
  }
}
