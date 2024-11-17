import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date:DateTime

  @column()
  public end_date:DateTime

  @column()
  public company:String
  
  @column()
  public vehicle_id:number

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
