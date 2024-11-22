 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';

export default class ServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theService: Service = await Service.findOrFail(params.id)
            theService.load("spents")
            theService.load("hotels")
            theService.load("restaurants")
            theService.load("administrator")
            return theService;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Service.query().preload("spents").preload("hotels").preload("restaurants").preload("administrator").paginate(page, perPage)
            } else {
                return await Service.query().preload("spents").preload("hotels").preload("restaurants").preload("administrator")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ServiceValidator)
        const body = request.body();
        const theService: Service = await Service.create(body);
        return theService
    }
    
    public async update({ params, request }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
        const body = await request.validate(ServiceValidator);
        theService.amount = body.amount;
        theService.date = body.date;
        theService.description = body.description;
        return await theService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
            response.status(204);
            return await theService.delete();
    }
}
