import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'


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
  public categories1: BelongsTo<typeof Category>
}
