import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Insurance from './Insurance'
import Route from './Route'
import VehicleDriver from './VehicleDriver'
import VehicleOwner from './VehicleOwner'
import Operation from './Operation'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license:string
  
  @column()
  public model:string

  @column()
  public load_capacity:number

  @hasMany(() => Insurance, {
    foreignKey: 'vehicle_id'
  })
  public insurances: HasMany<typeof Insurance>

  @hasMany(() => Route, {
    foreignKey: 'vehicle_id'
  })
  public routes: HasMany<typeof Route>
  
  @hasMany(() => VehicleDriver, {
    foreignKey: 'vehicle_id'
  })
  public vehicles_drivers: HasMany<typeof VehicleDriver>
  
  @hasMany(() => VehicleOwner, {
    foreignKey: 'vehicle_id'
  })
  public vehicle_owners: HasMany<typeof VehicleOwner>

  @hasMany(() => Operation, {
    foreignKey: 'vehicle_id'
  })
  public operations: HasMany<typeof Operation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
