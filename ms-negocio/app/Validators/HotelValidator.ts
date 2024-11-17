import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    hotel_name: schema.string({ trim: true }),
    hotel_address: schema.string.optional(),
    stars: schema.number([rules.range(1, 5)])
  })

  public messages: CustomMessages = {}
}
