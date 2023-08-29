import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';

const SeriesList = () => {
    const [seriesList, setSeriesList] = useState();
    const [seriesFilteredList, setSeriesFilteredList] = useState();

    const onSearch = e => {
        setSeriesFilteredList(seriesList?.filter?.(sl => sl.title.includes(e.target.value)));
    };

    useEffect(() => {
        WebApiClient.getAllSeries().then(setSeriesList);
    }, []);

    useEffect(() => {
        setSeriesFilteredList(seriesList?.sort?.((a, b) => a.title.localeCompare(b.title)));
    }, [seriesList]);

    return (
        <div className="container">
            <h1>TV Series</h1>
            <Link to="/series/create" className="btn btn-sm btn-success">Add Series</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th colSpan="2">Title</th>
                    </tr>
                    <tr>
                        <th colSpan="2">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearch} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {seriesFilteredList?.map?.(series =>
                        <tr key={series.id}>
                            <td>
                                <Link to={`/episode/series/${series.id}`} className="link-primary">{series.title}</Link>
                            </td>
                            <td className="text-end">
                                <Link to={`/series/${series.id}`} className="btn btn-sm btn-primary">Edit</Link>
                            </td>
                        </tr>
                    )}
                    {!seriesFilteredList?.length &&
                        <tr>
                            <td colSpan="2" className="text-center">
                                {seriesFilteredList?.length === 0 && <span>No series added yet</span>}
                                {!seriesFilteredList && <span className="spinner-border spinner-border-lg align-center"></span>}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
export { SeriesList };