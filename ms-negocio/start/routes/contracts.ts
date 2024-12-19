import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contracts", "ContractsController.find");
    Route.get("/contracts/:id", "ContractsController.show");
    Route.post("/contracts", "ContractsController.create");
    Route.put("/contracts/:id", "ContractsController.update");
    Route.delete("/contracts/:id", "ContractsController.delete");
})//.middleware