import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Business from './Business'
import NaturalPerson from './NaturalPerson'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_number: string

  @column()
  public number_orders: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'customer_id'
  })
  public products: HasMany<typeof Product>

  @hasOne(() => Business, {
    foreignKey: 'customer_id'
  })
  public businesses: HasOne<typeof Business>

  @hasOne(() => NaturalPerson, {
    foreignKey: 'customer_id'
  })
  public naturalpersons: HasOne<typeof NaturalPerson>
}
