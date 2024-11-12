import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    weight: schema.number([rules.unsigned(),]),
    route_id: schema.number([rules.exists({ table: 'routes', column: 'id' }),]),})

  public messages: CustomMessages = {}
}
