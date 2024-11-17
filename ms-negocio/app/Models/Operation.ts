import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import City from './City'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date:DateTime

  @column()
  public end_date:DateTime

  @column()
  public vehicle_id:number

  @column()
  public city_id:number

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public cities: BelongsTo<typeof City>

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
