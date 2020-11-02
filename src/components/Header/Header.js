/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link, useHistory, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MessageIcon from '@material-ui/icons/Message';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { useTheme } from '@material-ui/core/styles';

// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import Grid from '@material-ui/core/Grid';
import useStyles from './headerStyles';
import { setCurrentChannel } from '../../state/actions/chatActions';

const Header = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [visible, setVisible] = useState(false);
  const { pathname } = history.location;
  const [open, setOpen] = useState(false);

  const allChatData = useSelector((state) => state.chatData);
  const { chatData } = allChatData;

  const dispatch = useDispatch();

  // const newChatData = useSelector((state) => state.updatedChatData);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const notifyGoodBye = () => toast.error('Good Bye!',
    {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setVisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setVisible(false);
  };
  useEffect(() => {
    const logged = localStorage.getItem('chat') !== null;
    setShow(logged);
    setVisible(false);
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem('chat');
    history.push('/');
    notifyGoodBye();
  };

  const differentChannels = [];
  // eslint-disable-next-line no-unused-expressions
  chatData && chatData.map((e) => (!differentChannels.includes(e.channel)
    ? differentChannels.push(e.channel) : null));

  const currentChannelHandler = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {pathname === '/chat' ? (
            <>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MessageIcon />
                </IconButton>
              </Toolbar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  {differentChannels.map((channel) => (
                    <ListItem button key={channel} onClick={() => currentChannelHandler(channel)}>
                      <ListItemIcon>
                        <Avatar>
                          {channel.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={channel} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : null}

          {show ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                startIcon={<MenuIcon />}
                onClick={handleClick}
                className={classes.menu}
              >
                Menu
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={visible}
                onClose={handleClose}
              >
                <MenuItem
                  selected={pathname === '/chat'}
                  component={Link}
                  to="/chat"
                  onClick={handleClose}
                >
                  Chat
                </MenuItem>
                <MenuItem
                  selected={pathname === '/profile'}
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : null}

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
