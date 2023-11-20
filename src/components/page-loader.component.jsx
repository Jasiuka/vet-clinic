import LoaderPaw from "./icon-components/loader-paw.component";
import PropTypes from "prop-types";
export const PageLoader = ({ loadingMessage }) => {
  return (
    <div className="loader">
      <div className="loader-overlay"></div>
      <div className="wrapper">
        <div className="loader__paws">
          <LoaderPaw count={1} />
          <LoaderPaw count={2} />
        </div>
        <h4>{loadingMessage}</h4>
      </div>
    </div>
  );
};
PageLoader.propTypes = {
  loadingMessage: PropTypes.string,
};
export default PageLoader;
