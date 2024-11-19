import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operation", "OperationController.find");
    Route.get("/operation/:id", "OperationController.find");
    Route.post("/operation", "OperationController.create");
})