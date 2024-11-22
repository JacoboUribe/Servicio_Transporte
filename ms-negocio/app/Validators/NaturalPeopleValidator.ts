import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NaturalPeopleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'natural_people', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    type_document: schema.string({ trim: true }),
    birthdate: schema.date({format:"yyyy-MM-dd"}),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' }),]),
    business_id: schema.number([rules.exists({ table: 'businesses', column: 'id' }),]),
    user_id: schema.string()
  })

  public messages: CustomMessages = {}
}
