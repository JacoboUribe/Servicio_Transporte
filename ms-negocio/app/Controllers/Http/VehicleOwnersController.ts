import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleOwner from 'App/Models/VehicleOwner';
import VehicleOwnerOwner from 'App/Models/VehicleOwner';
import VehicleOwnerValidator from 'App/Validators/VehicleOwnerValidator';

export default class VehicleOwnerOwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicleOwnerOwner: VehicleOwnerOwner = await VehicleOwnerOwner.findOrFail(params.id)
            return theVehicleOwnerOwner;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehicleOwnerOwner.query().paginate(page, perPage)
            } else {
                return await VehicleOwnerOwner.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(VehicleOwnerValidator)
        const body = request.body();
        const theVehicleOwner: VehicleOwner = await VehicleOwner.create(body);
        return theVehicleOwner
    }
}
