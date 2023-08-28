import Cookies from 'js-cookie';

import { tryParseStringObject } from '../utils/tryParseStringObject';
import useStore from '../hooks/stateStore';

export default class WebApiClient {
    static BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '');

    static get _headers() {
        const rtnHeaders = new Headers();
        rtnHeaders.append('Content-Type', 'application/json');
        const userAccount = tryParseStringObject(Cookies.get('userAccount'));
        rtnHeaders.append('Authorization', `Bearer ${userAccount?.token}`);
        useStore.setState(state => ({ ...state, userAccount }));
        return rtnHeaders;
    }

    static async userRegister({ firstName, lastName, username, password }) {
        const requestOptions = {
            method: 'POST',
            headers: this._headers,
            body: { firstName, lastName, username, password },
        };

        return await this._request(`${this.BASE_URL}/api/users/register`, requestOptions);
    }

    static async userLogin({ username, password }) {
        const requestOptions = {
            method: 'POST',
            headers: this._headers,
            body: { username, password },
        };
        const userAccount = await this._request(`${this.BASE_URL}/api/users/authenticate`, requestOptions);
        Cookies.set('userAccount', JSON.stringify(userAccount));
        useStore.setState(state => ({ ...state, userAccount }));
        return userAccount;
    }

    static userLogout() {
        Cookies.remove('userAccount');
        useStore.setState(state => {
            delete state.userAccount;
            return { ...state };
        });
        return true;
    }

    static async getAllSeries({ userId }) {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
            body: { userId },
        };
        return await this._request(`${this.BASE_URL}/api/series`, requestOptions);
    }

    static _request(url, options) {
        options.body = JSON.stringify(options.body);
        return fetch(url, options)
            .then(async res => res.ok ? res.json() : this._errorHandler({ status: res.status, ...(await res.json()) }));
    }

    static _errorHandler(err) {
        if (err.status === 401)
            this._unauthHandler(err);

        throw new WebApiClientError(err);
    }

    static _unauthHandler(err) {
        this.userLogout();
    }
}

class WebApiClientError extends Error {
    constructor(stackTrace) {
        super('WebApiClientError');
        throw new Error(JSON.stringify(stackTrace));
    }
}