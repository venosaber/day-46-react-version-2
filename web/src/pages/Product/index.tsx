import {FTable, ProductDialog} from '../../components'
import {Header, Product} from '../../utils'
import {Button} from "@mui/material";
import {useState} from "react";

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curProduct, setCurProduct] = useState<Product>({
    id: null,
    code: '',
    name: '',
    shortName: '',
    expectedPrice: 0,
    description: '',
    color: null
  })

  const headers: Header[] = [
    {name: 'id', text: 'ID'},
    {name: 'code', text: 'Code'},
    {name: 'name', text: 'Ten'},
    {name: 'shortName', text: 'Ten Ngan'},
    {name: 'expectedPrice', text: 'Gia De Xuat'},
    {name: 'color', text: 'mau'},
    {name: 'action', text: ''}
  ]

  const [products, setProducts] = useState<Product[]>([
    {id: 1, code: 'F8-2020', name: 'Hoa Hong', shortName: 'HH', expectedPrice: 2000, color: 1, description: ''},
    {id: 2, code: 'F8-2022', name: 'Hoa Hong', shortName: 'HH', expectedPrice: 2000, color: 1, description: ''},
    {id: 3, code: 'F8-2023', name: 'Hoa Hong', shortName: 'HH', expectedPrice: 2000, color: 1, description: ''},
    {id: 4, code: 'F8-2024', name: 'Hoa Hong', shortName: 'HH', expectedPrice: 2000, color: 1, description: ''},
  ])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    console.log(id)
    // @ts-ignore
    setCurProduct({...products.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onSave = () => {
    setProducts([...products, curProduct])
    setIsOpenDialog(false)
    // todo: call api and save
  }

  return (
    <>
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        tableName={'employee hihi'}
        headers={headers}
        rows={products}
        onUpdate={onUpdate}
      />
      <ProductDialog
        product={curProduct}
        setProduct={setCurProduct}
        onSave={onSave}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}