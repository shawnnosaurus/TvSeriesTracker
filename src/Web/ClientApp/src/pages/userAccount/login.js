import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import WebApiClient from '../../services/webApiClient';
import { history } from '../../router';

const Login = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema), criteriaMode: 'all', };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = data =>
        WebApiClient.userLogin(data)
            .then(() => {
                const { redirect } = history.location.state || { redirect: '/' };
                history.push(redirect);
            }).catch(err => {
                if (err.toString().includes('"status":401'))
                    setError('apiError', { mesage: 'Username or Password incorrect', });
                else
                    setError('apiError', { mesage: 'Login unsuccessful', });
            });

    return (
        <div className="card m-3">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    {errors.apiError && <p className="invalid-feedback" style={{display:'block'}}>{errors.apiError?.mesage}</p>}
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link to="/account/register" className="btn btn-link">Register</Link>
                </form>
            </div>
        </div>
    );
};

export { Login };