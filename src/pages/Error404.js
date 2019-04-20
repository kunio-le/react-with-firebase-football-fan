import React from 'react';

import Layout from '../hoc/Layout';

const Error404 = () => {
    return (
        <Layout>
            <div style={{ minHeight: '60vh', paddingTop: '15vh' }}>
                <h1>Page Not Found!</h1>
            </div>
        </Layout>
    );
};

export default Error404;
