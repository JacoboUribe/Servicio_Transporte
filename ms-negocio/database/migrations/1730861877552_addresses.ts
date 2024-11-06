import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('address_name')
      table.string('address')
      table.string('references')
      table.string('neighborhood')
      table.integer('city_id')
        .unsigned()
        .references('cities.id')
        table.integer('distribution_center_id')
        .unsigned()
        .references('distribution_centers.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
