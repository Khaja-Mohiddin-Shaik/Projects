import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { commonApi } from './services/commonApi';
import { adminApi } from './services/adminApi';
import adminReducer from './features/admin/adminDetailsSlice';
import studentReducer from './features/student/oneStudentDetailSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['admin', 'student'], // List of reducers to persist
};

// Combine all the reducers into one root reducer
const rootReducer = combineReducers({
  [commonApi.reducerPath]: commonApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  admin: adminReducer,
  student: studentReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(commonApi.middleware, adminApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
