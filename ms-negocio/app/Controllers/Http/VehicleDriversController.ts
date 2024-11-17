import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleDriver from 'App/Models/VehicleDriver';
import VehicleDriverValidator from 'App/Validators/VehicleDriverValidator';

export default class VehicleDriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id)
            return theVehicleDriver;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehicleDriver.query().paginate(page, perPage)
            } else {
                return await VehicleDriver.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(VehicleDriverValidator)
        const theVehicleDriver = await VehicleDriver.create(body)
        return theVehicleDriver
    }
}
