import React from 'react';

import AdminLayout from '../../../hoc/AdminLayout';

import MatchesTable from './MatchesTable';

const Matches = () => {
    return (
        <AdminLayout>
            <MatchesTable />
        </AdminLayout>
    );
};

export default Matches;
