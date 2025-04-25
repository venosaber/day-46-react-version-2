import { useState } from 'react';
import {DialogContainer, FTable} from '../../components'
import {Header, Employee} from '../../utils'
import {Button} from "@mui/material";

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const headers: Header[] = [
    {name: 'id', text: 'ID'},
    {name: 'name', text: 'Ten'},
    {name: 'age', text: 'Tuoi'},
    {name: 'address', text: 'Dia Chi'},
    {name: 'action', text: ''}
  ]

  const employees: Employee[] = [
    {id: 1, name: 'Dung', age: 20, address: 'Thanh Oai - Ha Noi'},
    {id: 2, name: 'Trung', age: 22, address: 'Quoc Oai - Ha Noi'},
    {id: 3, name: 'Son', age: 221, address: 'Quoc Oai 2 - Ha Noi'},
  ]

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  return (
    <>
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable tableName={'employee hihi'} headers={headers} rows={employees}/>
      <DialogContainer
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}