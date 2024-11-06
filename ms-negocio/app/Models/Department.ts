import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public department_name: string

  @column()
  public region: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => City, {
    foreignKey: 'department_id'
  })
  public cities: HasMany<typeof City>
}
