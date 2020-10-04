import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { boxSizing } from '@material-ui/system';

export default function SubCategories() {
    return (
        <div>
            <Head>
                <title>Sub Catergories - Logo.com</title>
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
                            Men's Shirts
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3} xl={3}>
                                <Box
                                    style={{ backgroundColor: 'white' }}
                                    p={3}
                                    mr={5}
                                    borderRadius='borderRadius'
                                >
                                    <Typography gutterBottom variant='h6'>
                                        Filter by Price
                                    </Typography>
                                    <FormControl component='fieldset'>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>

                                <Box
                                    style={{ backgroundColor: 'white' }}
                                    mt={3}
                                    p={3}
                                    mr={5}
                                    borderRadius='borderRadius'
                                >
                                    <Typography gutterBottom variant='h6'>
                                        Filter by Price
                                    </Typography>
                                    <FormControl component='fieldset'>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>

                                <Box
                                    style={{ backgroundColor: 'white' }}
                                    mt={3}
                                    p={3}
                                    mr={5}
                                    borderRadius='borderRadius'
                                >
                                    <Typography gutterBottom variant='h6'>
                                        Filter by Price
                                    </Typography>
                                    <FormControl component='fieldset'>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                        <FormGroup aria-label='position' row>
                                            <FormControlLabel
                                                value='end'
                                                control={
                                                    <Checkbox color='secondary' />
                                                }
                                                label='Tk. 40 - 100'
                                                labelPlacement='end'
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                </Grid>
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
