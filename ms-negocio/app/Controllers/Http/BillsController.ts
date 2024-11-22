import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bill from 'App/Models/Bill';
import BillValidator from 'App/Validators/BillValidator';

export default class BillsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theBill: Bill = await Bill.findOrFail(params.id)
            return theBill;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Bill.query().paginate(page, perPage)
            } else {
                return await Bill.query()
            }
        }
    }
    
    public async create({ request }: HttpContextContract) {
        await request.validate(BillValidator)
        const body = request.body();
        const theBill: Bill = await Bill.create(body);
        return theBill
    }

    public async update({ params, request }: HttpContextContract) {
        const theBill: Bill = await Bill.findOrFail(params.id);
        const body = await request.validate(BillValidator);
        theBill.amount = body.amount;
        theBill.date_time = body.date_time;
        theBill.share_id = body.share_id;
        theBill.spent_id = body.spent_id;
        return await theBill.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBill: Bill = await Bill.findOrFail(params.id);
            response.status(204);
            return await theBill.delete();
    }

}
