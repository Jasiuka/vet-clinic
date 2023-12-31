import ServicesSectionItem from "./services-section-item.component";
import { Link } from "react-router-dom";
import "./services-section.style.css";

export const Services = () => {
  const servicesData = [
    {
      imageLink: "/assets/services/ultrasound-image.webp",
      name: "Diagnostika ir tyrimai",
    },
    {
      imageLink: "/assets/services/dentistry-image.webp",
      name: "Odontologijos paslaugos",
    },
    {
      imageLink: "/assets/services/surgery-image.webp",
      name: "Chirurgija",
    },
    {
      imageLink: "/assets/services/vaccination-image.webp",
      name: "Vakcinacija",
    },
  ];

  return (
    <section className="services-section">
      <h2 className="services-section__heading section-heading">
        Mūsų klinikoje teikiamos paslaugos
      </h2>
      <div className="services-section__services-container">
        {servicesData.map((serviceItem) => {
          return (
            <ServicesSectionItem
              imageLink={serviceItem.imageLink}
              name={serviceItem.name}
              key={serviceItem.name}
              imageAlt={`${serviceItem.name} nuotrauka(image)`}
            />
          );
        })}
      </div>
      <Link className="services-section__button" to={"/paslaugos"}>
        Visos paslaugos &rarr;
      </Link>
    </section>
  );
};

export default Services;
