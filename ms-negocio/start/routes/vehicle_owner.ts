import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehicle_owner", "vehicle_ownerController.find");
    Route.get("/vehicle_owner/:id", "vehicle_ownerController.find");
    Route.post("/vehicle_owner", "vehicle_ownerController.create");
})