import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleOwner from 'App/Models/VehicleOwner';
import VehicleOwnerValidator from 'App/Validators/VehicleOwnerValidator';

export default class VehicleOwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehicleOwner: VehicleOwner = await VehicleOwner.findOrFail(params.id)
            return theVehicleOwner;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehicleOwner.query().paginate(page, perPage)
            } else {
                return await VehicleOwner.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(VehicleOwnerValidator)
        const theVehicleOwner = await VehicleOwner.create(body)
        return theVehicleOwner
    }
}
