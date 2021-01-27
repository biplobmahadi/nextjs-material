import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BallotIcon from '@material-ui/icons/Ballot';
import MailIcon from '@material-ui/icons/Mail';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    nestedAgain: {
        paddingLeft: theme.spacing(8),
    },
}));

export default function ButtonAppBar({ totalProductInBag }) {
    const router = useRouter();
    const classes = useStyles();
    const token = Cookies.get('haha_ecom_bangla_token');

    const dispatch = useDispatch();
    // need to show msg for email already used and password error with payload
    const logout = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/rest-auth/logout/`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: 'LOGOUT', payload: res.data });
                Cookies.remove('haha_ecom_bangla_token');
                router.push('/login');
            })
            .catch((err) => console.log(err.response));
    };

    // for menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // end for menu
    const [state, setState] = React.useState({
        left: false,
    });

    // start for trending
    const [openTrending, setOpenTrending] = React.useState(false);
    const handleClickTrending = () => {
        setOpenTrending(!openTrending);
    };
    // end for trending

    // start step by step

    // men part start
    const [openMen, setOpenMen] = React.useState(false);
    const handleClickMen = () => {
        setOpenMen(!openMen);
    };
    const [openTopWearMen, setOpenTopWearMen] = React.useState(false);
    const handleClickTopWearMen = () => {
        setOpenTopWearMen(!openTopWearMen);
    };

    // men part end

    // women part start
    const [openWomen, setOpenWomen] = React.useState(false);
    const handleClickWomen = () => {
        setOpenWomen(!openWomen);
    };
    const [openTopWearWomen, setOpenTopWearWomen] = React.useState(false);
    const handleClickTopWearWomen = () => {
        setOpenTopWearWomen(!openTopWearWomen);
    };

    // women part end

    const [openAgainAgain, setOpenAgainAgain] = React.useState(false);
    const handleClickAgainAgain = () => {
        // setOpenAgainAgain(!openAgainAgain);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role='presentation'
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List dense component='nav' aria-labelledby='nested-list-subheader'>
                <ListItem button onClick={handleClickTrending}>
                    <ListItemIcon>
                        <SendIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Trending' />
                    {openTrending ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openTrending} timeout='auto' unmountOnExit>
                    <List dense component='div' disablePadding>
                        <Link href='/trending-season/summer'>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary='Summer' />
                            </ListItem>
                        </Link>
                        <Link href='/trending-season/winter'>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary='Winter' />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <Divider variant='middle' />
                {/* Men part starts */}
                <ListItem button onClick={handleClickMen}>
                    <ListItemIcon>
                        <InboxIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Men' />
                    {openMen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMen} timeout='auto' unmountOnExit>
                    <List dense component='div' disablePadding>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickTopWearMen}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Top Wear' />
                            {openTopWearMen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openTopWearMen}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <Link href='/category/mens-shirt'>
                                    <ListItem
                                        button
                                        className={classes.nestedAgain}
                                    >
                                        <ListItemIcon>
                                            <StarBorder fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText primary='Shirt' />
                                    </ListItem>
                                </Link>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Bottom Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Foot Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Accessories' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Watches' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Glasses & Frames' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Bags' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Pandants & Lockets' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Health Care' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Sports Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
                {/* Men part completed */}

                {/* Women part starts */}
                <ListItem button onClick={handleClickWomen}>
                    <ListItemIcon>
                        <InboxIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Women' />
                    {openWomen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openWomen} timeout='auto' unmountOnExit>
                    <List dense component='div' disablePadding>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickTopWearWomen}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Top Wear' />
                            {openTopWearWomen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openTopWearWomen}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <Link href='/category/womens-pant'>
                                    <ListItem
                                        button
                                        className={classes.nestedAgain}
                                    >
                                        <ListItemIcon>
                                            <StarBorder fontSize='small' />
                                        </ListItemIcon>
                                        <ListItemText primary='Pant' />
                                    </ListItem>
                                </Link>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Bottom Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Foot Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Accessories' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Watches' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Glasses & Frames' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Bags' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Pandants & Lockets' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Health Care' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Sports Wear' />
                            {openAgainAgain ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openAgainAgain}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List dense component='div' disablePadding>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.nestedAgain}
                                >
                                    <ListItemIcon>
                                        <StarBorder fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText primary='Starred' />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Collapse>
                {/* Women part completed */}
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Electronics & Gadgets' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Baby & Kids' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Home & Furniture' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Fasion & Beauty' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Sports & Outdoor' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Musical Instruments' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Premium Others' />
                </ListItem>
                <Divider variant='middle' />
                <Link href='/brands'>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary='Our Brands' />
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Music Show' />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Logo Melaa' />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar color='inherit'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor='left'
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                    >
                        {list('left')}
                    </Drawer>

                    <Typography variant='h6' className={classes.title}>
                        
                            Logo
                    </Typography>

                    {token ? (
                        <>
                            <Link href='/bag'>
                                <IconButton color='inherit' aria-label='cart'>
                                    <Badge
                                        badgeContent={
                                            totalProductInBag
                                                ? totalProductInBag
                                                : '0'
                                        }
                                        color='secondary'
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Link>

                            <IconButton
                                color='inherit'
                                aria-label='account'
                                aria-controls='simple-menu'
                                aria-haspopup='true'
                                onClick={handleClickMenu}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            {/* menu create */}
                            <Menu
                                id='simple-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link href='/my-account'>
                                    <MenuItem onClick={handleClose}>
                                        <InboxIcon fontSize='small' />
                                        <Box ml={2}>My Account</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <Link href='/my-orders'>
                                    <MenuItem onClick={handleClose}>
                                        <DraftsIcon fontSize='small' />
                                        <Box ml={2}>My Orders</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <Link href='/my-account'>
                                    <MenuItem onClick={handleClose}>
                                        <InboxIcon fontSize='small' />
                                        <Box ml={2}>My Lottery</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <Link href='/my-review'>
                                    <MenuItem onClick={handleClose}>
                                        <DraftsIcon fontSize='small' />
                                        <Box ml={2}>My Review</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <Link href='/my-video-review'>
                                    <MenuItem onClick={handleClose}>
                                        <InboxIcon fontSize='small' />
                                        <Box ml={2}>My Video Review</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <Link href='/my-account'>
                                    <MenuItem onClick={handleClose}>
                                        <DraftsIcon fontSize='small' />
                                        <Box ml={2}>I Gift It</Box>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' />
                                <MenuItem onClick={() => logout()}>
                                    <InboxIcon fontSize='small' />
                                    <Box ml={2}>Logout</Box>
                                </MenuItem>
                            </Menu>
                            {/* menu end */}
                        </>
                    ) : (
                        <>
                            <Button
                                size='small'
                                color='inherit'
                                onClick={() => router.push('/register')}
                            >
                                <Box px={1}>register</Box>
                            </Button>
                            <Button
                                size='small'
                                color='inherit'
                                onClick={() => router.push('/login')}
                            >
                                <Box px={1}>login</Box>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
