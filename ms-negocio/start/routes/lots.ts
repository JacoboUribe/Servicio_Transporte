import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/lots", "LotsController.find");
    Route.get("/lots/:id", "LotsController.find");
    Route.post("/lots", "LotsController.create");
    Route.put("/lots/:id", "LotsController.update");
    Route.delete("/lots/:id", "LotsController.delete");
})//.middleware