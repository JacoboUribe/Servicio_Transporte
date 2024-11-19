import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle_driver", "Vehicle_driverController.find");
    Route.get("/vehicle_driver/:id", "Vehicle_driverController.find");
    Route.post("/vehicle_driver", "Vehicle_driverController.create");
})