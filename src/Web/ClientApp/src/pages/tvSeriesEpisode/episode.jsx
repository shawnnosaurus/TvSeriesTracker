import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';
import EpisodeForm from '../../components/EpisodeForm';

const EpisodeUpdate = () => {
    const { seriesId, episodeId } = useParams();

    const [series, setSeries] = useState();
    const [episode, setEpisode] = useState();

    useEffect(() => {
        if (episodeId) {
            WebApiClient.getSeries(seriesId).then(setSeries);
            WebApiClient.getEpisode(episodeId).then(setEpisode);
        }
    }, [seriesId, episodeId])

    if (!series?.id || !episode?.id) return <span className="spinner-border spinner-border-lg align-center text-center"></span>;

    return <div className="container"><EpisodeForm series={series} episode={episode} /></div>;
};
export { EpisodeUpdate };