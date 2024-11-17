import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    driver_id: schema.number([rules .exists({ table: 'drivers', column: 'id' })]),
    start_date: schema.date(),
    end_date: schema.date({}, [
      rules.afterField('start_date')])
  })

  public messages: CustomMessages = {}
}
