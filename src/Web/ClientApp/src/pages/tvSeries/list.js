import { useState } from 'react';
import { Link } from 'react-router-dom';

import useStore from '../../hooks/stateStore';

const SeriesList = () => {
    const userAccount = useStore((state) => state.userAccount);
    const [seriesList] = useState();

    return (
        <div>
            <h1>{userAccount?.firstName && `${userAccount?.firstName}'s `}TV Series</h1>
            <Link to={`series/add`} className="btn btn-sm btn-success mb-2">Add Series</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th style={{ textAlign: 'right' }}>Started Watching</th>
                    </tr>
                </thead>
                <tbody>
                    {!seriesList &&
                        <tr>
                            <td colSpan="2" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
export { SeriesList };