import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone: schema.string({ trim: true }, [rules.mobile()]),
    date_of_acquisition: schema.date(),
    driver_id: schema.number([rules.exists({ table: 'drivers', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
