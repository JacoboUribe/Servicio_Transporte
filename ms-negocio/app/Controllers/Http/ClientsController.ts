import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientsController {

        
        //Route.get("/clients", "ClientsController.index"); 
        //listar los clientes
        public async index({}: HttpContextContract) {
            return {
                message: "Listado de clientes",
                data: {
                    mensaje: "listados los clientes"
                }
            }
        }
    
        //Route.get("/clients:id", "ClientsController.show");
        //mostrar un cliente por su id
        public async show({params}:HttpContextContract){
            return {
                message: "mostrando cliente",
                "id": params.id
            }
        }
        
        //Route.post("/clients", "ClientsController.store");
        //crear
        public async store({request}:HttpContextContract){
            return {
                message: "creando cliente",
                "informacion": request.body()
            }
        }
        
        //Route.put("/clients:id", "ClientsController.update");
        //actualizar
        public async update({params, request}:HttpContextContract){
            return {
                message: "actualizando cliente",
                "id": params.id,
                "imformacion": request.body()   
            }
        }
        
        //Route.delete("//:id", "ClientsController.delete");
        //eliminar
        public async delete({params}:HttpContextContract){
            return {
                message: "eliminando cliente",
                "id": params.id
            }
        }

}
