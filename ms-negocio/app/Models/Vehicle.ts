import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Owner from './Owner'
import Driver from './Driver'
import Contract from './Contract'
import Insurance from './Insurance'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license:string
  
  @column()
  public model:string

  @column()
  public load_capacity:Date

  @hasMany(() => Insurance, {
    foreignKey: 'vehicle_id'
  })
  public insurances: HasMany<typeof Insurance>

  @manyToMany(() => City, {
    pivotTable: 'operations',
    pivotForeignKey: 'vehicle_id',
    pivotRelatedForeignKey: 'city_id',
    pivotColumns: ['start_date','end_date']
  })
  public vehicles: ManyToMany<typeof City>

  @manyToMany(() => Owner, {
    pivotTable: 'vehicle_owners',
    pivotForeignKey: 'vehicle_id',
    pivotRelatedForeignKey: 'owner_id'
  })
  public owners: ManyToMany<typeof Owner>

  @manyToMany(() => Driver, {
    pivotTable: 'vehicle_drivers',
    pivotForeignKey: 'vehicle_id',
    pivotRelatedForeignKey: 'driver_id'  
  })
  public drivers: ManyToMany<typeof Driver>

  @manyToMany(() => Contract, {
    pivotTable: 'route',
    pivotForeignKey: 'vehicle_id',
    pivotRelatedForeignKey: 'contract_id',
    pivotColumns: ['starting_point','destination_point', 'distance', 'delivery_date']
  })
  public contracts: ManyToMany<typeof Contract>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
