import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Receiver from '../../components/forms/Receiver';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { useRouter } from 'next/router';

export default function ReceiverOrderId() {
    const router = useRouter();
    const { receiverOrderId } = router.query;
    return (
        <div>
            {' '}
            <Head>
                <title>Login</title>
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
                <Receiver receiverOrderId={receiverOrderId} />
            </Box>
        </div>
    );
}
