import Link from 'next/link';
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
import FormikFormDemo from '../components/FormikFormDemo';
export default function Bag() {
    return (
        <div>
            <Head>
                <title>My Bag</title>
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
                mt={12}
                mx={3}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <Box
                            p={2}
                            m={2}
                            boxShadow={1}
                            display='flex'
                            alignItems='center'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Box height='100%' flexGrow={1}>
                                <Typography variant='h5'>
                                    My Bag{' '}
                                    <Chip
                                        label={`${12} items`}
                                        color='secondary'
                                        size='small'
                                    />
                                </Typography>
                            </Box>
                            <Box height='100%'>
                                <Typography variant='h5'>
                                    Total Tk. 5000
                                </Typography>
                            </Box>
                        </Box>
                        <Box m={2} borderRadius='borderRadius'>
                            <ProductTable />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            p={2}
                            m={2}
                            boxShadow={1}
                            height='93%'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>
                                Checkout Please
                            </Typography>
                            <Typography variant='h6'>SubTotal = 122</Typography>
                            <Typography variant='h6'>Shipping = 122</Typography>
                            <Typography variant='h6'>Total = 122</Typography>
                            <br />
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm>
                                    <Link href='/address'>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                        >
                                            <Box textAlign='center' px={4}>
                                                Pay For You
                                            </Box>
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm>
                                    <Button variant='contained' color='primary'>
                                        <Box textAlign='center' px={4}>
                                            Gift to Special
                                        </Box>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <Box
                    p={2}
                    m={2}
                    boxShadow={1}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm>
                            <Chip label='Full Refund' color='secondary' />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Chip label='Happy Return' color='secondary' />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Chip label='Cash On Delivery' color='secondary' />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Chip label='Delivery Tk. 50' color='secondary' />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
            <Box m={4} pb={4}>
                <FormikFormDemo />
            </Box>
        </div>
    );
}
