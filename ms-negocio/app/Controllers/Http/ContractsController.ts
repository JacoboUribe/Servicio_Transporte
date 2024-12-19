import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract';
import ContractValidator from 'App/Validators/ContractValidator';

export default class ContractsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theContract: Contract   = await Contract.findOrFail(params.id)
            theContract.load("routes")
            theContract.load("shares")
            return theContract;
        } else {
            const data = request.all()
            if("customer_id" in data){
                return await Contract.query().where("customer_id", request.input("customer_id"))
                }
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contract.query().preload("routes").preload("shares").paginate(page, perPage)
            } else {
                return await Contract.query().preload("routes").preload("shares")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        await request.validate(ContractValidator)
        const body = request.body();
        const theContract: Contract = await Contract.create(body);
        return theContract
    }

    public async update({ params, request }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
        const body = await request.validate(ContractValidator);
        theContract.start_date = body.start_date;
        theContract.end_date = body.end_date;
        theContract.customer_id = body.customer_id;
        return await theContract.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContract: Contract = await Contract.findOrFail(params.id);
            response.status(204);
            return await theContract.delete();
    }
}
