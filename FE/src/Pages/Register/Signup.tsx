import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, IconButton, CircularProgress, Snackbar, Alert, AlertColor } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Icons for password visibility
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { validateSignUp } from './SignUp.validate';
import { useTranslation } from 'react-i18next';
import { validationError } from '../../Constraints/Shared.Validation';
import airobot from"../../assets/airobot.png"
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../Redux/Features/Auth.slice';
import { RootState } from '../../Redux/Store';

export interface SignUpValues {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
 const dispatch = useDispatch()
 const SignUp=useSelector((state:RootState)=>state?.user)
 const [open,setOpen] = useState(false)
 const [successVal,setSuccess] = useState("success")
 const [msg, setMsg] = useState('')

 const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};


  return (
    <Box width={'100%'} height={'100%'} display='flex' flex={1}>
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img src={airobot} alt='Robot' style={{ width: '400px' }} />
      </Box>

      <Box
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <Formik<SignUpValues>
          validateOnBlur
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
           dispatch(signup({username: values.username,email:values.email, password: values.password }))
           .then((res:any)=>{
          
            if(res?.payload?.status===true)
            {
              setMsg("Login Successfully")
              setSuccess("success")
              navigate('/login')
              setOpen(true)
            }
            if(res?.payload?.status===false)
            {
              setMsg(res?.payload?.msg)
              setSuccess("error")
              setOpen(true)
            }
           })
          }}
          validate={(values) => validateSignUp(values, t)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <form
              style={{
                margin: 'auto',
                padding: '30px',
                borderRadius: '10px',
                border: '1px solid',
                boxShadow: '-5px -5px 105px #64f3d5',
              }}
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='h4' textAlign='center' padding={2} fontWeight={600}>
                  Sign-up
                </Typography>
                <TextField
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  name='username'
                  label='Name'
                  type='name'
                  InputProps={{
                    style: {
                      width: '400px',
                      borderRadius: 10,
                      fontSize: 20,
                      color: 'white',
                    },
                  }}
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={validationError(errors.username, touched.username)}
                  value={values.username}
                  onChange={handleChange}
                />

                <TextField
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  name='email'
                  label='Email'
                  type='email'
                  InputProps={{
                    style: {
                      width: '400px',
                      borderRadius: 10,
                      fontSize: 20,
                      color: 'white',
                    },
                  }}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={validationError(errors.email, touched.email)}
                  value={values.email}
                  onChange={handleChange}
                />

                <TextField
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'} // Show password or hide it based on showPassword state
                  InputProps={{
                    style: {
                      width: '400px',
                      borderRadius: 10,
                      fontSize: 20,
                      color: 'white',
                    },
                    endAdornment: ( // Add endAdornment for "view password" icon
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          style={{ color: 'white' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={validationError(errors.password, touched.password)}
                  value={values.password}
                  onChange={handleChange}
                />
                <Button
                  type='submit'
                  sx={{
                    px: 2,
                    py: 1,
                    mt: 2,
                    width: '400px',
                    borderRadius: 2,
                    bgcolor: '#00fffc',
                    ':hover': {
                      bgcolor: 'white',
                      color: 'black',
                    },
                  }}
                  disabled={SignUp?.isFetching}
                >
                 {SignUp?.isFetching ?<> <CircularProgress size={20}/> Sign-up </>:"Sign-up"} 
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
  <Alert
    onClose={handleClose}
    severity={successVal as AlertColor}
    variant="filled"
    sx={{ width: '100%' }}
    
  >
    {msg}
  </Alert>
</Snackbar>
    </Box>
  );
};

export default SignUp;
