import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Driver from './Driver'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id_ower: number

  @column()  
  public phone: string

  @column()
  public date_of_acquisition: DateTime

  @hasOne(() => User, {
    foreignKey: 'id_user'
  })public user

  @hasOne(() => Driver,{ 
    foreignKey: 'id_driver'
  })
  public driver

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
