import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GROUP } from '../utils/queries';
import Auth from '../utils/auth';

const Group = () => {
    // assign group id to URL's paramaters per App.js
    const { id: _id } = useParams();

    const { loading, data } = useQuery(QUERY_GROUP, {
        variables: { _id }
    });

    const group = data?.group || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(group, "=group", _id, "=_id", data, "=data");

    return (
        <div className='home-page flex flex-center'>
            <div className="flex flex-between feed-layout">
                <div className="main-container flex flex-columns">
                    <h2>Group Page</h2>
                    <p>Group's Name: {group.groupName}</p>
                    <p>Group's Admin: {group.groupAdmin}</p>
                    <p>{group.group_img}</p>

                </div>
            </div>
        </div>
    )
}

export default Group
