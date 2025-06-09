import {FTable, FHeader, CustomerDialog, SearchBar} from '../../components'
import {Customer, Header} from '../../utils'
import {Box} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {getMethod, postMethod, putMethod} from "../../utils/api.ts";
import {useSelector} from "react-redux";
import store, {getCustomers, createCustomer, updateCustomer} from '../../store'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'companyName', text: 'Cong Ty'},
  {name: 'address', text: 'Dia Chi'},
  {name: 'description', text: 'Mo Ta'},
  {name: 'action', text: ''}
]


export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curCustomer, setCurCustomer] = useState<Customer>({
    id: 0,
    name: '',
    companyName: '',
    address: '',
    description: ''
  })
  const {isLoading, data: customers} = useSelector(state => state.customers)
  console.log(customers)
  // const [customers, setCustomers] = useState<Customer[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    // @ts-ignore
    setCurCustomer({...customers.find(e => e.id === id)})
    setIsOpenDialog(true)
  }, [customers])

  const onSave = async () => {
    setIsOpenDialog(false)

    // @ts-ignore
    if (curCustomer.id) store.dispatch(updateCustomer({...toBody(), id: curCustomer.id}))
    // @ts-ignore
    else store.dispatch(createCustomer(toBody()))
  }

  const toBody = () => {
    return {
      name: curCustomer.name,
      companyName: curCustomer.companyName,
      address: curCustomer.address,
      description: curCustomer.description
    }
  }

  // const onMounted = async () => {
  //   const customersData = await getMethod('/customers')
  //   console.log(customersData)
  //   setCustomers([...customersData])
  // }
  //
  // useEffect(() => {
  //   onMounted()
  // }, [])

  return (
    <>
      <FHeader title={'Customers'}/>
      <Box className={'container'}>
        <SearchBar onAdd={onAdd}/>

        <FTable
          headers={headers}
          rows={customers}
          onUpdate={onUpdate}
        />
        <CustomerDialog
          customer={curCustomer}
          setCustomer={setCurCustomer}
          onSave={onSave}
          isOpen={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
        />
      </Box>
    </>
  )
}