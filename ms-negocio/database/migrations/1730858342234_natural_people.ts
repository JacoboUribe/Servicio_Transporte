import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'natural_people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('type_document')
      table.dateTime('birthdate')
      table.integer('customer_id')
        .unsigned()
        .references('customers.id')
        table.integer('business_id')
        .unsigned()
        .references('businesses.id')
        table.string('user_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
