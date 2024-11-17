import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NaturalPeople from 'App/Models/NaturalPeople';
import NaturalPerson from 'App/Models/NaturalPeople';
import NaturalPeopleValidator from 'App/Validators/NaturalPeopleValidator';

export default class NaturalPeopleController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id)
            return theNaturalPerson;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await NaturalPerson.query().paginate(page, perPage)
            } else {
                return await NaturalPerson.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(NaturalPeopleValidator)
        const theNaturalPeople = await NaturalPeople.create(body)
        return theNaturalPeople
    }

    public async update({ params, request }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
        const body = await request.validate(NaturalPeopleValidator);
        theNaturalPerson.type_document = body.type_document;
        theNaturalPerson.birthdate = body.birthdate;
        theNaturalPerson.customer_id = body.customer_id;
        theNaturalPerson.business_id = body.business_id;
        theNaturalPerson.user_id = body.user_id;
        return await theNaturalPerson.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(params.id);
            response.status(204);
            return await theNaturalPerson.delete();
    }
}
