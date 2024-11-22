import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrator from "App/Models/Administrator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import AdministratorValidator from "App/Validators/AdministratorValidator";
import { Exception } from "@adonisjs/core/build/standalone";

export default class AdministratorsController {
  
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const administrator = await Administrator.findOrFail(params.id);
      const userData = await this.getUserData(administrator.user_id, request.headers().authorization || "");
      await this.loadAdministratorRelations(administrator);
      if (!userData) {
        throw new Exception("No se encontró información de usuario en el microservicio", 404);
      }

      return { administrator, user: userData };
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Administrator.query().preload("services").paginate(page, perPage);
      } else {
        return await Administrator.query();
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = request.body();
    await request.validate(AdministratorValidator);

    const userData = await this.getUserData(body.user_id, request.headers().authorization || "");

    if (!userData) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto", 
      });
    }

    const administrator = await Administrator.create(body);
    return administrator;
  }

  public async update({ params, request }: HttpContextContract) {
    const administrator = await Administrator.findOrFail(params.id);
    const body = request.body();
    administrator.user_id = body.user_id;
    administrator.service_id = body.service_id;
    administrator.type_administrator = body.type_administrator;
    return await administrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const administrator = await Administrator.findOrFail(params.id);
    response.status(204);
    return await administrator.delete();
  }

  private async getUserData(userId: string, authorization: string) {
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/api/users/${userId}`,
      {
        headers: { Authorization: authorization || "" },
      }
    );
    return userResponse.data;
  }

  private async loadAdministratorRelations(administrator: Administrator) {
    await administrator.load("services");
  }
}
