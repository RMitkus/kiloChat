import {
  GET_CHAT_DATA_FAIL,
  GET_CHAT_DATA_SUCCESS,
  GET_CHAT_DATA_REQUEST,
  SET_CHAT_DATA_FAIL,
  SET_CHAT_DATA_REQUEST,
  SET_CHAT_DATA_SUCCESS,
  SET_CURRENT_CHANNEL_REQUEST,
  SET_CURRENT_CHANNEL_FAIL, SET_CURRENT_CHANNEL_SUCCESS,
} from '../constants/chatConstants';

export const chatDataReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CHAT_DATA_REQUEST:
      return { loading: true, chatData: [] };
    case GET_CHAT_DATA_SUCCESS:
      return { loading: false, chatData: action.payload };
    case GET_CHAT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const sendUpdatedChatDataReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CHAT_DATA_REQUEST:
      return { loading: true, updatedChatData: [] };
    case SET_CHAT_DATA_SUCCESS:
      return { loading: false, updatedChatData: action.payload };
    case SET_CHAT_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const currentChannelReducer = (state = 'Kilo Chat', action) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL_REQUEST:
      return { loading: true, currentChannel: action.payload };
    case SET_CURRENT_CHANNEL_SUCCESS:
      return { loading: false, currentChannel: action.payload };
    case SET_CURRENT_CHANNEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
