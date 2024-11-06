import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProduct: Product = await Product.findOrFail(params.id)
            return theProduct;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Product.query().paginate(page, perPage)
            } else {
                return await Product.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProduct: Product = await Product.create(body);
        return theProduct;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
        const body = request.body();
        theProduct.product_name = body.location;
        theProduct.description = body.capacity;
        theProduct.expiration_date = body.expiration_date;
        return await theProduct.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProduct: Product = await Product.findOrFail(params.id);
            response.status(204);
            return await theProduct.delete();
    }
}
