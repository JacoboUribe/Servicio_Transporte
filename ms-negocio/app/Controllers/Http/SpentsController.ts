import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpentsController {
    
        //Route.get("/spents", "spentsController.index"); 
        //listar los gastoss
        public async index({}: HttpContextContract) {
            return {
                message: "Listado de gastoss",
                data: {
                    mensaje: "listados los gastoss"
                }
            }
        }

        //Route.get("/spents:id", "spentsController.show");
        //mostrar un gastos por su id
        public async show({params}:HttpContextContract){
            return {
                message: "mostrando gastos",
                "id": params.id
            }
        }

        //Route.post("/spents", "spentsController.store");   
        //crear
        public async store({request}:HttpContextContract){
            return {
                message: "creando gastos",
                "informacion": request.body()
            }
        }

        //Route.put("/spents:id", "spentsController.update");
        //actualizar
        public async update({params, request}:HttpContextContract){
            return {
                message: "actualizando gastos",
                "id": params.id,
                "imformacion": request.body()   
            }
        }

        //Route.delete("//:id", "spentsController.delete");
        //eliminar
        public async delete({params}:HttpContextContract){
            return {
                message: "eliminando gastos",
                "id": params.id
            }
        }

}
