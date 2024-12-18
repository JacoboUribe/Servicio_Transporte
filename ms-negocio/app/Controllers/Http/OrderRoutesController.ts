import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderRoute from 'App/Models/OrderRoute';
import OrderRouteValidator from 'App/Validators/OrderRouteValidator';

export default class OrderRoutesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOrderRoute: OrderRoute = await OrderRoute.findOrFail(params.id)
            theOrderRoute.load("lots")
            return theOrderRoute;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await OrderRoute.query().preload("lots").paginate(page, perPage)
            } else {
                return await OrderRoute.query().preload("lots")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(OrderRouteValidator)
        const body = request.body();
        const theOrderRoute: OrderRoute = await OrderRoute.create(body);
        return theOrderRoute
    }

     public async update({ params, request }: HttpContextContract) {
            const theOrderRoute: OrderRoute = await OrderRoute.findOrFail(params.id);
            const body = await request.validate(OrderRouteValidator);
            theOrderRoute.route_id = body.route_id;
            theOrderRoute.address_id = body.address_id;
            return await theOrderRoute.save();
        }
    
        public async delete({ params, response }: HttpContextContract) {
            const theOrderRoute: OrderRoute = await OrderRoute.findOrFail(params.id);
                response.status(204);
                return await theOrderRoute.delete();
        }
}
