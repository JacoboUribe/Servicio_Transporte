import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distribution_centers", "DistributioncentersController.find");
    Route.get("/distribution_centers/:id", "DistributioncentersController.find");
    Route.post("/distribution_centers", "DistributioncentersController.create");
    Route.put("/distribution_centers/:id", "DistributioncentersController.update");
    Route.delete("/distribution_centers/:id", "DistributioncentersController.delete");
})