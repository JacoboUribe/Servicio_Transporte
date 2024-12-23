import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'spents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('details')
      table.integer('owner_id')
        .unsigned()
        .references('owners.id')
      table.integer('driver_id')
        .unsigned()
        .references('drivers.id')
      table.integer('service_id') 
        .unsigned()
        .references('services.id') 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
