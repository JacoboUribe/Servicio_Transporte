import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';
import BusinessValidator from 'App/Validators/BusinessValidator';

export default class BusinessesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theBusiness: Business = await Business.findOrFail(params.id)
            return theBusiness;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Business.query().paginate(page, perPage)
            } else {
                return await Business.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(BusinessValidator)
        const theBusiness = await Business.create(body)
        return theBusiness
    }

    public async update({ params, request }: HttpContextContract) {
        const theBusiness: Business = await Business.findOrFail(params.id);
        const body = await request.validate(BusinessValidator);
        theBusiness.type_company = body.type_company;
        theBusiness.address = body.address;
        theBusiness.customer_id = body.customer_id;
        return await theBusiness.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBusiness: Business = await Business.findOrFail(params.id);
            response.status(204);
            return await theBusiness.delete();
    }
}
