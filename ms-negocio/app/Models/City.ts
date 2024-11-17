import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import Address from './Address'
import DistributionCenter from './DistributionCenter'
import Vehicle from './Vehicle'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public city_name: string

  @column()
  public zip_code: string

  @column()
  public department_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department, {
    foreignKey: 'department_id'
  })
  public departments: BelongsTo<typeof Department>

  @hasMany(() => Address, {
    foreignKey: 'city_id'
  })
  public addresses: HasMany<typeof Address>

  @hasMany(() => DistributionCenter, {
    foreignKey: 'city_id'
  })
  public distribution_centers: HasMany<typeof DistributionCenter>

  @manyToMany(() => Vehicle, {
    pivotTable: 'operations',
    pivotForeignKey: 'city_id',
    pivotRelatedForeignKey: 'vehicle_id',
    pivotColumns: ['start_date','end_date']
  })
  public vehicles: ManyToMany<typeof Vehicle>
}
