import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Payment from '../../components/forms/Payment';
import Box from '@material-ui/core/Box';

import { useRouter } from 'next/router';

export default function PaymentOrderCode() {
    const router = useRouter();
    const { paymentOrderCode } = router.query;
    return (
        <div>
            {' '}
            <Head>
                <title>Payment Details</title>
                <link rel='icon' href='/a.ico' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={14} mb={10}>
                <Payment paymentOrderCode={paymentOrderCode} />
            </Box>
        </div>
    );
}
