import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id_driver: number

  @column() 
  public phone: string

  @column()
  public number_license : string

  @column()
  public date_of_expiration: DateTime

  //aca va la muchos a muchos con la tabla vehiculo 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
