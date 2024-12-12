import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/customers", "CustomersController.find");
    Route.get("/customers/:id", "CustomersController.find");
    Route.post("/customers", "CustomersController.create");
    Route.put("/customers/:id", "CustomersController.update");
    Route.delete("/customers/:id", "CustomersController.delete");
})//.middleware