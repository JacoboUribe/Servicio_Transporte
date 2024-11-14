import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NaturalPeopleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type_document: schema.string({ trim: true }),
    birthdate: schema.date(),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' }),]),
    business_id: schema.number([rules.exists({ table: 'businesses', column: 'id' }),])
  })

  public messages: CustomMessages = {}
}