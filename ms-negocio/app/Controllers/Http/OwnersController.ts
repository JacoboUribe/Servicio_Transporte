import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id)
            await this.loadOwnerRelations(theOwner);
            const userData = await this.getUserData(theOwner.user_id, request.headers().authorization || "");
            return { owner: theOwner, usuario: userData };
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().preload("vehicle_owners").preload("spents").paginate(page, perPage)
            } else {
                return await Owner.query().preload("vehicle_owners").preload("spents")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(OwnerValidator)
        const userResponse = await axios.get(
            `${Env.get("MS_SECURITY")}/api/users/${body.user_id}`,
            {
                headers: { Authorization: request.headers().authorization || "" },
            }
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            return { error: "No se encontró información de usuario, verifique que el código sea correcto" };
        }
        const theOwner = await Owner.create(body)
        return theOwner
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = await request.validate(OwnerValidator);
        theOwner.phone = body.phone;
        theOwner.date_of_acquisition = body.date_of_acquisition;
        theOwner.user_id = body.user_id;
        theOwner.driver_id = body.driver_id;
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        response.status(204);
        return await theOwner.delete();
    }

    private async loadOwnerRelations(owner: Owner) {
        await owner.load("vehicle_owners");
        await owner.load("spents");
        return owner;
    }

    private async getUserData(userId: string, authorization: string) {
        const userResponse = await axios.get(
            `${Env.get("MS_SECURITY")}/api/users/${userId}`,
            {
                headers: { Authorization: authorization || "" },
            }
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            return { error: "No se encontró información de usuario" };
        }
        return userResponse.data;
    }
}
