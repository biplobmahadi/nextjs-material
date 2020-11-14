import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Link from '../../src/Link';

export default function VerifyEmail() {
    const router = useRouter();
    const { key } = router.query;
    const [responseData, setResponseData] = React.useState('');

    const handleSubmit = () => {
        console.log(key);
        axios
            .post(
                'http://localhost:8000/rest-auth/registration/verify-email/',
                {
                    key: key,
                }
            )
            .then((res) => {
                console.log(res.data);
                setResponseData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    return (
        <div>
            <Head>
                <title>Verify Email</title>
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
                <Box textAlign='center'>
                    {responseData && (
                        <Box mt={2}>
                            <Alert severity='success'>
                                Please <Link href='/login'>Login Now</Link>
                            </Alert>
                        </Box>
                    )}
                    <Typography>Verify your Email</Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                    >
                        Verify
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
