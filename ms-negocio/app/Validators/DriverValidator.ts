import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'drivers', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    license_expiration_date: schema.date({format:"yyyy-MM-dd"},[rules.afterOrEqual('today')]),
    license_number: schema.string({ trim: true }),
    contact_phone: schema.string({ trim: true }),
    user_id: schema.string()
  })

  public messages: CustomMessages = {}
}
