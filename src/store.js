import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { chatDataReducer, currentChannelReducer, sendUpdatedChatDataReducer } from './state/reducers/chatReducers';

const reducer = combineReducers({
  chatData: chatDataReducer,
  updatedChatData: sendUpdatedChatDataReducer,
  currentChannel: currentChannelReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
