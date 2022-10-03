const data = {
    employees : require('../model/employees.json'),
    setEmployees: function (data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
    res.json(data.employees)
}

const createNewEmployee = (req, res)=> {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        role: req.body.role
    }
    if(!newEmployee.firstname || !newEmployee.role){
        return res.status(400).json({'message' : 'First name and role are required'})
    }
    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json(data.employees)
}
const updateEmployee = (req, res) =>
{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({'message': `Employee with id ${req.body.id} not found`})
    }
    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.role) employee.role = req.body.role
    const filteredarray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    const unsortedarray = [...filteredarray, employee]
    data.setEmployees(unsortedarray.sort((a,b)=>a.id > b.id ? 1: a.id < b.id? -1 : 0)) 
    res.json(data.employees)
}
const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({'message': `Employee with id ${req.body.id} not found`})
    }
    const filteredarray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredarray])
    res.json(data.employees) 
}
const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    if(!employee){
        return res.status(400).json({"message":`Employee ID ${req.params.id} not found`})
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}