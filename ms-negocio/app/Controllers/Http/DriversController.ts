import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DriversController {

        //Route.get("/drivers", "driversController.index");
        //listar los drivers
        public async index({}: HttpContextContract) {
            return {
                message: "Listado de drivers",
                data: {
                    mensaje: "listados los drivers"
                }
            }
        }

       //Route.post("/drivers", "driversController.store");   
        //crear
        public async store({request}:HttpContextContract){
            return {
                message: "creando drivers",
                "informacion": request.body()
            }
        }

        //Route.put("/drivers:id", "driversController.update");
        //actualizar
        public async update({params, request}:HttpContextContract){
            return {
                message: "actualizando drivers",
                "id": params.id,
                "imformacion": request.body()   
            }
        }

        //Route.delete("//:id", "driversController.delete");
        //eliminar
        public async delete({params}:HttpContextContract){
            return {
                message: "eliminando drivers",
                "id": params.id
            }
        }



}
