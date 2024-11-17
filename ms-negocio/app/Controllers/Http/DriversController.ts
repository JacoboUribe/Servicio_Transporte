import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';
import DriverValidator from 'App/Validators/DriverValidator';

export default class DriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDriver: Driver = await Driver.findOrFail(params.id)
            theDriver.load("spents")
            theDriver.load("turns")
            theDriver.load("vehicle_drivers")
            theDriver.load("owners")
            return theDriver;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Driver.query().preload("spents").preload("turns").preload("vehicle_drivers").preload("owners").paginate(page, perPage)
            } else {
                return await Driver.query().preload("spents").preload("turns").preload("vehicle_drivers").preload("owners")
            }
        }
    }
    
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DriverValidator)
        const theDriver = await Driver.create(body)
        return theDriver
    }

    public async update({ params, request }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
        const body =await request.validate(DriverValidator);
        theDriver.license_expiration_date = body.license_expiration_date;
        theDriver.license_number = body.license_number;
        theDriver.contact_phone = body.contact_phone;
        theDriver.user_id = body.user_id;
        return await theDriver.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
            response.status(204);
            return await theDriver.delete();
    }
}
