import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../redux/auth/authOperations";
import s from "./RegistrationForm.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect } from "react";
import {
  selectError,
  /* selectIsLoading, */
  selectIsLoggin,
} from "../../redux/auth/selectors";
import { toast } from "react-hot-toast";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  /* const isLoading = useSelector(selectIsLoading); */
  const isLoggedIn = useSelector(selectIsLoggin);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("User registered successfully");
      navigate("/dashboard");
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
  const domains = [".com", ".net", ".org"];

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required field")
      .min(2, "Min 2 characters")
      .max(32, "Max 32 characters")
      .matches(onlyLetters, "Only letters"),

    email: Yup.string()
      .required("Required field")
      .max(64, "Max 64 characters")
      .email("Invalid email")
      .test(
        "domain-check",
        `Domain must be one of: ${domains.join(", ")}`,
        (value) => {
          return value && domains.some((domain) => value.endsWith(domain));
        }
      ),
    password: Yup.string()
      .required("Required field")
      .min(8, "Min 8 characters")
      .max(64, "Max 64 characters"),

    confirmPassword: Yup.string()
      .required("Required field")
      .oneOf([Yup.ref("password")]),
  });

  const handleSubmit = async (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(registerThunk(userData));
  };

  return (
    <div className={s.backdrop}>
      <div className={s.container}>
        <svg width="54" height="54" className={s.logoIcon}>
          <use href="/icons.svg#icon-wallet"></use>
        </svg>
        <p className={s.logoText}>Spendy</p>
        {/* {isLoading && <h2>Loading...</h2>} */}
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
                      textAlign: "start",
                      color:
                        values.password === values.confirmPassword
                          ? "green"
                          : "red",
                      fontWeight: "200",
                    }}
                  >
                    {values.password === values.confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </div>
                )}
              </label>
              <button type="submit" className={s.buttonRegisrer}>
                Register
              </button>
              {/* <button
                className={s.buttonLogin}
                onClick={() => navigate("/login")}
              >
                Login
              </button> */}

              <Link to="/login" className={s.buttonLogin}>
                Login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
