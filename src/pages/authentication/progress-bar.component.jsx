import PropTypes from "prop-types";
export const ProgressBar = ({ isFirstLevel }) => {
  return (
    <div className="authentication__progress-bar">
      <div className={`circle bar-active`}>1</div>
      <div className={`line  ${isFirstLevel ? "" : "bar-transition"} `}>
        <div className={`line-inside`}></div>
      </div>
      <div className={`circle ${isFirstLevel ? "" : "bar-transition"} `}>
        <span>2</span>
        <div className="circle-inside"></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  isFirstLevel: PropTypes.bool,
};
export default ProgressBar;
