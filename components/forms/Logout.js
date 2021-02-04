import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/logout/`)
            .then((res) => {
                // console.log(res.data);
                dispatch({ type: 'LOGOUT', payload: res.data });
                Cookies.remove('haha_ecom_bangla_token');
                router.push('/login');
            })
            .catch((err) => console.log(err.response));
    };
    return (
        <Box textAlign='center'>
            <Button variant='contained' color='primary' onClick={logout}>
                Click to Logout
            </Button>
        </Box>
    );
}
