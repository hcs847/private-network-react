import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { FIND_POST } from '../utils/queries';

const Results = () => {
    const { term } = useParams();
    const { loading, data } = useQuery(FIND_POST, {
        variables: {
            filter: term
        }
    });

    const results = data.findPost || {};
    console.log(results, "=results from results", "term=", term);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-list flex flex-columns center">
            <p>Testing</p>
            {results &&
                results.map(result => (
                    <ul key={result._id} className='card'>
                        <li>{result.title}</li>
                    </ul>
                )

                )}
        </div>
    )
}

export default Results
