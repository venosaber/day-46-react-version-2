import {FTable, FHeader, ProductDialog} from '../../components'
import {Color, Header, Product} from '../../utils'
import {Button} from "@mui/material";
import {useState, useEffect} from "react";
import api from '../../plugins/api'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'code', text: 'Code'},
  {name: 'name', text: 'Ten'},
  {name: 'shortName', text: 'Ten Ngan'},
  {name: 'expectedPrice', text: 'Gia De Xuat'},
  {name: 'description', text: 'Mo Ta'},
  {name: 'color', text: 'mau'},
  {name: 'action', text: ''}
]


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

  const [products, setProducts] = useState<Product[]>([])
  // const [colors, setColors] = useState<Color[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    // @ts-ignore
    setCurProduct({...products.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onSave = () => {
    setProducts([...products, curProduct])
    setIsOpenDialog(false)
    // todo: call api and save
  }

  const groupData = (pros: Product[], colors: Color[]) => {
    // hash table (color)
    const colorObj = {}
    colors.forEach((color: Color) => {
      // @ts-ignore
      colorObj[color.id] = color.name
    })

    // join to product
    pros.forEach((pro: Product) => {
      // @ts-ignore
      pro.color = colorObj[pro.color]
    })
    setProducts([...pros])
  }

  const getData = async () => {
    try {
      const [productsData, colorsData] = await Promise.all([
        api.get('/products/'),
        api.get('/colors/'),
      ])

      // group data
      groupData(productsData.data, colorsData.data)

    } catch (e) {
      console.log(e)
    }
  }

  // onmounted
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <FHeader/>
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        tableName={'employee hihi'}
        headers={headers}
        rows={products}
        onUpdate={onUpdate}
        width={900}
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