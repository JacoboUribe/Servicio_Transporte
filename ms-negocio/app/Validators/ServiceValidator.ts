import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'services', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    amount: schema.number([rules.unsigned()]),
    date: schema.date(),
    description: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
