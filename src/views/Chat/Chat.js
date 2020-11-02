import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 as uuid } from 'uuid';
import { getChatData, setChatData, setCurrentChannel } from '../../state/actions/chatActions';
import useStyles from './ChatStyles';
import BackdropContainer from '../../components/Backdrop';

const Chat = ({ // eslint-disable-next-line no-shadow,no-unused-vars
  setChatData, getChatData, setCurrentChannel, chat, channel,
}) => {
  const classes = useStyles();
  const bottomRef = useRef();

  const [chatInputValue, setChatInputValue] = useState('');
  // ALl chat data
  const { chatData } = chat;

  // Getting all channels from header/navbar
  const { currentChannel } = channel;

  // Current chat according to fetched channel
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    getChatData();
  }, [currentChannel]);
  // Set initial chat
  useEffect(() => {
    setCurrentChannel('Kilo Chat');
  }, []);
  useEffect(() => {
    setCurrent(chatData && chatData.filter((item) => (item.channel === currentChannel)));
  }, [chatData]);
  // Fetching chat data

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      block: 'start',
    });
  };

  const handleChange = (e) => {
    setChatInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      email: localStorage.getItem('chat'), message: chatInputValue, id: uuid(), channel: currentChannel,
    };

    const newChatData = [...chatData, newMessage];

    const newCurrentChatData = [...current, newMessage];
    // setting global scope and POST new chat data to jsonbin.io
    setChatData(newChatData);
    // updating current chat
    setCurrent(newCurrentChatData);
    setChatInputValue('');
  };
  useEffect(() => (chatData && chatData.length > 0
    ? scrollToBottom() : null), [chatData, currentChannel, current]);
  return (
    <Container>
      <Typography align="center" variant="h5" className={classes.chatName}>{currentChannel && currentChannel.toUpperCase()}</Typography>
      <Box m={3} className={classes.chatBox} borderRadius={16} borderColor="error.main">

        <Grid
          container
          justify="flex-start"
          alignItems="center"
        >
          {current && current.map((message) => (

            <Grid key={message.id} item m={2} sm={8} className={classes.messageRoot}>
              <Avatar style={{ marginTop: 'auto' }}>{message.email.charAt(0).toUpperCase()}</Avatar>
              <Chip
                label={<Typography className={classes.text}>{message.message}</Typography>}
                variant="outlined"
                className={classes.messageBox}
              />
              <Divider />
            </Grid>
          ))}
          <div ref={bottomRef} />
        </Grid>

      </Box>
      <Box m={3} borderRadius={16} borderColor="error.main">
        <Grid container justify="center">
          <Grid item sm={12}>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.chatInputBox}>
              <TextField
                id="outlined-basic"
                label="New message"
                variant="outlined"
                value={chatInputValue}
                onChange={(e) => handleChange(e)}
                className={classes.chatInput}
                fullWidth
              />
              <Button type="submit" variant="outlined" color="primary">Send</Button>
            </form>
          </Grid>
        </Grid>
      </Box>
      <BackdropContainer show={chatData && chatData.length === 0} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chatData,
  updatedChatData: state.updatedChatData,
  channel: state.currentChannel,
});

const mapDispatchToProps = {
  getChatData,
  setChatData,
  setCurrentChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
