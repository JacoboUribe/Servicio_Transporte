import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lot from 'App/Models/Lot';
import LotValidator from 'App/Validators/LotValidator';

export default class LotsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theLot: Lot = await Lot.findOrFail(params.id)
            theLot.load("products")
            return theLot;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Lot.query().preload("products").paginate(page, perPage)
            } else {
                return await Lot.query().preload("products")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(LotValidator)
        const theLot = await Lot.create(body)
        return theLot
    }

    public async update({ params, request }: HttpContextContract) {
        const theLot: Lot = await Lot.findOrFail(params.id);
        const body =await request.validate(LotValidator);
        theLot.weight = body.weight;
        theLot.route_id = body.route_id;
        theLot.order_route_id = body.order_route_id;
        return await theLot.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLot: Lot = await Lot.findOrFail(params.id);
            response.status(204);
            return await theLot.delete();
    }
}
