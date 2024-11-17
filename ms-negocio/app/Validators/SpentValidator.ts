import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    service_id: schema.number([rules.exists({ table: 'services', column: 'id' })]),
    drive_id: schema.number([rules.exists({ table: 'drivers', column: 'id' })]),
    details: schema.string.optional({ trim: true })
  })

  public messages: CustomMessages = {}
}
