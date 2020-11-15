import Link from 'next/link';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const useLogout = () => {
    const token = useSelector((state) => state.loginReducer.token);

    const dispatch = useDispatch();
    // need to show msg for email already used and password error with payload
    const logout = () => {
        axios
            .post('http://localhost:8000/rest-auth/logout/')
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'LOGOUT', payload: res.data });
                localStorage.removeItem('haha_ecom_bangla_token');
            })
            .catch((err) => console.log(err.response));
    };
    return { token, logout };
};

export default function OrderCard() {
    const { token, logout } = useLogout();
    return (
        <Box textAlign='center'>
            Do you want to logout?{' '}
            <span>
                {' '}
                <Button variant='contained' color='primary' onClick={logout}>
                    Logout
                </Button>
            </span>
        </Box>
    );
}
