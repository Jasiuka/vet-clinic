import ServicesSectionItem from "./services-section-item.component";
import "./services-section.style.css";

export const Services = () => {
  const servicesData = [
    {
      imageLink: "../src/assets/services/ultrasound-image.jpg",
      name: "Diagnostika ir tyrimai",
    },
    {
      imageLink: "../src/assets/services/dentistry-image.jpg",
      name: "Odontologijos paslaugos",
    },
    {
      imageLink: "../src/assets/services/surgery-image.jpg",
      name: "Chirurgija",
    },
    {
      imageLink: "../src/assets/services/vaccination-image.jpg",
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
      <a className="services-section__button" href="/paslaugos">
        Visos paslaugos &rarr;
      </a>
    </section>
  );
};

export default Services;
