import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Link from '../../src/Link';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function VerifyEmail() {
    const router = useRouter();
    useEffect(() => {
        if (Cookies.get('haha_ecom_bangla_token')) {
            router.push('/my-account');
        }
    });
    const { key } = router.query;
    const [responseData, setResponseData] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');

    const handleSubmit = () => {
        setLoading(true);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/registration/verify-email/`,
                {
                    key: key,
                }
            )
            .then((res) => {
                // console.log(res.data);
                setLoading(false);
                setResponseData(res.data);
            })
            .catch((err) => {
                setErrMessage(err.response.data.detail);
                // console.log(err.response);
            });
    };
    return (
        <Container component='main' maxWidth='xs'>
            <Head>
                <title>Verify Email</title>
                <link rel='icon' href='/a.ico' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={20}>
                <Box textAlign='center'>
                    {responseData && (
                        <Box mt={2}>
                            <Alert severity='success'>
                                Successfully Verified. Please{' '}
                                <Link href='/login'>Login Now</Link>
                            </Alert>
                        </Box>
                    )}
                    {errMessage && (
                        <Box mt={2}>
                            <Alert severity='error'>
                                Your Verification Link is not Valid.
                            </Alert>
                        </Box>
                    )}
                    <Box mt={4} mb={3}>
                        <Typography component='h5' variant='h5'>
                            Please Verify Your Email
                        </Typography>
                    </Box>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Verify Now
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
