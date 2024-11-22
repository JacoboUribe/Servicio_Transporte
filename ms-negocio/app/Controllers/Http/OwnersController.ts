import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Owner from "App/Models/Owner";
import OwnerValidator from "App/Validators/OwnerValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

export default class OwnersController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const theOwner: Owner = await Owner.findOrFail(params.id);
      const userResponse = await this.getUserData(theOwner.user_id, request.headers().authorization || "");
      await theOwner.load("drivers");
      await theOwner.load("vehicle_owners");

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception("No se encontró información de usuario en el microservicio", 404);
      }

      return { cliente: theOwner, usuario: userResponse.data };
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Owner.query().paginate(page, perPage);
      } else {
        return await Owner.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(OwnerValidator);
    const userResponse = await this.getUserData(body.user_id, request.headers().authorization || "");

    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto",
      });
    }

    const theOwner: Owner = await Owner.create(body);
    await theOwner.load("drivers");
    await theOwner.load("vehicle_owners");

    return theOwner;
  }

  public async update({ params, request }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    const body = await request.validate(OwnerValidator);

    theOwner.user_id = body.user_id;
    theOwner.phone = body.phone;
    theOwner.driver_id = body.driver_id;

    await theOwner.load("drivers");
    await theOwner.load("vehicle_owners");

    return await theOwner.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theOwner: Owner = await Owner.findOrFail(params.id);
    await theOwner.delete();

    response.status(204);
  }

  private async getUserData(userId: string, authorization: string) {
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/api/users/${userId}`,
      {
        headers: { Authorization: authorization || "" },
      }
    );
    return userResponse;
  }
}
