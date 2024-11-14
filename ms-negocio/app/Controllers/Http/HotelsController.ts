import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hotel from "App/Models/Hotel";

export default class HotelsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theHotel: Hotel = await Hotel.findOrFail(params.id)
            return theHotel;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Hotel.query().paginate(page, perPage)
            } else {
                return await Hotel.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theHotel: Hotel = await Hotel.create(body);
        return theHotel;
    }

    public async update({ params, request }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
        const body = request.body();
        theHotel.hotel_name = body.hotel_name;
        theHotel.hotel_address = body.hotel_address;
        theHotel.stars = body.stars;
        return await theHotel.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
            response.status(204);
            return await theHotel.delete();
    }
}
