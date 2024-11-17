import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Share from 'App/Models/Share';
import ShareValidator from 'App/Validators/ShareValidator';

export default class SharesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theShare: Share = await Share.findOrFail(params.id)
            theShare.load("bills")
            return theShare;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Share.query().preload("bills").paginate(page, perPage)
            } else {
                return await Share.query().preload("bills")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ShareValidator)
        const theShare = await Share.create(body)
        return theShare
    }

    public async update({ params, request }: HttpContextContract) {
        const theShare: Share = await Share.findOrFail(params.id);
        const body = await request.validate(ShareValidator);
        theShare.amount = body.amount;
        theShare.interest = body.interest;
        theShare.contract_id = body.contract_id;
        return await theShare.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShare: Share = await Share.findOrFail(params.id);
            response.status(204);
            return await theShare.delete();
    }

}
