export default class WebApiClient {
    static BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/$/, '');

    static get _headers() {
        const rtnHeaders = new Headers();
        rtnHeaders.append('Content-Type', 'application/json');
        try {
            rtnHeaders.append('Authorization', `Bearer ${JSON.parse(document.cookie)?.token}`);
        } catch { }
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
        const responseData = await this._request(`${this.BASE_URL}/api/users/authenticate`, requestOptions);
        document.cookie = JSON.stringify({ id: responseData.id, token: responseData.token });
        return responseData;
    }

    static userLogout() {
        document.cookie = null;
        return !document.cookie;
    }

    static _request(url, options) {
        options.body = JSON.stringify(options.body);
        return fetch(url, options)
            .then(async res => res.ok ? res.json() : this._errorHandler({ status: res.status, ...(await res.json()) }))
            .catch(this._errorHandler);
    }

    static _errorHandler(err) {
        if (err.status === 401)
            this._unauthHandler(err);

        throw new Error(JSON.stringify(err));
    }

    static _unauthHandler(err) {
        console.log(err);
        this.userLogout();
    }
}