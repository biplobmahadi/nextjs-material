import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import LogIn from '../components/forms/LogIn';
import Box from '@material-ui/core/Box';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter();
    useEffect(() => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            router.push('/my-account');
        }
    });

    return (
        <>
            <Head>
                <title>Login to Logo - Experience Best</title>
                <link rel='icon' href='/a.ico' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={14} mb={10}>
                <LogIn />
            </Box>
        </>
    );
}
