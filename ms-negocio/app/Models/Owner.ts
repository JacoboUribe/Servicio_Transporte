import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'
import Vehicle from './Vehicle'

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

  @manyToMany(() => Vehicle, {
    pivotTable: 'vehicle_owners',
    pivotForeignKey: 'owner_id',
    pivotRelatedForeignKey: 'vehicle_id',
  })
  public vehicles: ManyToMany<typeof Vehicle>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
