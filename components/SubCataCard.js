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

export default function SubCataCard() {
    const classes = useStyles();

    return (
        <Link href='/sub-categories'>
            <Box textAlign='center'>
                <Card className={classes.root}>
                    <CardActionArea>
                        <Box className={classes.imgHover} p={2}>
                            <CardMedia
                                className={classes.imgHoverZoom}
                                component='img'
                                alt='Sub Category'
                                height='180'
                                image='/s2.jpg'
                                title='Sub Category'
                            />
                        </Box>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                component='h6'
                            >
                                <Box textAlign='center'>Sub Category</Box>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Link>
    );
}
