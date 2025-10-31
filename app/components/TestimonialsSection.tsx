import { useRef, useState, useEffect } from "react";
import { Image } from "@shopify/hydrogen";

interface TestimonialField {
  value: string;
}

interface TestimonialImage {
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };
}

interface TestimonialNode {
  id: string;
  handle: string;
  testimg?: TestimonialImage;
  testcont?: TestimonialField;
  testauth?: TestimonialField;
}

interface TestimonialsSectionProps {
  testimonials: {
    edges: { node: TestimonialNode }[];
  };
}


export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const rotationAngles = ["7.81deg", "-10.47deg", "8.02deg", "14.54deg", "-7.81deg", "10.47deg", "-8.02deg", "-14.54deg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenType, setScreenType] = useState<
    "mobile" | "small" | "tablet" | "laptop" | "desktop"
  >("desktop");

  // ✅ Detect screen size and set type
  useEffect(() => {
    const updateScreenType = () => {
      const w = window.innerWidth;
      if (w < 506) setScreenType("mobile");
      if (w < 768) setScreenType("small");
      else if (w < 1024) setScreenType("tablet");
      else if (w < 1360) setScreenType("laptop");
      else setScreenType("desktop");
    };

    updateScreenType();
    window.addEventListener("resize", updateScreenType);
    return () => window.removeEventListener("resize", updateScreenType);
  }, []);

  // ✅ Set visible cards & slide step
  const visibleCards =
    screenType === "mobile"
      ? 1
      : screenType === "small"
        ? 2
        : screenType === "tablet"
          ? 2
          : screenType === "laptop"
            ? 3.3 // show 3 full + a bit of the 4th
            : 3.3; // same for desktop

  // ✅ Step = how much one slide moves (%)
  const step = 100 / visibleCards;

  // ✅ Prevent overscroll beyond last visible set
  const handleNext = () => {
    if (currentIndex < testimonials.edges.length - Math.floor(visibleCards)) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const translatePercent = currentIndex * step;
  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="mx-auto text-center relative">
        <h2 className="text-4xl md:text-5xl font-cormorant text-white mb-14">
          Customer Testimonials
        </h2>

        {/* Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#D4AF37]/80 hover:bg-[#D4AF37]
                     text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition disabled:opacity-40"
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= testimonials.edges.length - visibleCards}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#D4AF37]/80 hover:bg-[#D4AF37]
                     text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition disabled:opacity-40"
        >
          ›
        </button>

        {/* Carousel */}
        <div className="relative overflow-hidden py-10 mx-auto">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-8 md:gap-10 xl:gap-16"
            style={{
              transform: `translateX(-${translatePercent}%)`,
            }}
          >
            {testimonials.edges.map(({ node }, index) => {
              const imageUrl = node.testimg?.reference?.image?.url;
              const altText =
                node.testimg?.reference?.image?.altText || "Testimonial image";
              const rotation = rotationAngles[index];
              const isRightClip = index % 4 < 2;
              return (
                <div
                  key={node.id}
                  className="flex-shrink-0 w-[75%] sm:w-[50%] md:w-[45%] lg:w-[33%] xl:w-[26%] px-4 xl:gap-4"
                >

                  <div
                    className="relative bg-[#FFEFF4] rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] p-4 pb-5 transform transition-all duration-300 hover:scale-[1.03]"
                    style={{ transform: `rotate(${rotation})` }}
                  >
                    <img
                      src="/clip.png"
                      alt="Clip"
                      className={`absolute -top-6 w-10 md:w-12 ${
            isRightClip
              ? "right-1 -rotate-50"
              : "left-1 -rotate-50"
          }`}
                      
                    />
                    {imageUrl && (
                      <div className="overflow-hidden mb-5">
                        <img
                          src={imageUrl}
                          alt={altText}
                          className="w-[400px] h-[320px] object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-start mb-3">
                      <img src="/star.png" alt="star" className="w-28" />
                    </div>
                    <p className="text-gray-700 text-xs lg:text-md leading-tight font-light text-start font-inter mb-1">
                      {node.testcont?.value}
                    </p>
                    <p className="text-black font-semibold text-xs lg:text-md font-inter text-start">
                      {node.testauth?.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
