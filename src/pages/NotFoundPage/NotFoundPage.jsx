import React from "react";
import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/login">
        <button className={s.btn}>Go to Login</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
