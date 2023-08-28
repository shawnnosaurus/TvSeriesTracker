import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutes, PrivateRoutes } from './router';
import { Layout } from './_Layout';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        {AppRoutes.filter(r => !!r?.restricted).map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}</Route>
                    {AppRoutes.filter(r => !r?.restricted).map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                    <Route path="*" element={<h1>404: Page Not Found</h1>} />;
                </Routes>
            </Layout>
        );
    }
}
