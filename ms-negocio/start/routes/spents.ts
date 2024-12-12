import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/spents", "SpentsController.find");
    Route.get("/spents/:id", "SpentsController.find");
    Route.post("/spents", "SpentsController.create");
    Route.put("/spents/:id", "SpentsController.update");
    Route.delete("/spents/:id", "SpentsController.delete");
})//.middleware