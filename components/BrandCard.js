import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    imgHover: {
        overflow: 'hidden',
    },
    imgHoverZoom: {
        transition: 'transform .5s ease',
        '&:hover': { transform: 'scale(1.1)' },
    },
});

export default function BrandCard({ brand }) {
    const classes = useStyles();

    return (
        <Link href={`/brand/${brand.slug}`} color='inherit'>
            <Box textAlign='center'>
                <Card className={classes.root}>
                    <CardActionArea>
                        <Box className={classes.imgHover} p={2}>
                            <CardMedia
                                className={classes.imgHoverZoom}
                                component='img'
                                alt='Brand Name'
                                height='180'
                                image='/s2.jpg'
                                title='Brand Name'
                            />
                        </Box>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                component='h6'
                            >
                                <Box textAlign='center'>{brand.brand_name}</Box>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Link>
    );
}
