import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';
import CityValidator from 'App/Validators/CityValidator';

export default class CitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCity: City = await City.findOrFail(params.id);
            await theCity.load("addresses");
            await theCity.load("distribution_centers");
            await theCity.load("operations");
            return theCity;
        } else {
            const data = request.all()
            if("department_id" in data){
                return await City.query().where("department_id", request.input("department_id"))
            }
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await City.query().preload("addresses").preload("distribution_centers").preload("operations").paginate(page, perPage)
            } else {
                return await City.query().preload("addresses").preload("distribution_centers").preload("operations")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(CityValidator)
        const body = request.body();
        const theCity: City = await City.create(body);
        return theCity
    }

    public async update({ params, request }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        const body = await request.validate(CityValidator);
        theCity.city_name = body.city_name;
        theCity.zip_code = body.zip_code;
        theCity.department_id = body.department_id;
        return await theCity.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
            response.status(204);
            return await theCity.delete();
    }
}
