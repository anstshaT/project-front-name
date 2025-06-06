export const months = [
  { label: "All month", value: "All month" },
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const years = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, i) => {
    const year = 2020 + i;
    return { label: String(year), value: year };
  }
);
