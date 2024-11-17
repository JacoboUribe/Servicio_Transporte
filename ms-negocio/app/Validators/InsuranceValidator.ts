import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsuranceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({}, [rules.required()]),
    end_date: schema.date({}, [rules.required(),rules.afterField('start_date')]),
    company: schema.string({}, [rules.required(),rules.maxLength(255)]),
    vehicle_id: schema.number([rules.required(), rules.exists({ table: 'vehicles', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
