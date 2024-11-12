import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    category_name: schema.string({ trim: true }),
    description: schema.string.optional({ trim: true }),
    category_id: schema.number.optional([rules.exists({ table: 'categories', column: 'id' }),])
  })


  public messages: CustomMessages = {}
}
