import {useContext} from "react";
import {TableContext} from "./index.tsx";

export default function () {
  const injector: any = useContext(TableContext)
  const {tableRef} = injector

  tableRef?.current?.addEventListener('mousemove', (e) => {
    console.log('vao dauy dood')
  })
  return (
    <span className={'cell-selection'}></span>
  )
}