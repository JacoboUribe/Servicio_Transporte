import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Driver from './Driver'

export default class VehicleDriver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehicle_id:number

  @column()
  public driver_id:number

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public drivers: BelongsTo<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
