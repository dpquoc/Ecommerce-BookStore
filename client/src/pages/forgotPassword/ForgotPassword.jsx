import React from 'react'
import './ForgotPassword.scss'

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Input, Button } from 'antd';
import { LockFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiURL';


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [clicked, setClicked] = useState(false);
    const handleReset = async () => {
        setClicked(true);
        const data = {
            email: email
        }
        await axios.post(`${BASE_URL}forgot-password`, data, { withCredentials: true })
            .then(res => {
                alert(res.data.message);

            })
            .catch(err => {
                alert(res.data.message);
            })
    }

    return (
        <div className='forgot-password'>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h1" variant="h4" marginX="auto" fontSize="3rem" marginBottom="20px">
                        Forgot password
                    </Typography>
                    <LockFilled style={{ fontSize: '5rem', marginBottom: '40px' }} />
                    <Typography component="h2" variant="h4" marginX="auto" marginBottom="20px">
                        Email address account:
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Input placeholder="example@gmail.com" style={{ fontSize: '2rem' }} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="primary" style={{ width: '100%' }} onClick={handleReset} >Reset Password</Button>
                        </Grid>
                    </Grid>
                    {clicked && <Typography component="h2" variant="h4" marginX="auto" marginBottom="20px">
                        Processing your request.... Please wait a bit for our response !
                    </Typography>}
                    
                </Paper>
            </Container>
        </div>
    )
}

export default ForgotPassword