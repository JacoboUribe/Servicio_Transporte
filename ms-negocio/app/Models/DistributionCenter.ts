import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Address from './Address'

export default class DistributionCenter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public distribution_name: string

  @column()
  public storage_capacity: number

  @column()
  public city_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public cities: BelongsTo<typeof City>

  @hasOne(() => Address,{
    foreignKey: 'distribution_center_id',
  })
  public addresses: HasOne<typeof Address>
}
