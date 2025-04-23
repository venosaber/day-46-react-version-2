import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface DialogContainer {
  isOpen: boolean,
  onClose: () => void,
  width?: number
}

export default ({isOpen, onClose, width=450}: DialogContainer)=> {
  return (
    <Dialog open={isOpen} sx={{width, margin: 'auto'}}>
      <DialogTitle>Dialog Container</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <TextField fullWidth label="Name" variant="outlined"/>
          <TextField fullWidth label="Type" variant="outlined"/>
          <TextField fullWidth label="Original" variant="outlined"/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="outlined" onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}