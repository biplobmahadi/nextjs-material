import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import ProductTable from '../components/ProductTable';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Receiver from '../components/forms/Receiver';

export default function ReceiverAddress() {
    return (
        <div>
            {' '}
            <Head>
                <title>Receiver</title>
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
            <Box
                mt={8}
                p={5}
                // borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <Box
                            p={2}
                            m={3}
                            boxShadow={1}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Box height='100%'>
                                <Typography variant='h5'>
                                    <strong>Shipping Address</strong>
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            m={3}
                            p={4}
                            boxShadow={1}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Receiver />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            p={2}
                            m={3}
                            boxShadow={1}
                            height='93%'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>
                                Checkout Summary
                            </Typography>
                            <Typography variant='h6'>SubTotal = 122</Typography>
                            <Typography variant='h6'>Shipping = 122</Typography>
                            <Typography variant='h6'>Total = 122</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
        </div>
    );
}
