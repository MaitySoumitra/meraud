import React, { useState } from "react";

interface FaqField {
  value: string;
}

interface FaqNode {
  id: string;
  handle: string;
  question?: FaqField;
  answer?: FaqField;
}

interface FaqSectionProps {
  faqSection: {
    edges: {
      node: FaqNode;
    }[];
  };
}

export default function FaqSection({ faqSection }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#000] text-white py-[80px] px-[25px] flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-center text-3xl md:text-5xl font-medium leading-[70px] mb-10 text-white font-cormorant ">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
  {faqSection?.edges?.map(({ node }, index) => (
    <div
      key={node.id}
      className="rounded-lg overflow-hidden bg-[#191919] border border-transparent hover:border-[#D4AF37] transition-all duration-300"
    >
      {/* Accordion Header */}
      <button
        className="w-full flex items-center justify-between text-left pt-[19px] pb-6 ps-[21px] pe-[22px] focus:outline-none"
        onClick={() => toggleAccordion(index)}
      >
        <span className="font-medium text-base md:text-lg text-[#D4AF37]">
          {node.question?.value}
        </span>

        {/* Toggle Icon — Plus / Minus Image */}
        <img
          src={
            openIndex === index
              ? "/minus.png" // shown when open
              : "/plus.png"  // shown when closed
          }
          alt={openIndex === index ? "Collapse" : "Expand"}
          className="w-5 h-5 md:w-8 md:h-8 object-contain transition-all duration-300"
        />
      </button>

      {/* Accordion Content */}
      {openIndex === index && (
        <div className="ps-[21px] pe-[22px] pb-6 text-[#fffbfb] font-normal text-base md:text-lg leading-normal w-[95%]">
          {node.answer?.value}
        </div>
      )}
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
