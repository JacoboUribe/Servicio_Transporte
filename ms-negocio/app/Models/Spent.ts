import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'
import Service from './Service'
import Bill from './Bill'
import Owner from './Owner'


export default class Spent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id:number

  @column()
  public driver_id:number

  @column()
  public owner_id:number

  @column()
  public details:string

  @hasOne(() => Bill, {
    foreignKey: 'spent_id'
  })
  public bills: HasOne<typeof Bill>

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public drivers: BelongsTo<typeof Driver>

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public services: BelongsTo<typeof Service>

  @belongsTo(() => Owner, {
    foreignKey: 'owner_id'
  })
  public owners: BelongsTo<typeof Owner>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
