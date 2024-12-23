import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import NaturalPeople from './NaturalPeople'

export default class Business extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_company: string

  @column()
  public address: string

  @column()
  public customer_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customers: BelongsTo<typeof Customer>

  @hasOne(() => NaturalPeople,{
    foreignKey: 'business_id',
  })
  public naturalpeoples: HasOne<typeof NaturalPeople>
}
