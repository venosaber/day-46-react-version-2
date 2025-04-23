import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Header} from '../../utils'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface FTable {
  tableName: string
  headers: Header[]
  rows: any[]
}

const RenderActionBtn = (headers: Header[]) => {
  const keys = headers.map(header => header.name)
  if (!keys.includes('action')) return

  return (
    <TableCell>
      <EditIcon color={'success'}/>
      <DeleteOutlineIcon color={'error'}/>
    </TableCell>
  )
}


export default ({tableName, headers, rows}: FTable) => {
  return (
    <>
      <h2>{tableName}</h2>
      <TableContainer sx={{width: 650, margin: 'auto'}} component={Paper}>
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
              rows.map((row: any) => {
                return (
                  <TableRow key={row.id}>
                    {
                      Object.keys(row).map((rowKey: string) => {
                        // @ts-ignore
                        return <TableCell key={`${rowKey}-${row.id}`}>{row[rowKey]}</TableCell>
                      })
                    }
                    {
                      RenderActionBtn(headers)
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