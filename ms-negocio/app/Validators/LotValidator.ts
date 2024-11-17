import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'lots', column: 'id', where: { id: this.ctx.request.input('id')}})]),
    weight: schema.number([rules.unsigned()]),
    route_id: schema.number([rules.exists({ table: 'routes', column: 'id' })]),
    order_route_id: schema.number([rules.exists({ table: 'order_routes', column: 'id' })])
  })
    

  public messages: CustomMessages = {}
}
