import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()  
  public phone: string

  @column()
  public date_of_acquisition: DateTime

  @column()
  public driver_id: number

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public drivers: BelongsTo<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}