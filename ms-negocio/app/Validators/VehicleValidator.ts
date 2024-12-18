import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'vehicles', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    license: schema.string({},[rules.required(),rules.maxLength(255)]),
    model: schema.string({}, [rules.required(),rules.maxLength(255)]),
    load_capacity: schema.number([rules.required(),rules.unsigned()])
  })

  public messages: CustomMessages = {}
}
