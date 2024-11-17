import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    license_expiration_date: schema.date(),
    license_number: schema.string({ trim: true }),
    contact_phone: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
