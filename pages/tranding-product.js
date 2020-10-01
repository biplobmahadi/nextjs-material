import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
export default function TrandingProduct() {
    return (
        <div>
            <Head>
                <title>Next App with Material-Ui</title>
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
                mt={11}
                mx={3}
                p={2}
                textAlign='center'
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <img src='/aa.jpg' alt='' srcset='' height='250' width='100%' />
            </Box>
            <Box
                m={3}
                p={2}
                textAlign='center'
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Button variant='contained' color='primary'>
                        <Box px={5}>Buy All</Box>
                    </Button>
                </Box>
                <Box
                    mt={2}
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box
                                style={{ backgroundColor: 'white' }}
                                p={3}
                                mt={2}
                                borderRadius='borderRadius'
                            >
                                <ProductCard />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
        </div>
    );
}
