export const Map = () => {
  return (
    <div className="map-container">
      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2293.2969795132612!2d23.921762812294357!3d54.915260556074784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e718962717beff%3A0x2298419aeb7e6fbf!2sSukil%C4%97li%C5%B3%20pr.%2020%2C%2050157%20Kaunas!5e0!3m2!1slt!2slt!4v1694800723941!5m2!1slt!2slt"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
