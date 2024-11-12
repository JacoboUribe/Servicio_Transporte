import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory';
export default class ProductCategoriesController {
        public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProductCategory: ProductCategory = await ProductCategory.findOrFail(params.id)
            return theProductCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ProductCategory.query().paginate(page, perPage)
            } else {
                return await ProductCategory.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProductCategory: ProductCategory = await ProductCategory.create(body);
        return theProductCategory;
    }
}
