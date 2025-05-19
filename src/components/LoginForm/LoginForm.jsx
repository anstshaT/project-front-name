import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import s from './LoginForm.module.css'
import { loginThunk } from '../../redux/auth/authOperations';

const validationSchema = Yup.object().shape({
    email: Yup.string().max(64).email('Invalid email').required('Email is required'),
    password: Yup.string().min(8).max(64).required('Password is required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const result = await dispatch(loginThunk(values)).unwrap();
            toast.success(`Welcome, ${result.user.userName}`);
            navigate('/dashboard');
        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
        } finally {
            resetForm();
        }
    };

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <img src="/src/images/logo.svg" className={s.logo} />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={s.form}>
                        <div className={s.inputContainer}>
                            <div className={s.inputWrap}>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    className={s.input} />
                                <svg width="24" height="24" className={s.icon}>
                                    <use href="/icons.svg#icon-email"></use>
                                </svg>
                            </div>
                            <ErrorMessage name="email" component="span" className={s.error} />
                        </div>

                        <div className={s.inputContainer}>
                            <div className={s.inputWrap}>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={s.input} />
                                <svg width="24" height="24" className={s.icon}>
                                    <use href="/icons.svg#icon-lock"></use>
                                </svg>
                            </div>
                            <ErrorMessage name="password" component="div" className={s.error} />
                        </div>

                        <div className={s.button}>
                            <button type="submit" className={s.buttonLog}>Log in</button>
                            <Link to="/register" className={s.registerBtn}>
                                Register
                            </Link>
                        </div>
                    </Form>
                </Formik>
                <img src="/src/images/background-picture/img-bg-log.png" alt="Wallet" className={s.walletImage} />
            </div>
        </div>
    );
};

export default LoginForm;