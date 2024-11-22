import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'routes', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    starting_point: schema.string({ trim: true }),
    destination_point: schema.string({ trim: true }),
    distance: schema.number([ rules.unsigned(),]),
    delivery_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today')]),
    vehicle_id : schema.number([rules.exists({ table: 'vehicles', column: 'id' })]),
    contract_id : schema.number([rules.exists({ table: 'contracts', column: 'id' })])

  })

  public messages: CustomMessages = {}
}
