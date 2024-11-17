import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department';
import DepartmentValidator from 'App/Validators/DepartmentValidator';
export default class DepartmentsController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartment: Department = await Department.findOrFail(params.id)
            theDepartment.load("cities")
            return theDepartment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Department.query().preload("cities").paginate(page, perPage)
            } else {
                return await Department.query().preload("cities")
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DepartmentValidator)
        const theDepartment = await Department.create(body)
        return theDepartment
    }

    public async update({ params, request }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id);
        const body =await request.validate(DepartmentValidator);
        theDepartment.department_name = body.department_name;
        theDepartment.region = body.region;
        return await theDepartment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartment: Department = await Department.findOrFail(params.id);
            response.status(204);
            return await theDepartment.delete();
    }
}
