export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      title="Pakilti į viršų"
      onClick={scrollToTop}
      className="scroll-to-top"
    >
      <svg
        className="scroll-to-top__icon"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 312.36"
      >
        <path
          fillRule="nonzero"
          d="M0 276.77 253.12 0 512 282.48l-32.65 29.88-226.2-246.83L32.66 306.64z"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
