import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllChat, getAllChat } from '../../Redux/Features/Chat.Slice';
import { RootState } from '../../Redux/Store';
import { CircularProgress } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatDeleteDailog({open,setOpen}:{open:boolean,setOpen:Function}) {
  const dispatch = useDispatch()
  const email = localStorage.getItem("email")
  const chatsData = useSelector((state:RootState)=>state.chat)
  const handleDeleteChats=()=>{
    dispatch(deleteAllChat({email:email}))
    .then((res:any)=>{
      if(res?.payload?.message==="OK")
      setOpen(false)
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        style={{
          backgroundColor: "rgb(11 11 12 / 56%)",
          padding: "30px",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "20px",
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className='DailogBox'
      >
        <div style={{backgroundColor:'#1d1b1b',padding:'10px'}}>
        <DialogTitle style={{fontSize:'28px'}}>{"Are you sure, you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontSize:'18px',color:'white'}}>
           Confirm, delete all the  Conversation!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display:'flex',justifyContent:'space-between'}}>
          <div></div>
          <div style={{display:'flex',gap:'10px'}}>
          <Button onClick={handleClose} sx={{
            backgroundColor:'#51538f',color: "white",borderRadius: 3,padding: '8px 20px',":hover": {
              bgcolor: "#1b21d3",
            },
          }}>Cancel</Button>
          <Button
            onClick={handleDeleteChats}
            sx={{
              
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              padding: '8px 20px',
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            disabled={chatsData?.isFetching}
          >
          {chatsData?.isFetching ?<><CircularProgress size={20}/> Delete</>:'Delete'}  
          </Button>
          </div>
        </DialogActions>
       
        </div>
      </Dialog>
    </React.Fragment>
  );
}