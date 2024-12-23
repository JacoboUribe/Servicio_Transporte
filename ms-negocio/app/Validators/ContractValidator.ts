import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContractValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'contracts', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    start_date: schema.date(),
    end_date: schema.date(),
    customer_id: schema.number([rules.exists({ table: 'customers', column: 'id' })])
  })


  public messages: CustomMessages = {}
}
