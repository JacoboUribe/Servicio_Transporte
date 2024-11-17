import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShareValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([rules.unsigned()]),
    interest: schema.number([rules.range(0, 1)]),  
    contract_id: schema.number([rules.exists({ table: 'contracts', column: 'id' })])
  })

  public messages: CustomMessages = {}
}