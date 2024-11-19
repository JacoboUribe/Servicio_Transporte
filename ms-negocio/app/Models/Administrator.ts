import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public service_id: number

  @column()
  public user_id:string

  @column() 
  public type_administrator: string

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public services: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
