import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'spents', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    driver_id: schema.number([rules.exists({ table: 'drivers', column: 'id' })]),
    owner_id: schema.number([rules.exists({ table: 'owners', column: 'id' })]),
    details: schema.string([rules.minLength(4), rules.maxLength(35)])
  })

  public messages: CustomMessages = {}
}
