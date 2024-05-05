/*
This component is used to create a form input field with a label.
It takes a label prop which is the text that will be displayed as the label for the input field.
It also takes children prop which is the input field.
*/
const AuthInput = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-2">
      <label htmlFor="email">{label}</label>
      <label className="input input-bordered flex items-center gap-2">
        {children}
      </label>
    </div>
  );
};

export default AuthInput;
