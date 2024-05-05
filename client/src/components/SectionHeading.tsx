/*
+This component is used to render the heading of the section.
+It takes a title prop which is the title of the section and a className prop which is used to style the heading.
*/

const SectionHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1 className={"text-4xl max-md:text-xl font-semibold    " + className}>
      {title}
    </h1>
  );
};

export default SectionHeading;
