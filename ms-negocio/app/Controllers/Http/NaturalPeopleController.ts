import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NaturalPeople from 'App/Models/NaturalPeople';
import NaturalPeopleValidator from 'App/Validators/NaturalPeopleValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class NaturalPeoplesController {
  public async find({ request, params }: HttpContextContract) {
    const authHeader = request.headers().authorization || '';

    if (params.id) {
      const theNaturalPeople = await NaturalPeople.findOrFail(params.id);
      const userInfo = await this.getUserInfo(theNaturalPeople.user_id, authHeader);
      return { ...theNaturalPeople.toJSON(), user: userInfo };
    }

    const data = request.all();
    let results;

    if ('page' in data && 'per_page' in data) {
      const page = request.input('page', 1);
      const perPage = request.input('per_page', 20);
      results = await NaturalPeople.query().paginate(page, perPage);
    } else {
      results = await NaturalPeople.all();
    }

    const enrichedResults = await Promise.all(
      results.map(async (person) => {
        const userInfo = await this.getUserInfo(person.user_id, authHeader);
        return { ...person.toJSON(), user: userInfo };
      })
    );

    return enrichedResults;
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const authHeader = request.headers().authorization || '';
    await this.validateUserExists(body.user_id, authHeader);
    await request.validate(NaturalPeopleValidator);

    const theNaturalPeople = await NaturalPeople.create({
      user_id: body.user_id,
      type_document: body.type_document,
      business_id: body.business_id,
      customer_id: body.customer_id,
      birthdate: body.birthdate,
    });

    return theNaturalPeople;
  }

  public async update({ params, request }: HttpContextContract) {
    const theNaturalPeople = await NaturalPeople.findOrFail(params.id);
    const body = request.body();
    const authHeader = request.headers().authorization || '';
    await this.validateUserExists(body.user_id, authHeader);

    theNaturalPeople.merge({
      user_id: body.user_id,
      type_document: body.type_document,
      business_id: body.business_id,
      customer_id: body.customer_id,
      birthdate: body.birthdate,
    });

    return await theNaturalPeople.save();
  }

  public async delete({ params }: HttpContextContract) {
    const theNaturalPeople = await NaturalPeople.findOrFail(params.id);
    await theNaturalPeople.delete();
    return { message: 'Persona natural eliminada con éxito' };
  }

  private async getUserInfo(userId: string, authHeader: string) {
    const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${userId}`, {
      headers: { Authorization: authHeader },
    });
    return response.data || null;
  }

  private async validateUserExists(userId: string, authHeader: string) {
    const response = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${userId}`, {
      headers: { Authorization: authHeader },
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('No se encontró información del usuario');
    }
  }
}
