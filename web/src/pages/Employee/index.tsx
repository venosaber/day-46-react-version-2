import { useState } from 'react';
import {EmployeeDialog, FTable,} from '../../components'
import {Header, Employee} from '../../utils'
import {Button} from "@mui/material"

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curEmployee, setCurEmployee] = useState<Employee>({
    id: null,
    name: '',
    age: 0,
    salary: 0,
    address: '',
    position: '',
    status: ''
  })

  const headers: Header[] = [
    {name: 'id', text: 'ID'},
    {name: 'name', text: 'Ten'},
    {name: 'age', text: 'Tuoi'},
    {name: 'address', text: 'Dia Chi'},
    {name: 'salary', text: 'Luong'},
    {name: 'position', text: 'Vi tri'},
    {name: 'status', text: 'Status'},
    {name: 'action', text: ''}
  ]

  const [employees, setEmployees] = useState<Employee[]>([
    {id: 1, name: 'Dung', age: 20, address: 'Thanh Oai - Ha Noi', salary: 2000, position: 'member', status: 'working'},
    {id: 2, name: 'Trung', age: 22, address: 'Quoc Oai - Ha Noi', salary: 2000, position: 'member', status: 'working'},
    {id: 3, name: 'Son', age: 221, address: 'Quoc Oai 2 - Ha Noi', salary: 2000, position: 'member', status: 'working'},
  ])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    // @ts-ignore
    setCurEmployee({...employees.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onSave = () => {
    setEmployees([...employees, curEmployee])
    setIsOpenDialog(false)
    // todo: call api and save
  }

  return (
    <>
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        width={800}
        tableName={'employee hihi'}
        headers={headers}
        rows={employees}
        onUpdate={onUpdate}
      />
      <EmployeeDialog
        employee={curEmployee}
        setEmployee={setCurEmployee}
        onSave={onSave}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}