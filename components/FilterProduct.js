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

export default function FilterProduct() {
    return (
        <>
            <Box p={2} borderRadius='borderRadius' boxShadow={1}>
                <Typography gutterBottom variant='h6' component='h6'>
                    Filter by Price
                </Typography>
                <FormControl component='fieldset'>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
                            label='Tk. 100 - 500'
                            labelPlacement='end'
                        />
                    </FormGroup>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
                            label='Tk. 100 - 500'
                            labelPlacement='end'
                        />
                    </FormGroup>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
                            label='Tk. 100 - 500'
                            labelPlacement='end'
                        />
                    </FormGroup>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
                            label='Tk. 100 - 500'
                            labelPlacement='end'
                        />
                    </FormGroup>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
                            label='Tk. 100 - 500'
                            labelPlacement='end'
                        />
                    </FormGroup>
                </FormControl>
            </Box>

            <Box mt={2} p={2} borderRadius='borderRadius' boxShadow={1}>
                <Typography gutterBottom variant='h6' component='h6'>
                    Filter by Ratings
                </Typography>
                <FormControl component='fieldset'>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
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
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
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
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
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
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
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
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='end'
                            control={<Checkbox color='secondary' />}
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
        </>
    );
}
