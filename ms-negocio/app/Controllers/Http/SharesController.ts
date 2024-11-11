import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SharesController {
 
    //listar las cuotas 
    public async index({}: HttpContextContract) {
        return {
            message: "Listado de cuotas",
            data: {
                mensaje: "listados las cuotas"
            }
        }
    }

    //crrar una cuota 

    public async store({request}:HttpContextContract){
        return {
            message: "creando cuota",
            "informacion": request.body()
        }
    }
    

    //mostrar una cuota por su id
    public async show({params}:HttpContextContract){
        return {
            message: "mostrando cuota",
            "id": params.id

   
        }
    }
    //actualizar una cuota por su id

    public async update({params, request}:HttpContextContract){
        return {
            message: "actualizando cuota",
            "id": params.id,
            "imformacion": request.body()   
        }
    }
    //eliminar un usuario por su id

    //falta vlidar si existe
    public async delete({params}:HttpContextContract){
        return {
            message: "eliminando cuota",
            "id": params.id
        }
    }


}
