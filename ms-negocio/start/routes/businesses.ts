import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/businesses", "BusinessesController.find");
    Route.get("/businesses/:id", "BusinessesController.find");
    Route.post("/businesses", "BusinessesController.create");
    Route.put("/businesses/:id", "BusinessesController.update");
    Route.delete("/businesses/:id", "BusinessesController.delete");
})//.middleware