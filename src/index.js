import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/Index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import App from './App';
import storage from 'redux-persist/lib/storage';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {Spin} from "antd";
import cartItems from "./redux/reducers/CartReducer";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, persistReducer,
} from 'redux-persist'
import toggleCart from "./redux/reducers/ToggleCartReducer";
import sortDir from "./redux/reducers/SortDir";
import orderBy from "./redux/reducers/orderBy";
import paginator from "./redux/reducers/paginator";
import currentPage from "./redux/reducers/currentPage";
import categoryFilters from "./redux/reducers/categoryFilters";
import prices from "./redux/reducers/Prices";
import priceFilter from "./redux/reducers/priceFilter";

const reducer=combineReducers({
    myCart:cartItems,
    cartToggle:toggleCart,
    orderDir:sortDir,
    sortBy:orderBy,
    pages:paginator,
    currentPage:currentPage,
    categoryFilters:categoryFilters,
    priceFilters:prices,
    priceFilter:priceFilter
})
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer=persistReducer(persistConfig,reducer);

const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})
const persistedStore=persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={<Spin style={{margin:"50vh 50vw"}} size={"large"}/>} persistor={persistedStore}>
            <App />
        </PersistGate>
    </Provider>
    </React.StrictMode>
);

