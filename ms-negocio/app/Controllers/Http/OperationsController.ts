import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operation from 'App/Models/Operation';
import OperationValidator from 'App/Validators/OperationValidator';

export default class OperationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperation: Operation = await Operation.findOrFail(params.id)
            return theOperation;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operation.query().paginate(page, perPage)
            } else {
                return await Operation.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(OperationValidator)
        const body = request.body();
        const theOperation: Operation = await Operation.create(body);
        return theOperation
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperation: Operation = await Operation.findOrFail(params.id);
        const body = await request.validate(OperationValidator);
        theOperation.start_date = body.start_date;
        theOperation.end_date= body.end_date;
        theOperation.vehicle_id = body.vehicle_id;
        theOperation.city_id = body.city_id;
        return await theOperation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperation: Operation = await Operation.findOrFail(params.id);
            response.status(204);
            return await theOperation.delete();
    }    
}
