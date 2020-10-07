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
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={6} pt={3} px={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Typography variant='h5' component='h5'>
                                            My Bag{' '}
                                            <Chip
                                                label={`${12} items`}
                                                color='secondary'
                                                size='small'
                                            />
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant='contained'>
                                            <Box px={3}>Total Tk. 5000</Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box pt={2} borderRadius='borderRadius'>
                                <ProductTable />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h4'>
                                    Checkout Please
                                </Typography>
                                <Typography variant='h6'>
                                    SubTotal = 122
                                </Typography>
                                <Typography variant='h6'>
                                    Shipping = 122
                                </Typography>
                                <Typography variant='h6'>
                                    Total = 122
                                </Typography>
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
                                        <Button
                                            variant='contained'
                                            color='primary'
                                        >
                                            <Box textAlign='center' px={4}>
                                                Gift to Special
                                            </Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}
