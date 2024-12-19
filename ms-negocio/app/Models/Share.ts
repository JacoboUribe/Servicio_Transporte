import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Bill from './Bill'

export default class Share extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public interest: number 

  @column()
  public contract_id:number

  @column()
  public status: Boolean

  @belongsTo(() => Contract, {
    foreignKey: 'contract_id'
  })
  public contracts: BelongsTo<typeof Contract>

  @hasMany(() => Bill, {
    foreignKey: 'share_id'
  })
  public bills: HasMany<typeof Bill>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
