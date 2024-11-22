import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle_drivers", "VehicleDriversController.find");
    Route.get("/vehicle_drivers/:id", "VehicleDriversController.find");
    Route.post("/vehicle_drivers", "VehicleDriversController.create");
})