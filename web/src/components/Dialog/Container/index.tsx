import {Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

interface DialogContainer {
  isOpen: boolean,
  onClose: () => void,
  width?: number
}

export default ({isOpen, onClose, width=450}: DialogContainer)=> {
  return (
    <Dialog open={isOpen} sx={{margin: 'auto'}}>
      <DialogTitle>Dialog Container</DialogTitle>
      <DialogContent>
        <Stack sx={{ width: width }} spacing={2}>
          <TextField fullWidth label="Name" variant="outlined"/>
          <TextField fullWidth label="Type" variant="outlined"/>
          <TextField fullWidth label="Original" variant="outlined"/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="outlined" onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}