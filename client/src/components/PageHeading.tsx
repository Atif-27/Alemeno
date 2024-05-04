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
