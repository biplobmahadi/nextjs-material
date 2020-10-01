import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import SubCataCard from '../components/SubCataCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function Categories() {
    return (
        <div>
            <Head>
                <title>Catergories - Logo.com</title>
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
                mx={3}
                mt={12}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Men Footwear</Typography>
                </Box>
                <Box
                    style={{ backgroundColor: 'white' }}
                    p={3}
                    mt={2}
                    borderRadius='borderRadius'
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <SubCataCard />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box
                mx={3}
                my={4}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Footwear Product</Typography>
                </Box>
                <Box
                    style={{ backgroundColor: 'white' }}
                    p={3}
                    mt={2}
                    borderRadius='borderRadius'
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box
                mx={3}
                my={4}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Topwear Product</Typography>
                </Box>
                <Box
                    style={{ backgroundColor: 'white' }}
                    p={3}
                    mt={2}
                    borderRadius='borderRadius'
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
                        </Grid>
                        <Grid item xs={12} sm>
                            <ProductCard />
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
