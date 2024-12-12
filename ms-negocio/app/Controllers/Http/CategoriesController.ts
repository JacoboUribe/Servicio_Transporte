import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import CategoryValidator from 'App/Validators/CategoryValidator';

export default class CategoriesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategory: Category = await Category.findOrFail(params.id)
            theCategory.load("categoryPadre")
            theCategory.load("product_categories")
            return theCategory;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Category.query().preload("categoryPadre").preload("product_categories").paginate(page, perPage)
            } else {
                return await Category.query().preload("categoryPadre").preload("product_categories")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(CategoryValidator)
        const body = request.body();
        const theCategory: Category = await Category.create(body);
        await theCategory.load("categoryPadre")
        await theCategory.load("categoryHija")
        return theCategory
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
        const body = await request.validate(CategoryValidator);
        theCategory.category_name = body.category_name;
        theCategory.description = body.description;
        await theCategory.load("categoryPadre")
        await theCategory.load("categoryHija")
        return await theCategory.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategory: Category = await Category.findOrFail(params.id);
            response.status(204);
            return await theCategory.delete();
    }
}
