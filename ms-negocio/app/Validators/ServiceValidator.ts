import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    amount: schema.number([rules.unsigned()]),
    date: schema.date(),
    description: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
