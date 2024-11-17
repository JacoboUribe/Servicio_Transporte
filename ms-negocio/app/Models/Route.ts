import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lot from './Lot'
import OrderRoute from './OrderRoute'
import Vehicle from './Vehicle'
import Contract from './Contract'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public starting_point: string

  @column()
  public destination_point: string

  @column()
  public distance: number

  @column()
  public delivery_date: DateTime

  @column()
  public contract_id:number

  @column()
  public vehicle_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicles: BelongsTo<typeof Vehicle>  

  @belongsTo(() => Contract, {
    foreignKey: 'contract_id'
  })
  public contracts: BelongsTo<typeof Contract>  

  @hasMany(() => Lot, {
    foreignKey: 'route_id'
  })
  public lots: HasMany<typeof Lot>

  @hasMany (() => OrderRoute,{
    foreignKey: 'route_id'
  })
  public order_routes: HasMany<typeof OrderRoute>

}
