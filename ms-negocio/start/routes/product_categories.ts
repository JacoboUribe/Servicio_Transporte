import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/product_category", "Product_categoryController.find");
    Route.get("/product_category/:id", "Product_categoryController.find");
    Route.post("/product_category", "Product_categoryController.create");
})//.middleware