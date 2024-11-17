import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Lot from './Lot'
import Route from './Route'
import Address from './Address'

export default class OrderRoute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public route_id: number

  @column()
  public address_id: number

  @belongsTo(() => Route, {
    foreignKey: 'route_id'
  })
  public routes: BelongsTo<typeof Route>

  @belongsTo(() => Address, {
    foreignKey: 'address_id'
  })
  public addresses: BelongsTo<typeof Address>

  @hasOne(() => Lot, {
    foreignKey: 'order_route_id'
  })
  public lots: HasOne<typeof Lot>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
