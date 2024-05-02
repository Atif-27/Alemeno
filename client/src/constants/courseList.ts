export const sortOptions = [
  { name: "Best Rating", href: "?sort=rating", current: false },
  { name: "Newest", href: "?sort=newest", current: false },
  { name: "Price: Low to High", href: "?sort=low-to-high", current: false },
  { name: "Price: High to Low", href: "?sort=high-to-low", current: false },
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
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "duration",
    name: "Duration",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];
