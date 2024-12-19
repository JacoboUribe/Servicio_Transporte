import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {

    Route.get("/shares", "SharesController.find");
    Route.get("/shares/:id", "SharesController.find");
    Route.post("/shares", "SharesController.create");
    Route.put("/shares/:id", "SharesController.update");
    Route.delete("/shares/:id", "SharesController.delete");
})//.middleware