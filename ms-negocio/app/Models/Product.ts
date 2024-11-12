import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Lot from './Lot'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public customer_id: number

  @column()
  public lot_id: number

  @column()
  public product_name: string

  @column()
  public description: string

  @column()
  public expiration_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customers: BelongsTo<typeof Customer>

  @belongsTo(() => Lot, {
    foreignKey: 'lot_id'
  })
  public lots: BelongsTo<typeof Lot>

  @manyToMany(() => Category, {
    pivotTable: 'product_categories',
    pivotForeignKey: 'product_id',
    pivotRelatedForeignKey: 'category_id',
  })
  public categories: ManyToMany<typeof Category>
}
