import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/distribution_centers", "Distribution_centersController.find");
    Route.get("/distribution_centers/:id", "Distribution_centersController.find");
    Route.post("/distribution_centers", "Distribution_centersController.create");
    Route.put("/distribution_centers/:id", "Distribution_centersController.update");
    Route.delete("/distribution_centers/:id", "Distribution_centersController.delete");
})