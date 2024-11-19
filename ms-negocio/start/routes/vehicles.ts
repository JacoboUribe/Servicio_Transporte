import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle", "VehicleController.find");
    Route.get("/vehicle/:id", "VehicleController.find");
    Route.post("/vehicle", "VehicleController.create");
    Route.put("/vehicle/:id", "VehicleController.update");
    Route.delete("/vehicle/:id", "VehicleController.delete");
})