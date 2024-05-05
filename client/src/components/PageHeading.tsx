/*
This component is used to display the heading of the page. It takes in a title prop which is the title of the page and a className prop which is used to style the heading. The heading is displayed in a h1 tag.
*/

const PageHeading = ({
  title,
  className,
  ...props
}: {
  title: string;
  className?: string;
  props?: HTMLHeadingElement;
}) => {
  return (
    <h1
      className={
        "text-5xl  max-lg:text-4xl max-md:text-3xl font-bold " + className
      }
      {...props}
    >
      {title}
    </h1>
  );
};

export default PageHeading;
