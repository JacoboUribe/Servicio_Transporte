import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Driver from "App/Models/Driver";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import DriverValidator from "App/Validators/DriverValidator";
import { Exception } from "@adonisjs/core/build/standalone";

export default class DriversController {
  
  // Método para obtener el driver y los datos del usuario
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      const driver = await Driver.findOrFail(params.id);  // Buscar el conductor por ID
      const userData = await this.getUserData(driver.user_id, request.headers().authorization || "");  // Obtener datos del usuario

      // Cargar las relaciones del conductor
      await this.loadDriverRelations(driver);

      if (!userData) {
        throw new Exception("No se encontró información de usuario en el microservicio", 404);  // Si no hay datos del usuario
      }

      return { driver, user: userData };  // Devolver los datos del conductor y usuario
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);  // Paginación
      } else {
        return await Driver.query();  // Obtener todos los conductores si no hay paginación
      }
    }
  }

  // Método para crear un nuevo driver
  public async create({ request, response }: HttpContextContract) {
    const body = request.body();  // Obtener datos del cuerpo de la solicitud

    // Validar el cuerpo de la solicitud con el validador
    await request.validate(DriverValidator);

    // Verificar si el usuario existe
    const userData = await this.getUserData(body.user_id, request.headers().authorization || "");

    if (!userData) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto",  // Si no se encuentra el usuario
      });
    }

    // Crear el conductor si la validación y verificación del usuario son exitosas
    const driver = await Driver.create(body);
    return driver;
  }

  // Método para actualizar un driver
  public async update({ params, request }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);  // Buscar el conductor por ID
    const body = request.body();  // Obtener los datos del cuerpo de la solicitud

    // Actualizar los datos del conductor
    driver.user_id = body.user_id;
    driver.license_number = body.license_number;
    driver.license_expiration_date = body.license_expiration_date;
    driver.contact_phone = body.contact_phone;

    // Guardar los cambios del conductor
    return await driver.save();
  }

  // Método para eliminar un driver
  public async delete({ params, response }: HttpContextContract) {
    const driver = await Driver.findOrFail(params.id);  // Buscar el conductor por ID
    response.status(204);  // Responder con éxito sin contenido

    // Eliminar el conductor
    return await driver.delete();
  }

  // Método privado para obtener los datos del usuario desde el microservicio
  private async getUserData(userId: string, authorization: string) {
    try {
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${userId}`,
        {
          headers: { Authorization: authorization || "" },
        }
      );
      return userResponse.data;  // Devolver los datos del usuario si la respuesta es exitosa
    } catch (error) {
      return null;  // Si ocurre un error, retornar null (esto se manejará con la excepción más tarde)
    }
  }

  // Método privado para cargar las relaciones del conductor
  private async loadDriverRelations(driver: Driver) {
    await driver.load("spents");  // Cargar gastos
    await driver.load("turns");  // Cargar turnos
    await driver.load("vehicle_drivers");  // Cargar vehículos asignados
    await driver.load("owners");  // Cargar propietarios
  }
}
