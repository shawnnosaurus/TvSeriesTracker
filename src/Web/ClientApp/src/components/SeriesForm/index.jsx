import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import WebApiClient from '../../services/webApiClient';

const SeriesForm = ({ series = undefined }) => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        title: Yup.string().default(series?.title || '').required('Series title is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema), criteriaMode: 'all', };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = data =>
        (series ? WebApiClient.updateSeries(data) : WebApiClient.createSeries(data))
            .then(() => {
                navigate('/series');
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
            <h1>{series ? 'Update' : 'Add New'} Series{series && ` - ${series.title}`}</h1>
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body form-group">
                        {series && <input type="hidden" id="id" name="id" value={series.id} {...register('id')} />}

                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} defaultValue={series?.title || ''} />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                        {errors.apiError && <p className="invalid-feedback" style={{ display: 'block' }}>{errors.apiError?.mesage}</p>}
                    </div>

                    <div className="card-footer">
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {series ? 'Update' : 'Create'}
                        </button>
                        <Link to="/series" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
export default SeriesForm;