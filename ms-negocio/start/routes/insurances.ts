import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/insurance", "InsuranceController.find");
    Route.get("/insurance/:id", "InsuranceController.find");
    Route.post("/insurance", "InsuranceController.create");
    Route.put("/insurance/:id", "InsuranceController.update");
    Route.delete("/insurance/:id", "InsuranceController.delete");
})