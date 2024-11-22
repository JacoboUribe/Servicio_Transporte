import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurant from 'App/Models/Restaurant';
import RestaurantValidator from 'App/Validators/RestaurantValidator';

export default class RestaurantsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRestaurant: Restaurant = await Restaurant.findOrFail(params.id)
            return theRestaurant;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Restaurant.query().paginate(page, perPage)
            } else {
                return await Restaurant.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(RestaurantValidator)
        const body = request.body();
        const theRestaurant: Restaurant = await Restaurant.create(body);
        return theRestaurant
    }

    public async update({ params, request }: HttpContextContract) {
        const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
        const body = await request.validate(RestaurantValidator);
        theRestaurant.restaurant_name = body.restaurant_name;
        theRestaurant.restaurant_address = body.restaurant_address;
        theRestaurant.service_id = body.service_id;
        return await theRestaurant.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRestaurant: Restaurant = await Restaurant.findOrFail(params.id);
            response.status(204);
            return await theRestaurant.delete();
    }
}
