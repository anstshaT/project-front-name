import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/authOperations";
import s from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values, options) => {
    dispatch(registerThunk(values));
    options.resetForm();
  };
  return (
    <div className={s.backdrop}>
      <div className={s.container}>
        <img src="/src/images/logo.svg" className={s.logo} />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <label className={s.label}>
              <img
                src="/src/images/register-login/user-02.svg"
                className={s.icon}
              />
              <Field name="name" placeholder="Name" className={s.field} />
            </label>
            <label className={s.label}>
              <img
                src="/src/images/register-login/email.svg"
                className={s.icon}
              />
              <Field name="email" placeholder="E-mail" className={s.field} />
            </label>
            <label className={s.label}>
              <img
                src="/src/images/register-login/lock.svg"
                className={s.icon}
              />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={s.field}
              />
            </label>
            <label className={s.label}>
              <img
                src="/src/images/register-login/lock.svg"
                className={s.icon}
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={s.field}
              />
            </label>
            <button type="submit" className={s.buttonRegisrer}>
              Register
            </button>
            <button className={s.buttonLogin}>Login</button>
          </Form>
        </Formik>
        <div class="floating-element"></div>
      </div>
    </div>
  );
};
