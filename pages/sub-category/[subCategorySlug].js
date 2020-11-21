import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import ProductCard from '../../components/ProductCard';
import FilterProductDialog from '../../components/FilterProductDialog';
import MainFooter from '../../components/MainFooter';
import FilterProduct from '../../components/FilterProduct';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { boxSizing } from '@material-ui/system';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import parseCookies from '../../lib/parseCookies';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('xl')]: {
            marginRight: theme.spacing(5),
        },
    },
    boot: {
        [theme.breakpoints.up('xl')]: {
            marginLeft: theme.spacing(4),
        },
    },
}));

export default function SubCategories({ subCategory }) {
    const classes = useStyles();
    console.log('subCategory', subCategory);
    return (
        <div>
            <Head>
                <title>Sub Catergories - {subCategory.sub_category_name}</title>
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
                    <Hidden lgUp>
                        <Box mt={2}>
                            <FilterProductDialog />
                        </Box>
                    </Hidden>

                    <Box mt={2}>
                        <Grid container spacing={3}>
                            <Hidden mdDown>
                                <Grid item xs={12} sm={3} md={4} lg={3} xl={3}>
                                    <Box
                                        style={{ backgroundColor: 'white' }}
                                        p={3}
                                        className={classes.root}
                                        borderRadius='borderRadius'
                                    >
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h6'
                                        >
                                            Filter by Brands
                                        </Typography>
                                        <FormControl component='fieldset'>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Apple'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Google'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='One Plus'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Samsung'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Nokia'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>

                                    <Box
                                        style={{ backgroundColor: 'white' }}
                                        mt={3}
                                        p={3}
                                        className={classes.root}
                                        borderRadius='borderRadius'
                                    >
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h6'
                                        >
                                            Filter by Price
                                        </Typography>
                                        <FormControl component='fieldset'>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>

                                    <Box
                                        style={{ backgroundColor: 'white' }}
                                        mt={3}
                                        p={3}
                                        className={classes.root}
                                        borderRadius='borderRadius'
                                    >
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h6'
                                        >
                                            Filter by Ratings
                                        </Typography>
                                        <FormControl component='fieldset'>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <span>
                                                            <StarIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                        </span>
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <span>
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                        </span>
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <span>
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarBorderIcon />
                                                            <StarBorderIcon />
                                                        </span>
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <span>
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarBorderIcon />
                                                        </span>
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <span>
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                            <StarIcon />
                                                        </span>
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Hidden>

                            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                                <Box className={classes.boot}>
                                    <Grid container spacing={2}>
                                        {subCategory.product &&
                                            subCategory.product.map(
                                                (product) => (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={4}
                                                        lg={4}
                                                        xl={3}
                                                    >
                                                        <ProductCard
                                                            product={
                                                                product &&
                                                                product
                                                            }
                                                        />
                                                    </Grid>
                                                )
                                            )}
                                    </Grid>
                                </Box>
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

const fetchDataForSubCategory = async (params) =>
    await axios
        .get(`http://localhost:8000/sub-categories/${params.subCategorySlug}/`)
        .then((res) => ({
            subCategory: res.data,
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

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };

    const dataSubCategory = await fetchDataForSubCategory(params);
    const subCategory = dataSubCategory.subCategory;

    return {
        props: {
            subCategory,
        },
    };
}
