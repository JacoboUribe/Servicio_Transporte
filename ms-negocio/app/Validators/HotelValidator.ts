import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'hotels', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    hotel_name: schema.string({ trim: true }),
    hotel_address: schema.string([rules.minLength(4), rules.maxLength(30)]),
    stars: schema.number([rules.range(1, 5)])
  })

  public messages: CustomMessages = {}
}
