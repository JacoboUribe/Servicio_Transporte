import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Bill from './Bill'

export default class Share extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public interest: number 

  @belongsTo(() => Contract, {
    foreignKey: 'id_contract'
  })
  public id_contract: BelongsTo<typeof Contract>

  @belongsTo(() => Bill, {
    foreignKey: 'id_bill'
  })
  public id_bill: BelongsTo<typeof Bill>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
