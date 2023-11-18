import { useRef, useState } from "react";
import AccordionItem from "../../components/accordion.component";
import FAQ_DATA from "../../data/faq-data.json";
import "./faq.style.css";
export const FaqPage = () => {
  const accordionRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="faq">
      <h2 className="page-heading for-observer">
        Dažniausiai užduodami klausimai
      </h2>
      <main ref={accordionRef} className="accordion">
        <div className="accordion-left accordion-side ">
          {FAQ_DATA.leftSide.map(({ title, text, index }) => {
            return (
              <AccordionItem
                key={index}
                title={title}
                text={text}
                isActive={activeIndex === index}
                clickHandler={
                  activeIndex === index
                    ? () => setActiveIndex(0)
                    : () => setActiveIndex(index)
                }
              />
            );
          })}
        </div>
        <div className="accordion-right accordion-side">
          {FAQ_DATA.rightSide.map(({ title, text, index }) => {
            return (
              <AccordionItem
                key={index}
                title={title}
                text={text}
                isActive={activeIndex === index}
                clickHandler={
                  activeIndex === index
                    ? () => setActiveIndex(0)
                    : () => setActiveIndex(index)
                }
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
