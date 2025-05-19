import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/authOperations";
import s from "./RegistrationForm.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";

export const RegistrationForm = () => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      .min(3, "Мінімум 3 символи")
      .max(20, "Максимум 20 символи")
      .matches(onlyLetters, "Тільки літери"),

    email: Yup.string()
      .required("Обов'язкове поле")
      .min(3, "Мінімум 3 символи")
      .max(20, "Максимум 20 символи"),
    password: Yup.string()
      .required("Обов'язкове поле")
      .min(5, "Мінімум 5 символи")
      .max(20, "Максимум 20 символи"),

    confirmPassword: Yup.string()
      .required("Обов'язкове поле")
      .min(5, "Мінімум 5 символи")
      .max(20, "Максимум 20 символи")
      .oneOf([Yup.ref("password")], "Паролі не співпадають"),
  });

  const handleSubmit = (values, options) => {
    dispatch(registerThunk(values));
    options.resetForm();
  };

  const handleBlur = (e) => {
    if (e.target.value.trim() === "") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };
  return (
    <div className={s.backdrop}>
      <div className={s.container}>
        <img src="/src/images/logo.svg" className={s.logo} />

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
                  <Field
                    name="name"
                    placeholder="Name"
                    className={s.field}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="span"
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
                    <use href="/icons.svg#icon-email"></use>
                  </svg>

                  <Field
                    name="email"
                    placeholder="E-mail"
                    className={s.field}
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
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
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="span"
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
                    onBlur={handleBlur}
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={s.error}
                />

                {values.confirmPassword.length > 0 && (
                  <div
                    style={{
                      marginTop: "5px",
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
