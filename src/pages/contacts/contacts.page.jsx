import EmailIcon from "../../components/icon-components/email-icon.component";
import PhoneIcon from "../../components/icon-components/phone-icon.component";
import LocationICon from "../../components/icon-components/location-icon.component";

export const ContactsPage = () => {
  return (
    <div className="contacts">
      <h2 className="page-heading for-observer">Kontaktai</h2>
      <main className="contacts__main">
        <div className="contacts__main-contacts-container ">
          <div className="contacts__main-contacts-element">
            <LocationICon className={"contacts__icon"} />{" "}
            <h3 className="contacts__main-contacts-heading">
              Veterinarijos klinikos adresas
            </h3>
            <p className="contacts__main-contacts-data">
              Sukilėlių pr. 20, 50157 Kaunas
            </p>
          </div>
          <div className="contacts__main-contacts-element">
            <EmailIcon className={"contacts__icon"} />{" "}
            <h3 className="contacts__main-contacts-heading">
              Veterinarijos klinikos el. Paštas
            </h3>{" "}
            <p className="contacts__main-contacts-data">info@laimingoslet.lt</p>
          </div>
          <div className="contacts__main-contacts-element">
            <PhoneIcon className={"contacts__icon"} />{" "}
            <h3 className="contacts__main-contacts-heading">
              Veterinarijos klinikos telefono numeris
            </h3>{" "}
            <p className="contacts__main-contacts-data">+37063297569</p>
          </div>
        </div>
        <div className="contacts__main-map-container">
          <iframe
            className="contacts__map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2293.297155214477!2d23.921762812842132!3d54.91525747267223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e718962717beff%3A0x2298419aeb7e6fbf!2sSukil%C4%97li%C5%B3%20pr.%2020%2C%2050157%20Kaunas!5e0!3m2!1slt!2slt!4v1695189510521!5m2!1slt!2slt"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <h2>Lauksime jūsų!</h2>
      </main>
    </div>
  );
};

export default ContactsPage;
