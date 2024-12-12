import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

import Owner from "App/Models/Owner";
import OwnerValidator from 'App/Validators/OwnerValidator';

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theOwner: Owner = await Owner.findOrFail(params.id);
            const userData = await this.getUserData(theOwner.user_id, request.headers().authorization || "");
            await this.loadOwnerRelations(theOwner);
            
            if (!userData) {
                throw new Exception("No se encontró información de usuario en el microservicio", 404);
            }
            
            return { owner: theOwner, user: userData };
        } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().preload("spents").preload("vehicle_owners").paginate(page, perPage);
            } else {
                return await Owner.query().preload("spents").preload("vehicle_owners");
            }
        }
    }

    public async create({ request, response }: HttpContextContract) {
        await request.validate(OwnerValidator);
        const body = request.body();
        
        const userData = await this.getUserData(body.user_id, request.headers().authorization || "");
        if (!userData) {
            return response.notFound({
                error: "No se encontró información de usuario, verifique que el código sea correcto",
            });
        }
        
        const theOwner: Owner = await Owner.create(body);
        return theOwner;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = await request.validate(OwnerValidator);
        
        theOwner.date_of_acquisition = body.date_of_acquisition;
        theOwner.driver_id = body.driver_id;
        theOwner.user_id = body.user_id;
        theOwner.phone = body.phone;
        
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);
        return await theOwner.delete();
    }

    private async getUserData(userId: string, authorization: string) {
        try {
            const userResponse = await axios.get(
                `${Env.get("MS_SECURITY")}/api/users/${userId}`,
                {
                    headers: { Authorization: authorization },
                }
            );
            return userResponse.data;
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error.message);
            return null;
        }
    }

    private async loadOwnerRelations(owner: Owner) {
        await owner.load("spents");
        await owner.load("vehicle_owners");
    }
}
