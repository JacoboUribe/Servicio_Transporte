import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      amount: schema.number([rules.unsigned()]),
      date_time: schema.date(),
      share_id: schema.number([rules.exists({ table: 'shares', column: 'id' })]),
      spent_id: schema.number([rules.exists({ table: 'spents', column: 'id' })]),
  })


  public messages: CustomMessages = {}
}