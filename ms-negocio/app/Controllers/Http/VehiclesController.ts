import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle';
import VehicleValidator from 'App/Validators/VehicleValidator';

export default class VehiclesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicle: Vehicle = await Vehicle.findOrFail(params.id)
            theVehicle.load("operations")
            theVehicle.load("routes")
            theVehicle.load("vehicle_owners")
            theVehicle.load("vehicles_drivers")
            theVehicle.load("insurances")
            return theVehicle;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Vehicle.query().preload("operations").preload("routes").preload("vehicle_owners").preload("vehicles_drivers").preload("insurances").paginate(page, perPage)
            } else {
                return await Vehicle.query().preload("operations").preload("routes").preload("vehicle_owners").preload("vehicles_drivers").preload("insurances")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(VehicleValidator)
        const body = request.body();
        const theVehicle: Vehicle = await Vehicle.create(body);
        return theVehicle
    }


    public async update({ params, request }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
        const body = await request.validate(VehicleValidator);
        theVehicle.license = body.license;
        theVehicle.model = body.model;
        theVehicle.load_capacity = body.load_capacity;
        return await theVehicle.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehicle: Vehicle = await Vehicle.findOrFail(params.id);
            response.status(204);
            return await theVehicle.delete();
    }
}
