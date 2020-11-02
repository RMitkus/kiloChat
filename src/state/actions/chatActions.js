import axios from 'axios';
import {
  GET_CHAT_DATA_FAIL,
  GET_CHAT_DATA_REQUEST,
  GET_CHAT_DATA_SUCCESS,
  SET_CHAT_DATA_FAIL,
  SET_CHAT_DATA_REQUEST,
  SET_CHAT_DATA_SUCCESS,
  SET_CURRENT_CHANNEL_FAIL,
  SET_CURRENT_CHANNEL_REQUEST,
  SET_CURRENT_CHANNEL_SUCCESS,
} from '../constants/chatConstants';

export const getChatData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_DATA_REQUEST });

    const { data } = await axios.get('https://api.jsonbin.io/b/5f9b4ec19291173cbca5927c/latest',
      { headers: { 'secret-key': '$2b$10$VSH8yxhl4pButY9mYkOCuuZeZhtRSojc6HfSvm0mqzHBzJli/uVEm' } });
    dispatch({
      type: GET_CHAT_DATA_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_CHAT_DATA_FAIL,
      payload: 'Ooops! Something went wrong :( Try again later!',
    });
  }
};

export const setChatData = (updatedChatData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CHAT_DATA_REQUEST });

    const stringifiedChat = JSON.stringify(updatedChatData);
    const headers = {
      'Content-Type': 'application/json',
      'secret-key': '$2b$10$VSH8yxhl4pButY9mYkOCuuZeZhtRSojc6HfSvm0mqzHBzJli/uVEm',
    };

    await axios.put('https://api.jsonbin.io/b/5f9b4ec19291173cbca5927c',
      stringifiedChat,
      { headers })
      .catch((e) => console.log(e.message));

    dispatch({
      type: SET_CHAT_DATA_SUCCESS,
      payload: updatedChatData,
    });
  } catch (e) {
    dispatch({
      type: SET_CHAT_DATA_FAIL,
      payload: 'Ooops! Something went wrong :( Try again later!',
    });
  }
};

export const setCurrentChannel = (currentChannel) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_CHANNEL_REQUEST });

    dispatch({
      type: SET_CURRENT_CHANNEL_SUCCESS,
      payload: currentChannel,
    });
  } catch (e) {
    dispatch({
      type: SET_CURRENT_CHANNEL_FAIL,
      payload: 'Ooops! Something went wrong :( Cannot access channel :/ Try again later!',
    });
  }
};
