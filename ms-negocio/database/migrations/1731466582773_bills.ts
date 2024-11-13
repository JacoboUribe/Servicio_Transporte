import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_bill')

      table.integer('amount')
      table.string('details')

      table.string('id_share')
            .unsigned()
            .references('shares.id_share')
            .onDelete('CASCADE')

      table.string('id_spent')
            .unsigned()
            .references('spents.id_spent')
            .onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
