import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { threadReducer } from './threadReducer';
import { uiReducer } from './uiReducer';
import { configReducer } from './configReducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    thread: threadReducer,
    auth: authReducer,
    config: configReducer
});