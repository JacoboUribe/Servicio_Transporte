import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'operations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.integer('vehicle_id') 
        .unsigned()
        .references('vehicles.id') 
      table.integer('city_id')
        .unsigned()
        .references('cities.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
