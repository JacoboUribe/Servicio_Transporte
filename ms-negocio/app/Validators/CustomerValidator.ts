import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    phone_number: schema.string({ trim: true }, [rules.regex(/^\+?[0-9]{7,15}$/)]), /*Estructura de número telefónico internacional*/
    number_orders: schema.number([rules.unsigned(),])
  })

  public messages: CustomMessages = {}
}
