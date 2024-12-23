import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules } from '@ioc:Adonis/Core/Validator'

export default class DistributionCenterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'distribution_centers', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    distribution_name: schema.string({ trim: true }, [rules.maxLength(100),]),
    storage_capacity: schema.number([rules.unsigned(),]),
    city_id: schema.number([rules.exists({ table: 'cities', column: 'id' }),])
  })

  public messages: CustomMessages = {}
}
