 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicesController {

    //Route.get("/service", "servicesController.index"); 
    //listar los servicios
    public async index({}: HttpContextContract) {
        return {
            message: "Listado de servicios",
            data: {
                mensaje: "listados los servicios"
            }
        }
    }
    
    //Route.get("/service:id", "servicesController.show");
    //mostrar un servicio por su id
    public async show({params}:HttpContextContract){
        return {
            message: "mostrando servicio",
            "id": params.id
        }
    }

    //Route.post("/service", "servicesController.store");
    //crear
    public async store({request}:HttpContextContract){
        return {
            message: "creando servicio",
            "informacion": request.body()
        }
    }

    //Route.put("/service:id", "servicesController.update");
    //actualizar
    public async update({params, request}:HttpContextContract){
        return {
            message: "actualizando servicio",
            "id": params.id,
            "imformacion": request.body()   
        }
    }

    //Route.delete("/service:id", "servicesController.delete");
    //eliminar
    public async delete({params}:HttpContextContract){
        return {
            message: "eliminando servicio",
            "id": params.id
        }
    }
}
