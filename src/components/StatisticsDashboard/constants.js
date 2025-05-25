export const months = [
  { label: "All month", value: "All month" },
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

export const years = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, i) => {
    const year = 2020 + i;
    return { label: String(year), value: year };
  }
);
