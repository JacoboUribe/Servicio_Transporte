import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}
  
  public schema = schema.create({
    address_name: schema.string({ trim: true }, [rules.maxLength(100),]),
    address: schema.string({ trim: true }),
    references: schema.string.optional({ trim: true }),
    neighborhood: schema.string.optional({ trim: true }),
    city_id: schema.number([rules.exists({ table: 'cities', column: 'id' }),]),
    distribution_center_id: schema.number([rules.exists({ table: 'distribution_centers', column: 'id' }),])
  })
  
  public messages: CustomMessages = {}
}
