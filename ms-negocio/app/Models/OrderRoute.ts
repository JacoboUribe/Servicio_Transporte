import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lot from './Lot'

export default class OrderRoute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public route_id: number

  @column()
  public address_id: number

  @hasMany(() => Lot, {
    foreignKey: 'order_route_id'
  })
  public lots: HasMany<typeof Lot>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
