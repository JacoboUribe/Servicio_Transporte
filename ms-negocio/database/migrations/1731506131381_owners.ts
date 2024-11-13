import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'owners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_owner')


      table.string('phone')
      table.string('date_of_acquisition')
      table.string('id_user')
            .unsigned()
            .references('users.id_user')
            .onDelete('CASCADE')

      table.string('id_driver')
            .unsigned()
            .references('drivers.id_driver')
            .onDelete('CASCADE')
            
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
