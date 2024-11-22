import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from 'App/Models/Route';
import RouteValidator from 'App/Validators/RouteValidator';

export default class RoutesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoute: Route = await Route.findOrFail(params.id)
            return theRoute;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Route.query().paginate(page, perPage)
            } else {
                return await Route.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(RouteValidator)
        const body = request.body();
        const theRoute: Route = await Route.create(body);
        return theRoute
    }

    public async update({ params, request }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
        const body = await request.validate(RouteValidator);
        theRoute.starting_point = body.starting_point;
        theRoute.destination_point = body.destination_point;
        theRoute.distance = body.distance;
        theRoute.delivery_date = body.delivery_date;
        theRoute.contract_id = body.contract_id;
        theRoute.vehicle_id = body.vehicle_id;
        return await theRoute.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoute: Route = await Route.findOrFail(params.id);
            response.status(204);
            return await theRoute.delete();
    }

    
}
