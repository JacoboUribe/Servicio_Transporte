import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('license')
      table.string('model')
      table.double('load_capacity')
      table.decimal('latitud_inicial',6,4)
      table.decimal('latitud_final',6,4)
      table.decimal('longitud_inicial',4,2)
      table.decimal('longitud_final',4,2)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
