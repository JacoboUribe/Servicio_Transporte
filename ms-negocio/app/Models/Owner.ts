import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'
import VehicleOwner from './VehicleOwner'
import Spent from './Spent'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()  
  public phone: string

  @column()
  public date_of_acquisition: DateTime

  @column()
  public driver_id: number

  @column()
  public user_id:number

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public drivers: BelongsTo<typeof Driver>

  @hasMany(()=> Spent, {
    foreignKey: 'owner_id'
  })
  public spents: HasMany <typeof Spent>

  @hasMany(()=> VehicleOwner, {
    foreignKey: 'owner_id'
  })
  public vehicle_owners: HasMany <typeof VehicleOwner>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
