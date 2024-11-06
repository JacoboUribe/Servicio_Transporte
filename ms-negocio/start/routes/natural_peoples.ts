import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/natural_peoples", "Natural_peoplesController.find");
    Route.get("/natural_peoples/:id", "Natural_peoplesController.find");
    Route.post("/natural_peoples", "Natural_peoplesController.create");
    Route.put("/natural_peoples/:id", "Natural_peoplesController.update");
    Route.delete("/natural_peoples/:id", "Natural_peoplesController.delete");
})