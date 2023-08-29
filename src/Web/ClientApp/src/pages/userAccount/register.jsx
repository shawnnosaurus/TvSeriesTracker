import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import WebApiClient from '../../services/webApiClient';

const Register = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = data =>
        WebApiClient.userRegister(data)
            .then(() => {
                console.log('Registration successful');
                navigate('/account/login');
            });

    return (
        <div className="container">
            <div className="card m-3">
                <h4 className="card-header">Register</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <label htmlFor="firstName">First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>

                        <label htmlFor="lastName">Last Name</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>

                        <label htmlFor="username">Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>

                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    <div className="card-footer">
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link to="/account/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Register };