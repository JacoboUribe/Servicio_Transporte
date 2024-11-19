import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bills'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('amount')
      table.string('details')
      table.datetime('date_time')
      table.integer('share_id')
            .unsigned()
            .references('shares.id')
      table.integer('spent_id')
            .unsigned()
            .references('spents.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
