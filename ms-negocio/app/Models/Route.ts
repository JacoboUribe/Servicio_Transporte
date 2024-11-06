import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lot from './Lot'

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
  public delivery_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Lot, {
    foreignKey: 'route_id'
  })
  public lots: HasMany<typeof Lot>
}
