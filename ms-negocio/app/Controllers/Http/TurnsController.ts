import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turn from 'App/Models/Turn';
import TurnValidator from 'App/Validators/TurnValidator';

export default class TurnsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTurn: Turn = await Turn.findOrFail(params.id)
            return theTurn;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Turn.query().paginate(page, perPage)
            } else {
                return await Turn.query()
            }
        }
    }
    
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(TurnValidator)
        const theTurn = await Turn.create(body)
        return theTurn
    }

    public async update({ params, request }: HttpContextContract) {
        const theTurn: Turn = await Turn.findOrFail(params.id);
        const body = await request.validate(TurnValidator);
        theTurn.start_date = body.start_date;
        theTurn.end_date = body.end_date;
        theTurn.driver_id = body.driver_id;
        return await theTurn.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTurn: Turn = await Turn.findOrFail(params.id);
            response.status(204);
            return await theTurn.delete();
    }
}
