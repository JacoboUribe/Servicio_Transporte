import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}
  
  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'administrators', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    user_id: schema.string(),
    type_administrator: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
