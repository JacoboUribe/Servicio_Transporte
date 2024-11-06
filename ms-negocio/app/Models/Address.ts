import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address_name: string

  @column()
  public address: string

  @column()
  public references: string

  @column()
  public neighborhood: string

  @column()
  public city_id: number

  @column()
  public distribution_center_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public cities: BelongsTo<typeof City>
}
