import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Administrator from './Administrator'
import Restaurant from './Restaurant'
import Hotel from './Hotel'
import Spent from './Spent'

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

  @hasMany(() => Spent,{
    foreignKey: 'service_id'
  })
  public spents: HasMany<typeof Spent>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
