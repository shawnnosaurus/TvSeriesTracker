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

    static async getSeries(id) {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
        };
        return await this._request(`${this.BASE_URL}/api/series/${id}`, requestOptions);
    }

    static async getAllSeries() {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
        };
        return await this._request(`${this.BASE_URL}/api/series`, requestOptions);
    }

    static async createSeries({ title }) {
        const requestOptions = {
            method: 'POST',
            headers: this._headers,
            body: { title },
        };

        return await this._request(`${this.BASE_URL}/api/series/create`, requestOptions);
    }

    static async updateSeries({ id, title }) {
        const requestOptions = {
            method: 'PUT',
            headers: this._headers,
            body: { id, title },
        };

        return await this._request(`${this.BASE_URL}/api/series/update`, requestOptions);
    }

    static async getAllEpisodes(seriesId) {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
        };
        return await this._request(`${this.BASE_URL}/api/episode/series/${seriesId}`, requestOptions);
    }

    static async createEpisode({ seriesId, title, season, episodeNumber }) {
        const requestOptions = {
            method: 'POST',
            headers: this._headers,
            body: { seriesId, title, season, episodeNumber },
        };

        return await this._request(`${this.BASE_URL}/api/episode/create`, requestOptions);
    }

    static async updateEpisode({ id, title, season, episodeNumber }) {
        const requestOptions = {
            method: 'PUT',
            headers: this._headers,
            body: { id, title, season, episodeNumber },
        };

        return await this._request(`${this.BASE_URL}/api/episode/update`, requestOptions);
    }

    static async getEpisode(id) {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
        };
        return await this._request(`${this.BASE_URL}/api/episode/${id}`, requestOptions);
    }

    static async getAllWatchedEpisodes(seriesId) {
        const requestOptions = {
            method: 'GET',
            headers: this._headers,
        };
        return await this._request(`${this.BASE_URL}/api/episode/watched/series/${seriesId}`, requestOptions);
    }

    static async setWatchedEpisode({ id, watched }) {
        const requestOptions = {
            method: 'PUT',
            headers: this._headers,
            body: { id, watched },
        };
        return await this._request(`${this.BASE_URL}/api/episode/watched`, requestOptions);
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

    static _unauthHandler(_err) {
        this.userLogout();
    }
}

class WebApiClientError extends Error {
    constructor(stackTrace) {
        super('WebApiClientError');
        throw new Error(JSON.stringify(stackTrace));
    }
}