import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import BrandCard from '../components/BrandCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Brands() {
    return (
        <div>
            <Head>
                <title>Brands - Logo.com</title>
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
                <Box mt={8} pt={3} px={3}>
                    <Box
                        py={2}
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                        textAlign='center'
                    >
                        <Typography variant='h4' component='h4'>
                            Our Brands
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <BrandCard />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}
