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

        {/* <AccordionItem
          isActive={activeIndex === 1}
          title={
            "mattis pellentesque id nibh tortor id aliquet lectus proin nibh"
          }
          text={
            "egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus"
          }
          clickHandler={
            activeIndex === 1
              ? () => setActiveIndex(0)
              : () => setActiveIndex(1)
          }
        />
        <AccordionItem
          isActive={activeIndex === 2}
          title={
            "iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui"
          }
          text={
            "velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue"
          }
          clickHandler={
            activeIndex === 2
              ? () => setActiveIndex(0)
              : () => setActiveIndex(2)
          }
        /> */}
      </main>
    </div>
  );
};

export default FaqPage;
