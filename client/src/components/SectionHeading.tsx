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
