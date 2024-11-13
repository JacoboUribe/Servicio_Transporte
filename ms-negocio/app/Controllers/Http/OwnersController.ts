import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnersController {
     //Route.get("/owners", "ownersController.index"); 
    //listar los contratos
    public async index({}: HttpContextContract) {
        return {
            message: "Listado de contratos",
            data: {
                mensaje: "listados los contratos"
            }
        }
    }

    //Route.get("/owners:id", "ownersController.show");
    //mostrar un contrato por su id
    public async show({params}:HttpContextContract){
        return {
            message: "mostrando contrato",
            "id": params.id
        }
    }

    //Route.post("/owners", "ownersController.store");
    //crear
    public async store({request}:HttpContextContract){
        return {
            message: "creando contrato",
            "informacion": request.body()
        }
    }

    //Route.put("/owners:id", "ownersController.update");
    //actualizar
    public async update({params, request}:HttpContextContract){
        return {
            message: "actualizando contrato",
            "id": params.id,
            "imformacion": request.body()   
        }
    }

    //Route.delete("//:id", "ownersController.delete");
    //eliminar
    public async delete({params}:HttpContextContract){
        return {
            message: "eliminando contrato",
            "id": params.id
        }
    }
    
}
