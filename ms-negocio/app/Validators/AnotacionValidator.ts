import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnotacionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'anotacions', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    date: schema.date({format:"yyyy-MM-dd"},[rules.afterOrEqual('today')]),
    description: schema.string([rules.maxLength(200)]),
    order_route_id: schema.number([rules.exists({ table: 'order_routes', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
