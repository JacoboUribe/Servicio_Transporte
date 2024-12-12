import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/turns", "TurnsController.find");
    Route.get("/turns/:id", "TurnsController.find");
    Route.post("/turns", "TurnsController.create");
    Route.put("/turns/:id", "TurnsController.update");
    Route.delete("/turns/:id", "TurnsController.delete");
})//.middleware