import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';
import EpisodeForm from '../../components/EpisodeForm';

const EpisodeCreate = () => {
    const { seriesId } = useParams();

    const [series, setSeries] = useState();

    useEffect(() => {
        if (seriesId) {
            WebApiClient.getSeries(seriesId).then(setSeries);
        }
    }, [seriesId])

    if (!series?.id) return <span className="spinner-border spinner-border-lg align-center text-center"></span>;

    return <div className="container"><EpisodeForm series={series} /></div>;
};
export { EpisodeCreate };