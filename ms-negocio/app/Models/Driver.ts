import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Turn from './Turn'
import Spent from './Spent'
import Owner from './Owner'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public license_expiration_date: Date

  @column() 
  public license_number: string

  @column() 
  public contact_phone: string

  @hasMany(() => Turn, {
    foreignKey: 'drive_id'
  })
  public turns: HasMany<typeof Turn>

  @hasMany(() => Spent,{ 
    foreignKey: 'drive_id'
  })
  public spents : HasMany<typeof Spent>

  @hasOne (() => Owner, {
    foreignKey: 'driver_id'
  })
  public owners: HasOne<typeof Owner>

  @manyToMany(() => Service, {
    pivotTable: 'spents',
    pivotForeignKey: 'drive_id',
    pivotRelatedForeignKey: 'service_id',
    pivotColumns: ['details']
  })
  public services: ManyToMany<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
