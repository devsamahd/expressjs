const path = require('path')
const express = require('express')
const router = express.Router()
const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController')


router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route('/:id')
    .get(getEmployee)
// router.get('/employees(.json)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'employees.json'))
// })

module.exports = router