import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BillsController {

    //Route.get("/bills", "BillsController.index"); 
    //listar las facturas
    public async index({}: HttpContextContract) {
        return {
            message: "Listado de facturas",
            data: {
                mensaje: "listados las facturas"
            }
        }
    }

    //Route.get("/bills:id", "BillsController.show");
    //mostrar una factura por su id
    public async show({params}:HttpContextContract){
        return {
            message: "mostrando factura",
            "id": params.id
        }
    }
    
    //Route.post("/bills", "BillsController.store");
    //crear
    public async store({request}:HttpContextContract){
        return {
            message: "creando factura",
            "informacion": request.body()
        }
    }
    
    //Route.put("/bills:id", "BillsController.update");
    //actualizar
    public async update({params, request}:HttpContextContract){
        return {
            message: "actualizando factura",
            "id": params.id,
            "imformacion": request.body()   
        }
    }
    
    //Route.delete("//:id", "BillsController.delete");
    //eliminar
    public async delete({params}:HttpContextContract){
        return {
            message: "eliminando factura",
            "id": params.id
        }
    }

}
