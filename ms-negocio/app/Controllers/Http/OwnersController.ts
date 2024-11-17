import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner';
import OwnerValidator from 'App/Validators/OwnerValidator';

export default class OwnersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOwner: Owner = await Owner.findOrFail(params.id)
            theOwner.load("vehicle_owners")
            theOwner.load("spents")
            return theOwner;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Owner.query().preload("vehicle_owners").preload("spents").paginate(page, perPage)
            } else {
                return await Owner.query().preload("vehicle_owners").preload("spents")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(OwnerValidator)
        const theOwner = await Owner.create(body)
        return theOwner
    }

    public async update({ params, request }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
        const body = await request.validate(OwnerValidator);
        theOwner.phone = body.phone;
        theOwner.date_of_acquisition = body.date_of_acquisition;
        theOwner.user_id = body.user_id;
        theOwner.driver_id = body.driver_id;
        return await theOwner.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOwner: Owner = await Owner.findOrFail(params.id);
            response.status(204);
            return await theOwner.delete();
    }
    
}
