import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import WebApiClient from '../../services/webApiClient';
import Breadcrumb from '../../components/Breadcrumb';

const EpisodeList = () => {
    const { seriesId } = useParams();

    const [series, setSeries] = useState();
    const [episodeList, setEpisodeList] = useState();
    const [watchedEpisodes, setWatchedEpisode] = useState();

    const onCheckWatched = (id, watched) => {
        WebApiClient.setWatchedEpisode({ id, watched });
    };

    useEffect(() => {
        if (seriesId) {
            WebApiClient.getSeries(seriesId).then(setSeries);
            WebApiClient.getAllEpisodes(seriesId).then(setEpisodeList);
            WebApiClient.getAllWatchedEpisodes(seriesId).then(episodes => setWatchedEpisode(episodes.map(({ id }) => id)));
        }
    }, [seriesId]);

    if (!series?.id) return <span className="spinner-border spinner-border-lg align-center text-center"></span>;

    return (
        <div className="container">
            <Breadcrumb links={[
                { to: "/series", text: 'TV Shows' },
                { to: `/series/${series.id}`, text: series.title },
                { text: `${series.title} - Episodes` },
            ]} />

            <h1>{series.title} - Episodes</h1>

            <Link to={`/series/${series.id}/episode/create`} className="btn btn-sm btn-success">Add Episode</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Episode Number</th>
                        <th>Title</th>
                        <th>Watched</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {episodeList?.sort?.((a, b) => (a.season + a.episodeNumber) - (b.season + b.episodeNumber))?.map?.(episode =>
                        <tr key={episode.id}>
                            <td>
                                {episode.season}
                            </td>
                            <td>
                                {episode.episodeNumber}
                            </td>
                            <td>
                                {episode.title}
                            </td>
                            <td className="text-center">
                                <input type="checkbox" defaultChecked={watchedEpisodes?.includes(episode.id)} onChange={(e) => onCheckWatched(episode.id, e.target.checked)} />
                            </td>
                            <td className="text-end">
                                <Link to={`/series/${series.id}/episode/${episode.id}`} className="btn btn-sm btn-primary">Edit</Link>
                            </td>
                        </tr>
                    )}
                    {!episodeList?.length &&
                        <tr>
                            <td colSpan="5" className="text-center">
                                {episodeList?.length === 0 && <span>No episodes added yet</span>}
                                {!episodeList && <span className="spinner-border spinner-border-lg align-center"></span>}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
export { EpisodeList };