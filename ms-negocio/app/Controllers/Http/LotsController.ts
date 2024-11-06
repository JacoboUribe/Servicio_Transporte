import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lot from 'App/Models/Lot';

export default class LotsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theLot: Lot = await Lot.findOrFail(params.id)
            return theLot;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Lot.query().paginate(page, perPage)
            } else {
                return await Lot.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theLot: Lot = await Lot.create(body);
        return theLot;
    }

    public async update({ params, request }: HttpContextContract) {
        const theLot: Lot = await Lot.findOrFail(params.id);
        const body = request.body();
        theLot.weight = body.weight;
        return await theLot.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLot: Lot = await Lot.findOrFail(params.id);
            response.status(204);
            return await theLot.delete();
    }
}
