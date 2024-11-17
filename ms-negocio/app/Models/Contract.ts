import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Share from './Share'
import Vehicle from './Vehicle'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime
  
  @column()
  public end_date: DateTime

  @column()
  public customer_id: number

  @belongsTo(() => Customer ,{
    foreignKey: 'customer_id', 
  })
  public customers: BelongsTo<typeof Customer>  

  @hasMany(() => Share, {
    foreignKey: 'contract_id'
  })
  public shares: HasMany<typeof Share>

  @manyToMany(() => Vehicle, {
    pivotTable: 'route',
    pivotForeignKey: 'contract_id',
    pivotRelatedForeignKey: 'vehicle_id',
    pivotColumns: ['starting_point','destination_point', 'distance', 'delivery_date']
  })
  public vehicles: ManyToMany<typeof Vehicle>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
