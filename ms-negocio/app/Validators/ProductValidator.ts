import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' }),]),
    lot_id: schema.number([rules.exists({ table: 'lots', column: 'id' }),]),
    product_name: schema.string({ trim: true }),
    description: schema.string.optional({ trim: true }),
    expiration_date: schema.date()
  })

  public messages: CustomMessages = {}
}
