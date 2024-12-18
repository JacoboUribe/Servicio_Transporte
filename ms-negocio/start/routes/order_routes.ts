import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/order_routes", "OrderRoutesController.find");
    Route.get("/order_routes/:id", "OrderRoutesController.find");
    Route.post("/order_routes", "OrderRoutesController.create");
    Route.put("/order_routes/:id", "OrderRoutesController.update");
    Route.delete("/order_routes/:id", "OrderRoutesController.delete")
})//.middleware