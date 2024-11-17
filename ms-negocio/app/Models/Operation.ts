import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date:Date

  @column()
  public end_date:Date

  @column()
  public vehicle_id:number

  @column()
  public city_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
