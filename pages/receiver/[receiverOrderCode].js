import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import Receiver from '../../components/forms/Receiver';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import parseCookies from '../../lib/parseCookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ReceiverOrderCode({ myBag, order }) {
    const router = useRouter();
    const { receiverOrderCode } = router.query;

    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
    });

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
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box mt={14} mb={10}>
                {order ? (
                    order.is_confirm ? (
                        <Container>
                            <Alert severity='success'>
                                You Already Completed This Step!
                            </Alert>
                        </Container>
                    ) : (
                        <Receiver receiverOrderCode={receiverOrderCode} />
                    )
                ) : (
                    <Container>
                        <Alert severity='error'>
                            This is Not A Valid Order!
                        </Alert>
                    </Container>
                )}
            </Box>
        </div>
    );
}

const fetchDataForBag = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForOrder = async (params, config) =>
    await axios
        .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/my-order/${params.receiverOrderCode}/`,
            config
        )
        .then((res) => ({
            order: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

export async function getServerSideProps({ req, params }) {
    const cookies = parseCookies(req);
    const haha_ecom_bangla_token = cookies.haha_ecom_bangla_token
        ? cookies.haha_ecom_bangla_token
        : null;
    // when there have no cookies in browser it will return undefined that is not serializable, thats why set it as null
    // very import comment

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };

    const dataBag = await fetchDataForBag(config);

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
            // We got exact bag for user
            // 1st we filter out the bags whose not send to my order
            // then there have many bags for that user because of backend, hacker can do anything!!
            // the 1st created one is selected as myBag
        }
    }

    const dataOrder = await fetchDataForOrder(params, config);

    let order = dataOrder.order ? dataOrder.order : null;

    return {
        props: {
            myBag,
            order,
        },
    };
}
