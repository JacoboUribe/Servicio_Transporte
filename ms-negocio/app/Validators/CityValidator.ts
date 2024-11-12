import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({ 
  city_name: schema.string({ trim: true }),
  zip_code: schema.string({ trim: true }, [rules.maxLength(10),]),
  department_id: schema.number([rules.exists({ table: 'departments', column: 'id' }),]),})


  public messages: CustomMessages = {}
}
