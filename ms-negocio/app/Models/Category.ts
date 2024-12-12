import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'


export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_name: string

  @column()
  public description: string

  @column()
  public category_padre: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'category_padre'
  })
  public categoryHija: HasMany<typeof Category>

  @belongsTo(() => Category, {
    foreignKey: 'category_padre'
  })
  public categoryPadre: BelongsTo<typeof Category>

  @hasMany(() => ProductCategory, {
    foreignKey: 'category_id'
  })
  public product_categories: HasMany<typeof ProductCategory>

}
