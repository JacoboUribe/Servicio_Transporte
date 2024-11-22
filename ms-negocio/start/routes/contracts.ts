import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contracts", "ContractsController.index");
    Route.get("/contracts:id", "ContractsController.show");
    Route.post("/contracts", "ContractsController.create");
    Route.put("/contracts:id", "ContractsController.update");
    Route.delete("/contracts/:id", "ContractsController.delete");
})