import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Owner from './Owner'
import Driver from './Driver'
import Service from './Service'

export default class Spent extends BaseModel {
  @column({ isPrimary: true })
  public id_spent: number


  @column()
  public details: string

  @hasOne(() => Owner, {
    foreignKey: 'id_owner'
  })
  public owner

  @hasOne(() => Driver, {
    foreignKey: 'id_driver'
  })
  public driver

  @hasOne(() => Service, {
      foreignKey: 'id_service'
    })
  public service

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
