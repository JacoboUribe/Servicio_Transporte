import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'departments', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    department_name: schema.string({ trim: true }, [rules.maxLength(100),]),
    region: schema.string({ trim: true }, [rules.maxLength(100),])
  })

  public messages: CustomMessages = {}
}
