import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class TurnValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'turns', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    driver_id: schema.number([rules.exists({ table: 'drivers', column: 'id' })]),
    start_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today')]),
    end_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterField('start_date')]),
  })

  public messages: CustomMessages = {}
}
