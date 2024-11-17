import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Turn from './Turn'
import Spent from './Spent'
import Owner from './Owner'
import VehicleDriver from './VehicleDriver'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public license_expiration_date: DateTime

  @column() 
  public license_number: string

  @column() 
  public contact_phone: string

  @column()
  public user_id:number

  @hasMany(() => Turn, {
    foreignKey: 'driver_id'
  })
  public turns: HasMany<typeof Turn>

  @hasMany(() => Spent,{ 
    foreignKey: 'driver_id'
  })
  public spents : HasMany<typeof Spent>

  @hasOne (() => Owner, {
    foreignKey: 'driver_id'
  })
  public owners: HasOne<typeof Owner>

  @hasMany(() => VehicleDriver,{ 
    foreignKey: 'driver_id'
  })
  public vehicle_drivers : HasMany<typeof VehicleDriver>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
