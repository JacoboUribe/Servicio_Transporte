import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('product_name')
      table.string('description')
      table.date('expiration_date')
      table.integer('customer_id')
        .unsigned()
        .references('customers.id')
      table.integer('lot_id')
        .unsigned()
        .references('lots.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
