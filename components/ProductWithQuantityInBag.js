import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useRouter } from 'next/router';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import TableHead from '@material-ui/core/TableHead';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

import Cookies from 'js-cookie';
import { useEffect } from 'react';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label='previous page'
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function Bag({ myBag, rows, config, changeMyBag }) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const [loadingForAdd, setLoadingForAdd] = React.useState(false);
    const [loadingForRemove, setLoadingForRemove] = React.useState(false);
    const [loadingForDelete, setLoadingForDelete] = React.useState(false);

    // this is for alert close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAdd = (value) => {
        let productWithQuantity = JSON.parse(value);
        // console.log(productWithQuantity);

        setLoadingForAdd(true);

        // 1st we need to get the available quantity for this product
        axios
            .get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${productWithQuantity.product.productavailable.id}/`,
                config
            )
            .then((res) => {
                // if product available then this will run from below
                // add to bag process will start from here
                if (res.data.available_quantity > 0) {
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                            {
                                quantity: productWithQuantity.quantity + 1,
                                cost:
                                    productWithQuantity.cost +
                                    productWithQuantity.product.price,
                            },
                            config
                        )
                        .then((res) => {
                            // console.log(res.data);
                            let pk = [];
                            myBag.product_with_quantity.map(
                                (product_with_quantity) =>
                                    (pk = pk.concat(product_with_quantity.id))
                            );
                            // console.log(pk);
                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                    {
                                        product_with_quantity: pk,
                                        sub_total:
                                            myBag.sub_total +
                                            productWithQuantity.product.price,
                                    },
                                    config
                                )
                                .then((res) => {
                                    // console.log(res.data);
                                    // here productWithQuantity.product.productavailable.id used, because here product means product with quantity not single product
                                    axios
                                        .patch(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${productWithQuantity.product.productavailable.id}/`,
                                            {
                                                available_quantity:
                                                    productWithQuantity.product
                                                        .productavailable
                                                        .available_quantity - 1,
                                            },
                                            config
                                        )
                                        .then((res) => {
                                            // final get will be after all post, patch done
                                            axios
                                                .get(
                                                    `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                    config
                                                )
                                                .then((res) => {
                                                    changeMyBag(res.data);

                                                    setLoadingForAdd(false);
                                                })
                                                .catch((err) =>
                                                    console.log(err.response)
                                                );
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    console.log('product not available');
                }
            })
            .catch((err) => console.log(err.response));
    };

    const handleRemove = (value) => {
        let productWithQuantity = JSON.parse(value);
        // console.log(productWithQuantity);

        setLoadingForRemove(true);

        axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                {
                    quantity: productWithQuantity.quantity - 1,
                    cost:
                        productWithQuantity.cost -
                        productWithQuantity.product.price,
                },
                config
            )
            .then((res) => {
                // console.log(res.data);
                let pk = [];
                myBag.product_with_quantity.map(
                    (product_with_quantity) =>
                        (pk = pk.concat(product_with_quantity.id))
                );
                // console.log(pk);
                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                        {
                            product_with_quantity: pk,
                            sub_total:
                                myBag.sub_total -
                                productWithQuantity.product.price,
                        },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data);
                        // here product.product.productavailable.id used, because here product means product with quantity not single product
                        axios
                            .patch(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${productWithQuantity.product.productavailable.id}/`,
                                {
                                    available_quantity:
                                        productWithQuantity.product
                                            .productavailable
                                            .available_quantity + 1,
                                },
                                config
                            )
                            .then((res) => {
                                // final get will be after all post, patch done
                                axios
                                    .get(
                                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                        config
                                    )
                                    .then((res) => {
                                        changeMyBag(res.data);
                                        setLoadingForRemove(false);
                                    })
                                    .catch((err) => console.log(err.response));
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleDelete = (value) => {
        let productWithQuantity = JSON.parse(value);
        // console.log(productWithQuantity);

        setLoadingForDelete(true);
        // ###### Most Important
        // when the productWithQuantity select for delete is added as trial
        // then only delete this one
        // when selected productWithQuantity is not added as trial
        // then find the all productWithQuantity for same category
        // if productWithQuantity of same category have more than 1 as not trial
        // then only delete this selected one
        // if productWithQuantity of same category have only one 1 as not trial
        // then delete this one and also all trial product, which will max 2
        // but if here have only 1 productWithQuantity of same category, not have trial
        // then obviously delete this selected one
        // ##########

        // 1st get all pk of myBag product_with_quantity
        let pk = [];
        myBag.product_with_quantity.map(
            (product_with_quantity) =>
                (pk = pk.concat(product_with_quantity.id))
        );

        let sameCategoryProductsWithQuantityNotAddAsTrial = [];
        let sameCategoryProductsWithQuantityPk = [];
        let sameCategoryProductsWithQuantity = [];
        // i declare it here because i will use it as condition or mapping

        // if selected productWithQuantity add as trial then only delete it
        if (productWithQuantity.add_as_trial) {
            // only delete trail product by this process
            let length = pk.length;
            for (let i = 0; i < length; i++) {
                if (pk[i] === productWithQuantity.id) {
                    pk.splice(i, 1);
                    i--;
                }
            }
            // need to remove exact array element... that's why I splice this exact way
        } else {
            // here, get all productWithQuantity of same category and also the productWithQuantity pk of same category in array

            sameCategoryProductsWithQuantity = myBag.product_with_quantity.filter(
                (product_with_quantity) =>
                    product_with_quantity.product.category.id ===
                    productWithQuantity.product.category.id
            );
            sameCategoryProductsWithQuantity.map(
                (sameCategoryProductsWithQuantity) =>
                    (sameCategoryProductsWithQuantityPk = sameCategoryProductsWithQuantityPk.concat(
                        sameCategoryProductsWithQuantity.id
                    ))
            );

            // here get all productWithQuantity of same category which not added as trial
            sameCategoryProductsWithQuantityNotAddAsTrial = sameCategoryProductsWithQuantity.filter(
                (sameCategoryProductsWithQuantity) =>
                    !sameCategoryProductsWithQuantity.add_as_trial
            );
            // console.log(
            //     'sameCategoryProductsWithQuantity',
            //     sameCategoryProductsWithQuantity
            // );
            // console.log(
            //     'sameCategoryProductsWithQuantityNotAddAsTrial',
            //     sameCategoryProductsWithQuantityNotAddAsTrial
            // );
            // if same category productWithQuantity is more than 1 then only delete this
            if (sameCategoryProductsWithQuantityNotAddAsTrial.length > 1) {
                // only delete one product by this process
                let length = pk.length;
                for (let i = 0; i < length; i++) {
                    if (pk[i] === productWithQuantity.id) {
                        pk.splice(i, 1);
                        i--;
                    }
                }
                // need to remove exact array element... that's why I splice this exact way
            } else {
                // if same category productWithQuantity is only  1 then only delete this also delete all same category productWithQuantity
                // ### if same category productWithQuantity is only 1 and have no trial of this same category productWithQuantity
                // then also delete selected one
                // if have trial then delete selected one + trial
                pk = pk.filter(
                    (singlePk) =>
                        !sameCategoryProductsWithQuantityPk.includes(singlePk)
                );
            }
        }

        // console.log('final pk not remove', pk);

        // here only delete one productWithQuantity
        // when we also delete all trial productWithQuantity with this productWithQuantity
        // then only productWithQuantity delete, not trial productWithQuantity
        // trial productWithQuantity will remain in database
        // we can delete those in next loop section by filtering
        // because productWithQuantity already delete, so id has gone
        // so we filter trial productWithQuantity and delete them in loop section

        let allTrialProductWithQuantityForSameCategoryProductsWithQuantity = sameCategoryProductsWithQuantity.filter(
            (sameCategoryProductsWithQuantity) =>
                sameCategoryProductsWithQuantity.id !== productWithQuantity.id
        );

        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                config
            )
            .then((res) => {
                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                        {
                            product_with_quantity: pk,
                            sub_total:
                                myBag.sub_total - productWithQuantity.cost,
                        },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data);
                        // if productWithQuantity add as trial then only one patch will done to update available quantity for main product
                        // also if the length of same category productWithQuantity which not add as trial is greater than 1 then also delete 1
                        // and update available quantity of 1 main product
                        if (
                            productWithQuantity.add_as_trial ||
                            sameCategoryProductsWithQuantityNotAddAsTrial.length >
                                1
                        ) {
                            axios
                                .patch(
                                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${productWithQuantity.product.productavailable.id}/`,
                                    {
                                        available_quantity:
                                            productWithQuantity.product
                                                .productavailable
                                                .available_quantity +
                                            productWithQuantity.quantity,
                                    },
                                    config
                                )
                                .then((res) => {
                                    // final get will be after all post, patch done
                                    axios
                                        .get(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            changeMyBag(res.data);
                                            setLoadingForDelete(false);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        } else {
                            // here delete all trial productWithQuantity where main productWithQuantity not includes
                            // this is because when we have no similar productWithQuantity added but have that similar
                            // productWithQuantity in trial
                            // so need to delete these trial productWithQuantity form database
                            allTrialProductWithQuantityForSameCategoryProductsWithQuantity.forEach(
                                (
                                    allTrialProductWithQuantityForSameCategoryProductsWithQuantity
                                ) => {
                                    axios
                                        .delete(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${allTrialProductWithQuantityForSameCategoryProductsWithQuantity.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            console.log('trial deleted');
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                }
                            );

                            sameCategoryProductsWithQuantity.forEach(
                                (
                                    sameCategoryProductsWithQuantityEach,
                                    index
                                ) => {
                                    axios
                                        .patch(
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-update-only-quantity/${sameCategoryProductsWithQuantityEach.product.productavailable.id}/`,
                                            {
                                                available_quantity:
                                                    sameCategoryProductsWithQuantityEach
                                                        .product
                                                        .productavailable
                                                        .available_quantity +
                                                    sameCategoryProductsWithQuantityEach.quantity,
                                            },
                                            config
                                        )
                                        .then((res) => {
                                            // final get will be after all post, patch done
                                            // here changeMyBag will call in last patch
                                            // using this to avoid re render again and again
                                            // only re render call at last patch

                                            if (
                                                index ===
                                                sameCategoryProductsWithQuantity.length -
                                                    1
                                            ) {
                                                axios
                                                    .get(
                                                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                                        config
                                                    )
                                                    .then((res) => {
                                                        // make alert here
                                                        // before re render start
                                                        setOpen(true);
                                                        changeMyBag(res.data);
                                                        setLoadingForDelete(
                                                            false
                                                        );
                                                    })
                                                    .catch((err) =>
                                                        console.log(
                                                            err.response
                                                        )
                                                    );
                                            }
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                }
                            );
                        }
                    })
                    .catch((err) => console.log(err.response));
            })

            .catch((err) => console.log(err.response));
    };

    return (
        <Box pt={2} borderRadius='borderRadius'>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label='custom pagination table'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Price</TableCell>
                            <TableCell align='center'>Quantity</TableCell>
                            <TableCell align='center'>Cost</TableCell>
                            <TableCell align='center'>Option</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name} hover>
                                <TableCell
                                    component='th'
                                    scope='row'
                                    align='center'
                                >
                                    {row.product.name}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 160,
                                    }}
                                    align='center'
                                >
                                    {row.product.price}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 160,
                                    }}
                                    align='center'
                                >
                                    {row.quantity > 1 && !row.add_as_trial && (
                                        <IconButton
                                            color='error'
                                            disabled={
                                                loadingForAdd ||
                                                loadingForRemove ||
                                                loadingForDelete
                                            }
                                            onClick={() =>
                                                handleRemove(
                                                    JSON.stringify(row)
                                                )
                                            }
                                        >
                                            <RemoveCircleIcon />
                                        </IconButton>
                                    )}

                                    {row.quantity}
                                    {!row.add_as_trial &&
                                        row.product.productavailable
                                            .available_quantity !== 0 && (
                                            <IconButton
                                                color='error'
                                                disabled={
                                                    loadingForAdd ||
                                                    loadingForRemove ||
                                                    loadingForDelete
                                                }
                                                onClick={() =>
                                                    handleAdd(
                                                        JSON.stringify(row)
                                                    )
                                                }
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                        )}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 160,
                                    }}
                                    align='center'
                                >
                                    {!row.add_as_trial ? (
                                        row.cost
                                    ) : (
                                        <Chip
                                            label='Free Trial'
                                            color='secondary'
                                            size='small'
                                        />
                                    )}
                                </TableCell>

                                <TableCell
                                    style={{
                                        width: 160,
                                    }}
                                    align='center'
                                >
                                    <IconButton
                                        color='error'
                                        disabled={
                                            loadingForAdd ||
                                            loadingForRemove ||
                                            loadingForDelete
                                        }
                                        onClick={() =>
                                            handleDelete(JSON.stringify(row))
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    {
                                        label: 'All',
                                        value: -1,
                                    },
                                ]}
                                colSpan={5}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity='warning' variant='filled'>
                    <AlertTitle>
                        Trial Products of This Similar Product are Deleted!
                    </AlertTitle>
                    You Need At Least 1 Similar Product to Trail Max 2 Similar
                    Products.
                </Alert>
            </Snackbar>
        </Box>
    );
}
