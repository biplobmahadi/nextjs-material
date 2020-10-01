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
});

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        <Link href='/tranding-product'>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        alt='Contemplative Reptile'
                        height='240'
                        image='/aa.jpg'
                        title='Contemplative Reptile'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            <Box textAlign='center'>Khula Mela</Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Link href='/tranding-product'>
                        <Button
                            variant='contained'
                            size='small'
                            color='primary'
                        >
                            <Box textAlign='center' px={4}>
                                Buy Now
                            </Box>
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Link>
    );
}
