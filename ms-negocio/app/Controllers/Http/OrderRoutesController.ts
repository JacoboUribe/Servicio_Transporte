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
        const body = await request.validate(OrderRouteValidator)
        const theOrderRoute = await OrderRoute.create(body)
        return theOrderRoute
    }
}
