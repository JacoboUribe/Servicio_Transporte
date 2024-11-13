import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'spents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_spend')

      table.string('details')

      table.string('id_owner')
            .unsigned()
            .references('owners.id_owner')
            .onDelete('CASCADE')

      table.string('id_driver')
            .unsigned()
            .references('drivers.id_driver')
            .onDelete('CASCADE')

      table.integer('id_service') 
            .unsigned()
            .references('services.id_service')
            .onDelete('CASCADE')
            
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
