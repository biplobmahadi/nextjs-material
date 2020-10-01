import Head from 'next/head';
import ProductDetailsTable from './ProductDetailsTable';
import SubCataCard from '../components/SubCataCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import ReactPlayer from 'react-player/youtube';
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function ProductDetails() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div>
            <Box
                m={3}
                p={2}
                textAlign='center'
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                        <Box
                            p={2}
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>
                                Product Details
                            </Typography>
                            <Divider variant='middle' />
                            <Box mt={2} borderRadius='borderRadius'>
                                <ProductDetailsTable />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box
                            p={2}
                            height='100%'
                            borderRadius='borderRadius'
                            style={{ backgroundColor: 'white' }}
                        >
                            <Typography variant='h4'>Video Details</Typography>
                            <Divider variant='middle' />
                            <Box mt={2}>
                                <ReactPlayer
                                    width='100%'
                                    controls
                                    light
                                    url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
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
                    <Typography variant='h4'>You May Like</Typography>
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
                m={3}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Customer Video Review</Typography>
                </Box>
                <Box
                    style={{ backgroundColor: 'white' }}
                    p={3}
                    mt={2}
                    borderRadius='borderRadius'
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ReactPlayer
                                width='100%'
                                height='280px'
                                controls
                                light
                                url='https://www.youtube.com/watch?v=pAPQFqdFDdY'
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box
                m={3}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Typography variant='h4'>Review & Ratings</Typography>
                </Box>
                <Box
                    style={{ backgroundColor: 'white' }}
                    p={3}
                    mt={2}
                    textAlign='center'
                    borderRadius='borderRadius'
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm>
                            <Box>
                                <Typography variant='h4'>4.5</Typography>
                                <StarIcon color='secondary' />
                                <StarIcon color='secondary' />
                                <StarIcon color='secondary' />
                                <StarIcon color='secondary' />
                                <StarIcon color='secondary' />
                            </Box>
                            <Box mt={2}>
                                <Box>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Box>
                                <Box>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Box>
                                <Box>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Box>
                                <Box>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Box>
                                <Box>
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant='h4'>
                                Text field form
                            </Typography>
                            <div className={classes.root}>
                                <Rating
                                    name='hover-feedback'
                                    value={value}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                />
                                {value !== null && (
                                    <Box ml={2}>
                                        {labels[hover !== -1 ? hover : value]}
                                    </Box>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    p={2}
                    mt={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Box textAlign='center'>
                                <Typography variant='h4'>User</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box pr={3}>
                                <Typography variant='h5'>
                                    <Chip
                                        label='2.5'
                                        color='secondary'
                                        size='small'
                                    />{' '}
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Typography>
                                <Typography variant='p'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Nihil porro quaerat totam
                                    nesciunt recusandae ad deserunt fugit
                                    corporis esse. Architecto neque molestias
                                    excepturi a accusamus labore, consequuntur
                                    iusto eos corrupti.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button size='small' startIcon={<ThumbUpIcon />}>
                                Agreed
                            </Button>
                            <Button size='small' startIcon={<ThumbDownIcon />}>
                                Disagreed
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    p={2}
                    mt={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Box textAlign='center'>
                                <Typography variant='h4'>User</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box pr={3}>
                                <Typography variant='h5'>
                                    <Chip
                                        label='2.5'
                                        color='secondary'
                                        size='small'
                                    />{' '}
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Typography>
                                <Typography variant='p'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Nihil porro quaerat totam
                                    nesciunt recusandae ad deserunt fugit
                                    corporis esse. Architecto neque molestias
                                    excepturi a accusamus labore, consequuntur
                                    iusto eos corrupti.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button size='small' startIcon={<ThumbUpIcon />}>
                                Agreed
                            </Button>
                            <Button size='small' startIcon={<ThumbDownIcon />}>
                                Disagreed
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    p={2}
                    mt={2}
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Box textAlign='center'>
                                <Typography variant='h4'>User</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box pr={3}>
                                <Typography variant='h5'>
                                    <Chip
                                        label='2.5'
                                        color='secondary'
                                        size='small'
                                    />{' '}
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                    <StarIcon color='secondary' />
                                </Typography>
                                <Typography variant='p'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Nihil porro quaerat totam
                                    nesciunt recusandae ad deserunt fugit
                                    corporis esse. Architecto neque molestias
                                    excepturi a accusamus labore, consequuntur
                                    iusto eos corrupti.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button size='small' startIcon={<ThumbUpIcon />}>
                                Agreed
                            </Button>
                            <Button size='small' startIcon={<ThumbDownIcon />}>
                                Disagreed
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}
