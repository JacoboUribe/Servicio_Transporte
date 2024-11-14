import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'


export default class Spent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id:number

  @column()
  public drive_id:number

  @column()
  public details: string

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public drivers: BelongsTo<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
