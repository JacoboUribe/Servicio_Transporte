import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'categories', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    category_name: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    category_id: schema.number([rules.exists({ table: 'categories', column: 'id' })])
  })


  public messages: CustomMessages = {}
}
