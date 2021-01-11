import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Receiver from '../../components/forms/Receiver';
import Box from '@material-ui/core/Box';

import { useRouter } from 'next/router';

export default function ReceiverOrderCode() {
    const router = useRouter();
    const { receiverOrderCode } = router.query;
    return (
        <div>
            <Head>
                <title>Receiver Details</title>
                <link rel='icon' href='/a.ico' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box mt={14} mb={10}>
                <Receiver receiverOrderCode={receiverOrderCode} />
            </Box>
        </div>
    );
}
