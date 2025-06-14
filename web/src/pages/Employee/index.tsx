import {FTable, FHeader, EmployeeDialog, SearchBar} from '../../components'
import {Employee, Header} from '../../utils'
import {Box} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getEmployees, createEmployee, deleteEmployee, updateEmployee} from '../../store'
import type {RootState, AppDispatch} from '../../store'

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

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const emptyCurEmployee = {
    id: 0,
    name: '',
    age: '',
    address: '',
    salary: '',
    position: '',
    status: ''
  }
  const [curEmployee, setCurEmployee] = useState<Employee>(emptyCurEmployee)

  const {data: employees} = useSelector((state: RootState) => state.employees);
  const dispatch: AppDispatch = useDispatch();

  const onAdd = () => {
    setCurEmployee({...emptyCurEmployee})
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    const currentEmployee: Employee = employees.find((c: Employee) => c.id === id)!;
    setCurEmployee({...currentEmployee})
    setIsOpenDialog(true)
  }, [employees])

  const onSave = async () => {
    setIsOpenDialog(false)

    if (curEmployee.id) {
      const newEmployee = {...toBody(), id: curEmployee.id}
      dispatch(updateEmployee(newEmployee))
    }
    else {
      const newEmployee = {...toBody(), id: 0}
      dispatch(createEmployee(newEmployee))
    }
  }

  const onDelete = useCallback((id: number)=>{
    dispatch(deleteEmployee(id))
  }, [dispatch])

  const toBody = () => {
    return {
      ...curEmployee,
      age: Number(curEmployee.age),
      salary: Number(curEmployee.salary)
    }
  }

  useEffect(()=>{
    dispatch(getEmployees())
  },[dispatch])


  return (
      <>
        <FHeader title={'Employees'}/>
        <Box className={'container'}>
          <SearchBar onAdd={onAdd}/>

          <FTable
              headers={headers}
              rows={employees}
              onUpdate={onUpdate}
              onDelete={onDelete}
          />
          <EmployeeDialog
              employee={curEmployee}
              setEmployee={setCurEmployee}
              onSave={onSave}
              isOpen={isOpenDialog}
              onClose={() => setIsOpenDialog(false)}
          />
        </Box>
      </>
  )
}
