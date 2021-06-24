import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";

import MenuItem from "@material-ui/core/MenuItem";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";

const config = {
    headers: {
        Authorization: "Token " + Cookies.get("haha_ecom_bangla_token"),
    },
};
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function PaymentForm({ myBagId }) {
    const classes = useStyles();
    const [successMessage, setSuccessMessage] = React.useState("");
    const [orderId, setOrderId] = React.useState();

    const paymentNext = (values, setSubmitting) => {
        const getFromCookie = Cookies.get("receiver_address");
        const receiverAddress = JSON.parse(getFromCookie);
        const orderDetails = {
            ...receiverAddress,
            payment: values.payment,
            is_payment_confirm: true,
            is_processing: true,
            my_bag: myBagId,
        };
        console.log("orderDetails", orderDetails);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/my-orders/`,
                orderDetails,
                config
            )
            .then((res) => {
                // console.log(res.data);
                setSubmitting(false);
                setSuccessMessage("Successfully Done! ");
                setOrderId(res.data.id);
                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBagId}/`,
                        { is_send_to_my_order: true },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitting(false);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h5" variant="h5">
                    Payment Method
                </Typography>

                {successMessage && (
                    <Box my={4}>
                        <Alert severity="success">
                            {successMessage}
                            <Link href={`/my-order-details/${orderId}`}>
                                See Order Details
                            </Link>
                        </Alert>
                    </Box>
                )}

                <div className={classes.form}>
                    <Formik
                        initialValues={{
                            payment: "",
                        }}
                        validationSchema={Yup.object({
                            payment: Yup.string().required("Required"),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            paymentNext(values, setSubmitting);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="payment"
                                        select={true}
                                        label="Select Payment Method *"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        // SelectProps={{
                                        //     multiple: true,
                                        // }}
                                    >
                                        <MenuItem value="Cash On Delivery">
                                            Cash On Delivery
                                        </MenuItem>
                                    </Field>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        Confirm Your Order
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    );
}
