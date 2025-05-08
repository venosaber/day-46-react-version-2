import {FTable, FHeader, ProductDialog} from '../../components'
import {Color, Header, Product} from '../../utils'
import {Button} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {getMethod, postMethod, putMethod} from "../../utils/api.ts";

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'code', text: 'Code'},
  {name: 'name', text: 'Ten'},
  {name: 'shortName', text: 'Ten Ngan'}, // bang
  {name: 'description', text: 'Mo Ta'},
  {name: 'color', text: 'mau', displayProperty: 'name'}, // {id, name}
  {name: 'action', text: ''}
]


export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curProduct, setCurProduct] = useState<Product>({
    id: null,
    code: '',
    name: '',
    shortName: '',
    // expectedPrice: 0,
    description: '',
    color: null
  })

  const [products, setProducts] = useState<Product[]>([])
  // const [colors, setColors] = useState<Color[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    // @ts-ignore
    setCurProduct({...products.find(e => e.id === id)})
    setIsOpenDialog(true)
  }, [products])

  // const pros = useMemo(() => {
  //   return []
  // }, [])

  const onSave = async () => {
    setProducts([...products, curProduct])
    setIsOpenDialog(false)
    // if id is not null -> update else -> create
    if (curProduct.id) await putMethod(`/products/${curProduct.id}`, toBody())
    else await postMethod(`/products`, toBody())
  }

  const toBody = () => {
    return {
      name: curProduct.name,
      shortName: curProduct.shortName,
      code: curProduct.code,
      description: curProduct.description,
      colorId: null
    }
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
      const colorsData = await getMethod('/colors')
      const productsData = await getMethod('/products')
      console.log(productsData)

      setProducts([...productsData])
      // group data
      // groupData(productsData, colorsData)

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