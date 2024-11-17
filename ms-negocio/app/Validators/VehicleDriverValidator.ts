import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleDriverValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    vehicle_id: schema.number([rules.required(),rules.exists({ table: 'vehicles', column: 'id' })]),
    driver_id: schema.number([rules.required(),rules.exists({ table: 'drivers', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
