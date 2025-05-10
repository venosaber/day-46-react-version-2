import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Header} from '../../utils'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {memo} from 'react'

interface FTable {
  headers: Header[]
  rows: any[]
  onUpdate?: (id: number) => void
  width: number
}

const RenderActionBtn = (
  headers: Header[],
  onUpdate: () => void
) => {
  const keys = headers.map(header => header.name)
  if (!keys.includes('action')) return

  return (
    <TableCell>
      <EditIcon color={'success'} onClick={onUpdate}/>
      <DeleteOutlineIcon color={'error'} />
    </TableCell>
  )
}


function FTableComponent({headers, rows, onUpdate, width=650}: FTable) {
  console.log(1234567)

  // const rows = []
  // const onUpdate = () => {}

  return (
    <>
      <TableContainer sx={{width, margin: 'auto'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                headers.map((header: Header) => {
                  return <TableCell key={header.name}>{header.text}</TableCell>
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              rows?.map((row: any) => {
                // @ts-ignore
                return (
                  <TableRow key={row.id}>
                    {
                      Object.keys(row).map((rowKey: string) => {
                        const header = headers.find(h => h.name === rowKey)
                        return (
                          <TableCell key={`${rowKey}-${row.id}`}>
                            {
                              row[rowKey]
                                ? header?.displayProperty ? row[rowKey][header.displayProperty] : row[rowKey]
                                : ''
                            }
                          </TableCell>
                        )
                      })
                    }
                    {
                      // @ts-ignore
                      RenderActionBtn(headers, () => onUpdate(row.id))
                    }
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default memo(FTableComponent)