import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'


export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_name: string

  @column()
  public description: string

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'category_id'
  })
  public categories: HasMany<typeof Category>

  @belongsTo(() => Category, {
    foreignKey: 'category_id'
  })
  public categoriesPadre: BelongsTo<typeof Category>

  @manyToMany(() => Product, {
    pivotTable: 'product_categories',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'product_id',
  })
  public products: ManyToMany<typeof Product>
}
