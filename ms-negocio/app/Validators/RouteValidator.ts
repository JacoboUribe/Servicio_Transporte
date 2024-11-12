import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RouteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    starting_point: schema.string({ trim: true }),
    destination_point: schema.string({ trim: true }),
    distance: schema.number([ rules.unsigned(),]),
    delivery_date: schema.date()
  })

  public messages: CustomMessages = {}
}
