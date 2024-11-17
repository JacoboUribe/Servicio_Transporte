import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'product_categories', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    category_id: schema.number([rules.exists({ table: 'categories', column: 'id' }),]),
    product_id: schema.number([rules.exists({ table: 'products', column: 'id' }),]),})

  public messages: CustomMessages = {}
}
