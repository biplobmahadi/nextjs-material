import Link from 'next/link';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const useLogout = () => {
    const token = useSelector((state) => state.loginReducer.token);

    const dispatch = useDispatch();
    // need to show msg for email already used and password error with payload
    const logout = (router) => {
        axios
            .post('http://localhost:8000/rest-auth/logout/')
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'LOGOUT', payload: res.data });
                Cookies.remove('haha_ecom_bangla_token');
                router.push('/login');
            })
            .catch((err) => console.log(err.response));
    };
    return { token, logout };
};

export default function Logout() {
    const router = useRouter();
    const { token, logout } = useLogout();
    return (
        <Box textAlign='center'>
            Do you want to logout? {Cookies.get('haha_ecom_bangla_token')}
            <span>
                {' '}
                <Button
                    variant='contained'
                    color='primary'
                    onClick={()=>logout(router)}
                >
                    Logout
                </Button>
            </span>
        </Box>
    );
}
