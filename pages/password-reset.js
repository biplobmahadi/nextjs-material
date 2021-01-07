import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import PasswordResetForm from '../components/forms/PasswordResetForm';
import Box from '@material-ui/core/Box';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function PasswordReset() {
    const router = useRouter();
    useEffect(() => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            router.push('/my-account');
        }
    });
    return (
        <div>
            <Head>
                <title>Password Reset</title>
                <link rel='icon' href='/a.ico' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={14} mb={10}>
                <PasswordResetForm />
            </Box>
        </div>
    );
}
