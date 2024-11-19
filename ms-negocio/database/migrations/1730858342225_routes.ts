import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'routes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('starting_point')
      table.string('destination_point')
      table.double('distance')
      table.dateTime('delivery_date')
      table.integer('contract_id')
        .unsigned()
        .references('contracts.id')
      table.integer('vehicle_id') 
        .unsigned()
        .references('vehicles.id') 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
