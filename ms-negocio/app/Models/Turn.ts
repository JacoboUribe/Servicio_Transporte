import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'

export default class Turn extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public driver_id : number

  @column()
  public start_date : Date

  @column()
  public end_date : Date

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id' 
  })
  public drivers: BelongsTo<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
