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

export default function FilterProduct({
    handlePriceFilter100TK,
    handlePriceFilter500TK,
    handlePriceFilter1000TK,
    handlePriceFilter2000TK,
    handlePriceFilter5000TK,
}) {
    return (
        <Box p={2} borderRadius='borderRadius' boxShadow={1}>
            <Typography gutterBottom variant='h6' component='h6'>
                Filter by Price
            </Typography>
            <FormControl component='fieldset'>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={100}
                                color='secondary'
                                onClick={(event) =>
                                    handlePriceFilter100TK(event)
                                }
                            />
                        }
                        label='Tk. 0 - 100'
                        labelPlacement='end'
                    />
                </FormGroup>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={500}
                                color='secondary'
                                onClick={(event) =>
                                    handlePriceFilter500TK(event)
                                }
                            />
                        }
                        label='Tk. 100 - 500'
                        labelPlacement='end'
                    />
                </FormGroup>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={1000}
                                color='secondary'
                                onClick={(event) =>
                                    handlePriceFilter1000TK(event)
                                }
                            />
                        }
                        label='Tk. 500 - 1000'
                        labelPlacement='end'
                    />
                </FormGroup>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={2000}
                                color='secondary'
                                onClick={(event) =>
                                    handlePriceFilter2000TK(event)
                                }
                            />
                        }
                        label='Tk. 1000 - 2000'
                        labelPlacement='end'
                    />
                </FormGroup>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={5000}
                                color='secondary'
                                onClick={(event) =>
                                    handlePriceFilter5000TK(event)
                                }
                            />
                        }
                        label='Tk. 2000 - 5000'
                        labelPlacement='end'
                    />
                </FormGroup>
            </FormControl>
        </Box>
    );
}
