import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContractsController {

    
    //Route.get("/shares", "SharesController.index"); 
    //listar los contratos
    public async index({}: HttpContextContract) {
        return {
            message: "Listado de contratos",
            data: {
                mensaje: "listados los contratos"
            }
        }
    }

    //Route.get("/shares:id", "SharesController.show");
    //mostrar un contrato por su id
    public async show({params}:HttpContextContract){
        return {
            message: "mostrando contrato",
            "id": params.id
        }
    }
    
    //Route.post("/shares", "SharesController.store");
    //crear
    public async store({request}:HttpContextContract){
        return {
            message: "creando contrato",
            "informacion": request.body()
        }
    }
    
    //Route.put("/shares:id", "SharesController.update");
    //actualizar
    public async update({params, request}:HttpContextContract){
        return {
            message: "actualizando contrato",
            "id": params.id,
            "imformacion": request.body()   
        }
    }
    
    //Route.delete("//:id", "SharesController.delete");
    //eliminar
    public async delete({params}:HttpContextContract){
        return {
            message: "eliminando contrato",
            "id": params.id
        }
    }

}
