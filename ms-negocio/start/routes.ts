/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


import './routes/departments'
import './routes/cities'
import './routes/addresses'
import './routes/distribution_centers'
import './routes/categories'
import './routes/products'
import './routes/lots'
import './routes/businesses'
import './routes/natural_peoples'
import './routes/customers'
import './routes/product_categories'
import './routes/shares'
import './routes/contracts'
import './routes/spents'
import './routes/turns'
import './routes/restaurants'
import './routes/services'
import './routes/hotels'
import './routes/owners'
import './routes/drivers'
import './routes/administrators'
import './routes/routes'
import './routes/bills'
import './routes/vehicles'
import './routes/vehicle_owner'
import './routes/vehicle_drivers'
import './routes/operations'
import './routes/order_routes'
import './routes/insurances'

