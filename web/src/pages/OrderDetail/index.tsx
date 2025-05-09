import {FHeader} from "../../components";
import { Autocomplete, Grid, TextField } from '@mui/material'
import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material/Box";


const customers = [
  { id: 1, name: 'Dung', address: 'Thanh Oai - Ha Noi' },
  { id: 2, name: 'Trung', address: 'Thanh Oai 2 - ha noi' },
  { id: 3, name: 'Giang', address: 'Ca Mau - Viet Nam' },
  { id: 4, name: 'Huy', address: 'My' },
  { id: 5, name: 'Dung', address: 'QUoc Oai - Ha Noi' },
]

export default function() {
  const [inputValue, setInputValue] = useState('');
  const [order, setOrder] = useState({
    id: null,
    customer: {
      id: null, name: ''
    },
    deliveryAddress: '',
    saleDate: '2025-05-10'
  })

  useEffect(() => {
    console.log(order)
  }, [order]);

  return (
    <>
      <FHeader/>
      <Box sx={{maxWidth: 1200, margin: 'auto'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} padding={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                fullWidth={true}
                disablePortal
                options={customers}
                getOptionLabel={(option: any) => option.name}
                getOptionKey={(option) => option.id}
                sx={{ width: 300 }}
                renderInput={
                  (params) => <TextField {...params} fullWidth label="Customer Name" value={order.customer?.name} />
                }
                onChange={(event, newValue) => {
                  setOrder({...order, customer: newValue, deliveryAddress: newValue?.address})
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={order.deliveryAddress}
                onChange={e => setOrder({...order, deliveryAddress: e.target.value})}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DesktopDatePicker
                defaultValue={dayjs(order.saleDate)}
                onChange={(value) => setOrder({...order, saleDate: value.format('YYYY-MM-DD')})}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </>
  )
}