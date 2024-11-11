import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contracts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.dateTime('start_date')
      table.dateTime('end_date')
      table.integer('id_client')
            .unsigned()
            .references('clients.id')
            .onDelete('CASCADE')
            

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
