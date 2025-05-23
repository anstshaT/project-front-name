export const SelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "inherit",
    borderColor: state.isFocused && state.isSelected ? "#355359" : "#1e2f33",
    borderRadius: "8px",
    boxShadow: "none",
    height: "44px",
    color: "#081222",
    fontSize: "18px",
    fontFamily: "Inter",
    fontWeight: "500",
    "&:hover": {
      border: "1px solid #355359",
    },
    "&:focus": {
      border: "1px solid #355359",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? "linear-gradient(180deg, #355359 0%, #3b5d63 100%)"
      : state.isFocused
      ? "linear-gradient(180deg, #355359 0%, #3b5d63 100%)"
      : "transparent",
    color: "#FCFCFC",
    fontSize: "16px",
    fontWeight: 500,
    padding: "12px 16px",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#294045",
    borderRadius: "8px",
    overflow: "hidden",
    marginTop: 4,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#081222",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#081222",
    padding: "0 8px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#081222",
  }),
};
