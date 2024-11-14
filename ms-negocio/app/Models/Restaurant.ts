import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public service_id: number

  @column() 
  public restaurant_name: string

  @column() 
  public restaurant_address: string

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public services: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
