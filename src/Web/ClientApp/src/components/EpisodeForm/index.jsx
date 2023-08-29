import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import WebApiClient from '../../services/webApiClient';
import Breadcrumb from '../../components/Breadcrumb';

const EpisodeForm = ({ series, episode = undefined }) => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        title: Yup.string().default(series?.title || '').required('Series title is required'),
        season: Yup.number().default(series?.season || 1).required('Series season number is required'),
        episodeNumber: Yup.number().default(series?.episodeNumber || 1).required('Series episode number is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema), criteriaMode: 'all', };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = data =>
        (episode ? WebApiClient.updateEpisode(data) : WebApiClient.createEpisode(data))
            .then(() => {
                navigate(`/episode/series/${series.id}`);
            }).catch(err => {
                if (err.toString().includes('"status":401'))
                    setError('apiError', { mesage: 'User logged out, please log back in and try again.', });
                else if (err.toString().includes('"status":422'))
                    setError('apiError', { mesage: 'Series title already in use.', });
                else
                    setError('apiError', { mesage: 'Series creation unsuccessful', });
            });

    return (
        <>
            <Breadcrumb links={[
                { to: "/series", text: 'TV Shows' },
                { to: `/episode/series/${series.id}`, text: series.title },
                { text: `${series.title} - Episode` },
            ]} />

            <h1>{episode ? 'Update' : 'Add New'} {series.title} Episode</h1>
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body form-group">
                        {series && <input type="hidden" id="seriesId" name="seriesId" value={series.id} {...register('seriesId')} />}
                        {episode && <input type="hidden" id="id" name="id" value={episode.id} {...register('id')} />}

                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" {...register('title')} className={`form-control${errors.title ? ' is-invalid' : ''}`} defaultValue={episode?.title || ''} />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                        
                        <label htmlFor="season">Season</label>
                        <input id="season" name="season" type="number" min="1" {...register('season')} className={`form-control${errors.season ? ' is-invalid' : ''}`} defaultValue={episode?.season || '1'} />
                        <div className="invalid-feedback">{errors.season?.message}</div>
                        
                        <label htmlFor="episodeNumber">Episode Number</label>
                        <input id="episodeNumber" name="episodeNumber" type="number" min="1" {...register('episodeNumber')} className={`form-control${errors.episodeNumber ? ' is-invalid' : ''}`} defaultValue={episode?.episodeNumber || '1'} />
                        <div className="invalid-feedback">{errors.episodeNumber?.message}</div>
                        
                        {errors.apiError && <p className="invalid-feedback" style={{ display: 'block' }}>{errors.apiError?.mesage}</p>}
                    </div>

                    <div className="card-footer">
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {episode ? 'Update' : 'Create'}
                        </button>
                        <Link to="/series" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
export default EpisodeForm;