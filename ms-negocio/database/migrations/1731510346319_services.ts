import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_service')
      table.double('amount')
      table.date('date')
      table.string('description')

      table.foreign('id_administrator')
      .references('id').inTable('administrators')
      .unsigned()
      .references('users.id_user')
      .onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
