import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/clients", "clientsController.find");
    Route.get("/clients/:id", "clientsController.find");
    Route.post("/clients", "clientsController.create");
    Route.put("/clients/:id", "clientsController.update");
    Route.delete("/clients/:id", "clientsController.delete");
}) 