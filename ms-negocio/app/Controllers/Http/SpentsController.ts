import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Spent from 'App/Models/Spent';
import SpentValidator from 'App/Validators/SpentValidator';

export default class SpentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSpent: Spent = await Spent.findOrFail(params.id)
            theSpent.load("bills")
            return theSpent;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Spent.query().preload("bills").paginate(page, perPage)
            } else {
                return await Spent.query().preload("bills")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(SpentValidator)
        const theSpent = await Spent.create(body)
        return theSpent
    }

    public async update({ params, request }: HttpContextContract) {
        const theSpent: Spent = await Spent.findOrFail(params.id)
        const body = await request.validate(SpentValidator)
        theSpent.details = body.details;
        theSpent.driver_id = body.driver_id;
        theSpent.service_id = body.service_id;
        return theSpent.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSpent: Spent = await Spent.findOrFail(params.id);
            response.status(204);
            return await theSpent.delete();
    }

}
