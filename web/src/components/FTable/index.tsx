import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface Header {
    name: string
    text: string
}

interface Row {
    id: number
    name: string
    age: number
    address: string
}

export default ({tableName}) => {
    console.log(tableName)
    const headers: Header[] = [
        { name: 'id', text: 'ID' },
        { name: 'name', text: 'Ten' },
        { name: 'age', text: 'Tuoi' },
        { name: 'address', text: 'Dia Chi' },
    ]

    const rows: Row[] = [
        { id: 1, name: 'Dung', age: 20, address: 'Thanh Oai - Ha Noi' },
        { id: 2, name: 'Trung', age: 22, address: 'Quoc Oai - Ha Noi' },
    ]

    return (
        <>
            <h2>{tableName}</h2>
            <TableContainer sx={{ width: 650, margin: 'auto' }} component={Paper}>
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
                            rows.map((row: Row) => {
                                return (
                                    <TableRow key={row.id}>
                                        {
                                            Object.keys(row).map((rowKey: string) => {
                                                return (
                                                    <TableCell key={`${rowKey}-${row.id}`}>{row[rowKey]}</TableCell>
                                                )
                                            })
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