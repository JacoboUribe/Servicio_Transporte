import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'products', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' }),]),
    lot_id: schema.number([rules.exists({ table: 'lots', column: 'id' }),]),
    product_name: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    expiration_date: schema.date()
  })

  public messages: CustomMessages = {}
}
