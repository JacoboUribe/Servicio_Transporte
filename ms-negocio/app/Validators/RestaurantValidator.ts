import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'restaurants', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    restaurant_name: schema.string({ trim: true }),
    restaurant_address: schema.string()
  })

  public messages: CustomMessages = {}
}
