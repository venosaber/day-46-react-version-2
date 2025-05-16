import {Table, TableBody, TableCell, TableHead, TableRow, Box} from "@mui/material";
import Row from './Row.tsx'
import './style.sass'
import CellCursor from "./CellCursor.tsx";
import {createContext, useEffect, useState, useRef} from "react";
import CellInput from "./CellInput.tsx";

const defaultCursor = {
  rowIndex: 0,
  columnIndex: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  editing: false
}

export const TableContext = createContext(null);

const onFocus = () => {
  const input = document.querySelector('.cell-input input')
  // @ts-ignore
  input.focus()
}

function FTableComponent({columns, rows, onInput}: any) {

  const [cursor, setCursor] = useState({...defaultCursor})
  const tableRef = useRef<HTMLTableElement>(null)

  const provider = {
    cursor, setCursor, rows, columns, onFocus, onInput, tableRef
  }

  const onKeyDown = (e: any) => {
    setCursor({
      ...cursor, editing: true
    })

    onFocus()
  }

  return (
    // @ts-ignore
    <Box className={'f-editable-table'}>
      <TableContext.Provider value={provider}>
        <Table tabIndex={0} onKeyDown={onKeyDown} ref={tableRef}>
          <TableHead>
            <TableRow>
              {
                columns.map((column: any) => {
                  return <TableCell width={column.width} size={"small"} key={column.name}>{column.name}</TableCell>
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              rows?.map((row: any, rowIndex: number) => {
                // @ts-ignore
                return (
                  <Row
                    key={`row-${rowIndex}`}
                    columns={columns}
                    row={row}
                    rowIndex={rowIndex}
                  />
                )
              })
            }

          </TableBody>
        </Table>

        <CellCursor/>
        <CellInput/>
      </TableContext.Provider>
    </Box>
  )
}

export default FTableComponent