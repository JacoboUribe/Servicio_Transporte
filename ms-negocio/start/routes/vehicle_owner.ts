import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle_owners", "vehicleOwnersController.find");
    Route.get("/vehicle_owners/:id", "vehicleOwnersController.find");
    Route.post("/vehicle_owners", "vehicleOwnersController.create");
})