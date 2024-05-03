export const sortOptions = [
  { name: "Best Rating", href: "rating", current: false },
  { name: "Newest", href: "newest", current: false },
  { name: "Price: Low to High", href: "low-to-high", current: false },
  { name: "Price: High to Low", href: "high-to-low", current: false },
];
export const subCategories = [
  { name: "Javascript", href: "/?q=javascript" },
  { name: "Typescript", href: "/?q=typescript" },
  { name: "React", href: "/?q=react" },
  { name: "Python", href: "/?q=python" },
  { name: "Machine Learning", href: "/?q=machine learning" },
];
export const filters = [
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: 1, label: "1 star", checked: false },
      { value: 2, label: "2 star", checked: false },
      { value: 3, label: "3 star", checked: false },
      { value: 4, label: "4 star", checked: false },
      { value: 5, label: "5 star", checked: false },
    ],
  },
];
