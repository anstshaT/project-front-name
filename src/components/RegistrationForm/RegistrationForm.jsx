import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../redux/auth/authOperations";
import s from "./RegistrationForm.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect } from "react";
import {
  selectError,
  selectIsLoading,
  selectIsLoggin,
} from "../../redux/auth/selectors";
import { toast } from "react-hot-toast";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggin);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("User registered successfully");

      //  navigate("/dashboard")
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onlyLetters = /^[A-Za-z0-9]*$/;

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Обов'язкове поле")
      .min(2, "Мінімум 2 символи")
      .max(32, "Максимум 32 символи")
      .matches(onlyLetters, "Тільки літери"),

    email: Yup.string()
      .required("Обов'язкове поле")
      .max(64, "Максимум 64 символи"),
    password: Yup.string()
      .required("Обов'язкове поле")
      .min(8, "Мінімум 8 символи")
      .max(64, "Максимум 64 символи"),

    confirmPassword: Yup.string()
      .required("Обов'язкове поле")
      .oneOf([Yup.ref("password")]),
  });

  const handleSubmit = async (values, options) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(registerThunk(userData));
    options.resetForm();
  };

  return (
    <div className={s.backdrop}>
      <div className={s.container}>
        <img src="/src/images/logo.svg" className={s.logo} />
        {isLoading && <h2>Loading...</h2>}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={RegistrationSchema}
        >
          {({ values, errors, touched }) => (
            <Form>
              <label className={s.label}>
                <div
                  className={clsx(s.inputWrapper, {
                    [s.error]: errors.name && touched.name,
                  })}
                >
                  <svg width="24" height="24" className={s.icon}>
                    <use href="/icons.svg#icon-user"></use>
                  </svg>
                  <Field name="name" placeholder="Name" className={s.field} />
                </div>
                <ErrorMessage name="name" component="div" className={s.error} />
              </label>

              <label className={s.label}>
                <div
                  className={clsx(s.inputWrapper, {
                    [s.error]: errors.name && touched.name,
                  })}
                >
                  <svg width="24" height="24" className={s.icon}>
                    <use href="/icons.svg#icon-email"></use>
                  </svg>

                  <Field
                    name="email"
                    placeholder="E-mail"
                    className={s.field}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </label>

              <label className={s.label}>
                <div
                  className={clsx(s.inputWrapper, {
                    [s.error]: errors.name && touched.name,
                  })}
                >
                  <svg width="24" height="24" className={s.icon}>
                    <use href="/icons.svg#icon-lock"></use>
                  </svg>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={s.field}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </label>

              <label className={s.label}>
                <div
                  className={clsx(s.inputWrapper, {
                    [s.error]: errors.name && touched.name,
                  })}
                >
                  <svg width="24" height="24" className={s.icon}>
                    <use href="/icons.svg#icon-lock"></use>
                  </svg>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={s.field}
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={s.error}
                />

                {values.confirmPassword.length > 0 && (
                  <div
                    style={{
                      marginTop: "5px",
                      textAlign: "center",
                      color:
                        values.password === values.confirmPassword
                          ? "green"
                          : "red",
                      fontWeight: "200",
                    }}
                  >
                    {values.password === values.confirmPassword
                      ? "Паролі співпадають"
                      : "Паролі не співпадають"}
                  </div>
                )}
              </label>
              <button type="submit" className={s.buttonRegisrer}>
                Register
              </button>
              <button
                className={s.buttonLogin}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
