import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import PasswordResetForm from '../components/forms/PasswordResetForm';
import Box from '@material-ui/core/Box';

export default function PasswordReset() {
    return (
        <div>
            <Head>
                <title>Password Reset</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
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
