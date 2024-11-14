import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Administrator from './Administrator'
import Restaurant from './Restaurant'
import Hotel from './Hotel'
import Driver from './Driver'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount : number

  @column()
  public date: DateTime

  @column()
  public description: string

  @hasOne (() => Administrator, {
    foreignKey: 'service_id'
  })
  public administrator: HasOne<typeof Administrator>

  @hasOne(() => Restaurant, {
    foreignKey: 'service_id'
  })
  public restaurants: HasOne<typeof Restaurant>

  @hasOne(() => Hotel, {
    foreignKey: 'service_id'
  })
  public hotels: HasOne<typeof Hotel>

  @manyToMany(() => Driver, {
    pivotTable: 'spents',
    pivotForeignKey: 'service_id',
    pivotRelatedForeignKey: 'drive_id',
    pivotColumns: ['details']
  })
  public drivers: ManyToMany<typeof Driver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
