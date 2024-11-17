import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressValidator {
  constructor(protected ctx: HttpContextContract) {}
  
  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'addresses', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    address_name: schema.string([rules.minLength(4) ,rules.maxLength(30)]),
    address: schema.string([rules.minLength(4) ,rules.maxLength(25) ]),
    references: schema.string([rules.minLength(4) ,rules.maxLength(100)]),
    neighborhood: schema.string([rules.minLength(4) ,rules.maxLength(20)]),
    city_id: schema.number([rules.exists({ table: 'cities', column: 'id' }),]),
    distribution_center_id: schema.number([rules.exists({ table: 'distribution_centers', column: 'id' }),])
  })
  
  public messages: CustomMessages = {}
}
