import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';

export default class DriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDriver: Driver = await Driver.findOrFail(params.id)
            return theDriver;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Driver.query().paginate(page, perPage)
            } else {
                return await Driver.query()
            }
        }
    }
    
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theDriver: Driver = await Driver.create(body);
        return theDriver;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
        const body = request.body();
        theDriver.license_expiration_date = body.license_expiration_date;
        theDriver.license_number = body.license_number;
        theDriver.contact_phone = body.contact_phone;
        return await theDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
            response.status(204);
            return await theDriver.delete();
    }
}
