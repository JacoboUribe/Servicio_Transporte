import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCenter from 'App/Models/DistributionCenter';
import DistributionCenterValidator from 'App/Validators/DistributionCenterValidator';

export default class DistributionCentersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id)
            theDistributionCenter.load("addresses")
            return theDistributionCenter;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DistributionCenter.query().preload("addresses").paginate(page, perPage)
            } else {
                return await DistributionCenter.query().preload("addresses")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DistributionCenterValidator)
        const theDistributionCenter = await DistributionCenter.create(body)
        return theDistributionCenter
    }

    public async update({ params, request }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
        const body =await request.validate(DistributionCenterValidator);
        theDistributionCenter.distribution_name = body.distribution_name;
        theDistributionCenter.storage_capacity = body.storage_capacity;
        theDistributionCenter.city_id = body.city_id;
        return await theDistributionCenter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
            response.status(204);
            return await theDistributionCenter.delete();
    }
}
