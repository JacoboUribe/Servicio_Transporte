import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Spent from './Spent'
import Share from './Share'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public date_time: DateTime

  @column()
  public details: string

  @column()
  public share_id:number

  @column()
  public spent_id:number

  @belongsTo(() => Share, {
    foreignKey: 'share_id'
  })
  public shares : BelongsTo<typeof Share>

  @belongsTo(() => Spent, {
    foreignKey: 'spent_id'
  })
  public spents : BelongsTo<typeof Spent>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
