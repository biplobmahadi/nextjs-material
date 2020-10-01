import Link from 'next/link';
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

export default function ButtonAppBar() {
    const classes = useStyles();
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
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const [openAgain, setOpenAgain] = React.useState(false);
    const handleClickAgain = () => {
        setOpenAgain(!openAgain);
    };
    const [openAgainAgain, setOpenAgainAgain] = React.useState(false);
    const handleClickAgainAgain = () => {
        setOpenAgainAgain(!openAgainAgain);
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
                <Link href='/categories'>
                    <ListItem button>
                        <ListItemIcon>
                            <SendIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary='Sent mail' />
                    </ListItem>
                </Link>
                <Link href='/tranding'>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary='Tranding' />
                    </ListItem>
                </Link>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Inbox' />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List dense component='div' disablePadding>
                        <Link href='/sub-categories'>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder fontSize='small' />
                                </ListItemIcon>
                                <ListItemText primary='Starred' />
                            </ListItem>
                        </Link>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Starred' />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Starred' />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={handleClickAgain}>
                    <ListItemIcon>
                        <InboxIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Inbox' />
                    {openAgain ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAgain} timeout='auto' unmountOnExit>
                    <List dense component='div' disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Starred' />
                        </ListItem>
                        <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickAgainAgain}
                        >
                            <ListItemIcon>
                                <InboxIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Inbox' />
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
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Starred' />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary='Starred' />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar>
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
                    <Link href='/'>
                        <Typography variant='h6' className={classes.title}>
                            Logo.com
                        </Typography>
                    </Link>
                    <Link href='/bag'>
                        <IconButton color='inherit' aria-label='cart'>
                            <Badge badgeContent={40000} color='secondary'>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                    <IconButton color='inherit' aria-label='lottery'>
                        <BallotIcon />
                    </IconButton>
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
                        <Link href='my-account'>
                            <MenuItem onClick={handleClose}>
                                <InboxIcon fontSize='small' />
                                <Box ml={2}>My Account</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='my-orders'>
                            <MenuItem onClick={handleClose}>
                                <DraftsIcon fontSize='small' />
                                <Box ml={2}>My Orders</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='my-lottery'>
                            <MenuItem onClick={handleClose}>
                                <InboxIcon fontSize='small' />
                                <Box ml={2}>My Lottery</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='my-review'>
                            <MenuItem onClick={handleClose}>
                                <DraftsIcon fontSize='small' />
                                <Box ml={2}>My Review</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='my-video-review'>
                            <MenuItem onClick={handleClose}>
                                <InboxIcon fontSize='small' />
                                <Box ml={2}>My Video Review</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='my-gift'>
                            <MenuItem onClick={handleClose}>
                                <DraftsIcon fontSize='small' />
                                <Box ml={2}>I Gift It</Box>
                            </MenuItem>
                        </Link>
                        <Divider variant='middle' />
                        <Link href='/'>
                            <MenuItem onClick={handleClose}>
                                <InboxIcon fontSize='small' />
                                <Box ml={2}>Logout</Box>
                            </MenuItem>
                        </Link>
                    </Menu>
                    {/* menu end */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
