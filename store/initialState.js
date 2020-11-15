import Cookies from 'js-cookie';

const initialState = {
    // token: localStorage.getItem('haha_ecom_bangla_token'),
    token: Cookies.get('haha_ecom_bangla_token'),
};

export default initialState;
