/*
    This page is used to show a loading spinner when the user is waiting for the data to be loaded.
*/

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full relative">
      <span
        className="loading loading-spinner loading-lg absolute
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
         scale-150
      "
      ></span>
    </div>
  );
};

export default LoadingPage;
