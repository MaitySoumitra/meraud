import React from "react";

interface ImageField {
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };
}

interface LearnFromAnywhereData {
  mobile?: ImageField;
  desktop?: ImageField;
  learntitle?: {
    value: string;
  };
  learncont?: {
    value: string;
  };
}

interface LearnFromAnywhereProps {
  learnFromAnywhere: LearnFromAnywhereData;
}

export default function LearnFromAnywhere({
  learnFromAnywhere,
}: LearnFromAnywhereProps) {
  const mobileImg = learnFromAnywhere?.mobile?.reference?.image?.url;
  const desktopImg = learnFromAnywhere?.desktop?.reference?.image?.url;
  const learnTitle = learnFromAnywhere?.learntitle?.value;
  const learnCont = learnFromAnywhere?.learncont?.value;

  return (
    <section className="w-full bg-[#191919] text-white flex flex-col lg:flex-row items-center justify-center gap-10 py-16 px-6 md:px-10">
      {/* Left Side - Images */}
      <div className="flex items-center justify-center gap-6 w-full lg:w-1/2">
        {/* Mobile mockup */}
        {mobileImg && (
          <img
            src={mobileImg}
            alt="Mobile preview"
            className="w-24 sm:w-36 rounded-lg object-contain"
          />
        )}

        {/* Desktop mockup */}
        {desktopImg && (
          <img
            src={desktopImg}
            alt="Desktop preview"
            className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-[420px] rounded-lg object-contain"
          />
        )}
      </div>

      {/* Right Side - Text & Buttons */}
      <div className="flex flex-col w-full lg:w-1/2 max-w-lg items-center lg:items-start space-y-6">
        <h1 className=" w-[70%] text-4xl lg:text-6xl font-semibold text-[#D4AF37] font-cormorant">
          Learn From <span className="text-white">Anywhere</span>
        </h1>

        <p className=" w-[80%] text-gray-300 text-sm sm:text-base leading-normal font-inter">
          {learnCont}
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-start pt-4">
          <div className="flex gap-2 sm:gap-9">
            <button className="bg-white text-black  ps-2  pe-4  py-1.5 sm:ps-5 sm:pe-10 sm:py-2.5 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition">
              <img
                src="/apple.png"
                alt="Apple Store"
                className="w-5 h-5 sm:w-10 sm:h-10"
              />
              <div className="font-inter flex flex-col">
                <span className="text-xs sm:font-semibold">Download on the</span>
                <span className="text-sm sm:font-semibold">Apple Store</span>
              </div>
            </button>

            <button className="bg-white text-black ps-2  pe-4  py-1.5 sm:ps-5 sm:pe-10 sm:py-2.5 rounded-lg flex items-center gap-3 hover:bg-gray-100 transition">
              <img
                src="/playstore.png"
                alt="Google Play"
                className="w-5 h-5 sm:w-10 sm:h-10"
              />
              <div className="font-inter flex flex-col">
                <span className="text-xs font-regular sm:font-semibold">Get it on</span>
                <span className="text-sm font-regular sm:font-semibold">Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
