import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BusinessValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'businesses', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    type_company: schema.string({ trim: true }),
    address: schema.string({ trim: true }),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' }),])
  })

 
  public messages: CustomMessages = {}
}
