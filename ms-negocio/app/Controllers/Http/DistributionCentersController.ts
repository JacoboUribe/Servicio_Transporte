import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DistributionCenter from 'App/Models/DistributionCenter';

export default class DistributionCentersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id)
            return theDistributionCenter;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DistributionCenter.query().paginate(page, perPage)
            } else {
                return await DistributionCenter.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theDistributionCenter: DistributionCenter = await DistributionCenter.create(body);
        return theDistributionCenter;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
        const body = request.body();
        theDistributionCenter.distribution_name = body.distribution_name;
        theDistributionCenter.storage_capacity = body.storage_capacity;
        return await theDistributionCenter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDistributionCenter: DistributionCenter = await DistributionCenter.findOrFail(params.id);
            response.status(204);
            return await theDistributionCenter.delete();
    }
}
