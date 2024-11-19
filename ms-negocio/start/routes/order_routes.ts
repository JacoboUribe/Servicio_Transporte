import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/order_route", "Order_routeController.find");
    Route.get("/order_route/:id", "Order_routeController.find");
    Route.post("/order_route", "Order_routeController.create");
})