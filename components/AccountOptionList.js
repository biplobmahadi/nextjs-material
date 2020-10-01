import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component='nav' aria-label='main mailbox folders'>
                <Link href='/my-account'>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Account' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-orders'>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Orders' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-orders'>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Lottery' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-review'>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Reviews' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-review'>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary='My Video Reviews' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-account'>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary='I Gift It' />
                    </ListItem>
                </Link>
                <Divider variant='middle' />
                <Link href='/my-account'>
                    <ListItem button>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}
