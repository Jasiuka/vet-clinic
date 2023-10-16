import LoaderPaw from "./icon-components/loader-paw.component";
export const Loader = () => {
  return (
    <div className="loader">
      <div className="wrapper">
        <LoaderPaw count={1} />
        <LoaderPaw count={2} />
      </div>
      <h4>Kraunama..</h4>
    </div>
  );
};

export default Loader;
