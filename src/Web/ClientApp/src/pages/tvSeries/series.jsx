import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';
import SeriesForm from '../../components/SeriesForm';
import Breadcrumb from '../../components/Breadcrumb';

const SeriesUpdate = () => {
    const { seriesId } = useParams();

    const [series, setSeries] = useState();

    useEffect(() => {
        if (seriesId) {
            WebApiClient.getSeries(seriesId).then(setSeries);
        }
    }, [seriesId])

    if (!series?.id) return <span className="spinner-border spinner-border-lg align-center text-center"></span>;

    return (
        <div className="container">
            <Breadcrumb links={[
                { to: "/series", text: 'TV Shows' },
                { text: series.title },
                { to: `/episode/series/${series.id}`, text: `${series.title} - Episodes` },
            ]} />

            {series && <SeriesForm series={series} />}
        </div>
    );
};
export { SeriesUpdate };