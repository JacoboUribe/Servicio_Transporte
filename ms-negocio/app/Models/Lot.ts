import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Route from './Route'
import Product from './Product'
import OrderRoute from './OrderRoute'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public weight: number

  @column()
  public route_id: number

  @column()
  public order_route_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Route, {
    foreignKey: 'route_id'
  })
  public routes: BelongsTo<typeof Route>

  @belongsTo(() => OrderRoute, {
    foreignKey: 'order_route_id'
  })
  public order_routes: BelongsTo<typeof OrderRoute>

  @hasMany(() => Product, {
    foreignKey: 'lot_id'
  })
  public products: HasMany<typeof Product>
}
