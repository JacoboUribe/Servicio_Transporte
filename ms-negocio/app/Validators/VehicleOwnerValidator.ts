import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleOwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date_acquisition: schema.date({}, [rules.required()]),
    vehicle_id: schema.number([rules.required(),rules.exists({ table: 'vehicles', column: 'id' })]),
    owner_id: schema.number([rules.required(),rules.exists({ table: 'owners', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
