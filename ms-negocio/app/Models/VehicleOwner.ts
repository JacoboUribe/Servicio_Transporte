import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Owner from './Owner'

export default class VehicleOwner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date_acquisition:DateTime

  @column()
  public vehicle_id:number

  @column()
  public owner_id:number

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>

  @belongsTo(() => Owner, {
    foreignKey: 'owner_id'
  })
  public owners: BelongsTo<typeof Owner>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
