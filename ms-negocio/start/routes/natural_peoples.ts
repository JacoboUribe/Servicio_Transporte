import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/natural_peoples", "NaturalPeopleController.find");
    Route.get("/natural_peoples/:id", "NaturalPeopleController.find");
    Route.post("/natural_peoples", "NaturalPeopleController.create");
    Route.put("/natural_peoples/:id", "NaturalPeopleController.update");
    Route.delete("/natural_peoples/:id", "NaturalPeopleController.delete");
  })
  