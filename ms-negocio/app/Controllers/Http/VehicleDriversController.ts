import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleDriver from 'App/Models/VehicleDriver';
import VehicleDriverDriver from 'App/Models/VehicleDriver';
import VehicleDriverValidator from 'App/Validators/VehicleDriverValidator';

export default class VehicleDriverDriversController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicleDriverDriver: VehicleDriverDriver = await VehicleDriverDriver.findOrFail(params.id)
            return theVehicleDriverDriver;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehicleDriverDriver.query().paginate(page, perPage)
            } else {
                return await VehicleDriverDriver.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(VehicleDriverValidator)
        const body = request.body();
        const theVehicleDriver: VehicleDriver = await VehicleDriver.create(body);
        return theVehicleDriver
    }
}
