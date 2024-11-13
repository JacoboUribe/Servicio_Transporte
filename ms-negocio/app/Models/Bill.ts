import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Spent from './Spent'
import Share from './Share'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id_bills: number

  @column()
  public amount: number

  @hasOne(() => Share, {
    foreignKey: 'id_share'
  })
  public share

  @hasOne(() => Spent, {
    foreignKey: 'id_spent'
  })
  public spent

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
