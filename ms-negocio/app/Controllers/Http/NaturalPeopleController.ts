import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NaturalPeople from 'App/Models/NaturalPeople';
import NaturalPeopleValidator from 'App/Validators/NaturalPeopleValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class NaturalPeopleController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNaturalPerson: NaturalPeople = await NaturalPeople.findOrFail(params.id)
            const userData = await this.getUserData(theNaturalPerson.user_id, request.headers().authorization || "");
            return { naturalPerson: theNaturalPerson, usuario: userData };
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await NaturalPeople.query().paginate(page, perPage)
            } else {
                return await NaturalPeople.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(NaturalPeopleValidator)
        const userResponse = await axios.get(
            `${Env.get("MS_SECURITY")}/api/users/${body.user_id}`,
            {
                headers: { Authorization: request.headers().authorization || "" },
            }
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            return { error: "No se encontró información de usuario, verifique que el código sea correcto" };
        }
        const theNaturalPeople = await NaturalPeople.create(body)
        return theNaturalPeople
    }

    public async update({ params, request }: HttpContextContract) {
        const theNaturalPerson: NaturalPeople = await NaturalPeople.findOrFail(params.id);
        const body = await request.validate(NaturalPeopleValidator);
        theNaturalPerson.type_document = body.type_document;
        theNaturalPerson.birthdate = body.birthdate;
        theNaturalPerson.customer_id = body.customer_id;
        theNaturalPerson.business_id = body.business_id;
        theNaturalPerson.user_id = body.user_id;
        return await theNaturalPerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPeople = await NaturalPeople.findOrFail(params.id);
        response.status(204);
        return await theNaturalPerson.delete();
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
