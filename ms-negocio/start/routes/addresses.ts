import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/addresses", "AddressesaddressesController.find");
    Route.get("/addresses/:id", "AddressesaddressesController.find");
    Route.post("/addresses", "AddressesaddressesController.create");
    Route.put("/addresses/:id", "AddressesaddressesController.update");
    Route.delete("/addresses/:id", "AddressesaddressesController.delete");
})