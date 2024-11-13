import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id_service: number

  @column()
  public amount : number

  @column()
  public date: DateTime

  @column()
  public description: string

@hasOne (() => administrator, {
  foreignKey: 'id_administrator'
})
public administrador: HasOne<typeof administrator>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
