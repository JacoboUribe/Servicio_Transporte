import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class NaturalPeople extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_document: string

  @column()
  public birthdate: Date

  @column()
  public customer_id:number

  @column()
  public user_id:number

  @column()
  public business_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customers: BelongsTo<typeof Customer>
}
