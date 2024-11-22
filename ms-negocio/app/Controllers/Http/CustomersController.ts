import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';
import CustomerValidator from 'App/Validators/CustomerValidator';

export default class CustomersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCustomer: Customer = await Customer.findOrFail(params.id)
            theCustomer.load("products")
            theCustomer.load("businesses")
            theCustomer.load("naturalpersons")
            theCustomer.load("contracts")
            return theCustomer;
            
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Customer.query().preload("products").preload("businesses").preload("naturalpersons").preload("contracts").paginate(page, perPage)
            } else {
                return await Customer.query().preload("products").preload("businesses").preload("naturalpersons").preload("contracts")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(CustomerValidator)
        const body = request.body();
        const theCustomer: Customer = await Customer.create(body);
        return theCustomer
    }

    public async update({ params, request }: HttpContextContract) {
        const theCustomer: Customer = await Customer.findOrFail(params.id);
        const body = await request.validate(CustomerValidator);
        theCustomer.phone_number = body.phone_number;
        theCustomer.number_orders = body.number_orders;
        return await theCustomer.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCustomer: Customer = await Customer.findOrFail(params.id);
            response.status(204);
            return await theCustomer.delete();
    }
}
