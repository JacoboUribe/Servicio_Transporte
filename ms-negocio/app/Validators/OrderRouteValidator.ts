import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderRouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    route_id: schema.number([rules.required(),rules.exists({ table: 'routes', column: 'id' })]),
    address_id: schema.number([rules.required(),rules.exists({ table: 'addresses', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
