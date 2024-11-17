import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';
import AddressValidator from 'App/Validators/AddressValidator';

export default class AddressesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAddress: Address = await Address.findOrFail(params.id)
            theAddress.load("order_routes")
            return theAddress;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Address.query().preload("order_routes").paginate(page, perPage)
            } else {
                return await Address.query().preload("order_routes")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(AddressValidator)
        const theAddress = await Address.create(body)
        return theAddress
    }

    public async update({ params, request }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
        const body = await request.validate(AddressValidator);
        theAddress.address_name = body.address_name;
        theAddress.address = body.address;
        theAddress.references = body.references ;
        theAddress.neighborhood = body.neighborhood ;
        theAddress.city_id = body.city_id;
        theAddress.distribution_center_id = body.city_id;
        return await theAddress.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAddress: Address = await Address.findOrFail(params.id);
            response.status(204);
            return await theAddress.delete();
    }
}
