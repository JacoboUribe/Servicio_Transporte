import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    start_date: schema.date({}, [rules.required()]),
  end_date: schema.date({}, [rules.required(), rules.afterField('start_date')]),
  vehicle_id: schema.number([rules.required(), rules.exists({ table: 'vehicles', column: 'id' })]),
  city_id: schema.number([rules.required(), rules.exists({ table: 'cities', column: 'id' })])
})

  public messages: CustomMessages = {}
}
