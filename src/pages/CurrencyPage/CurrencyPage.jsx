import React, { useEffect } from "react";
import Currency from "../../components/Currency/Currency";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const CurrencyPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (!isMobile) {
      navigate("/");
    }
  }, [isMobile, navigate]);

  return <div>{<Currency />}</div>;
};

export default CurrencyPage;
