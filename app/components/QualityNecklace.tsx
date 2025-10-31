interface NecklaceImage {
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };
}

interface QualityNecklaceData {
  qtitle?: { value?: string };
  microphone?: NecklaceImage;
  speakerone?: NecklaceImage;
  notify?: NecklaceImage;
  locket?: NecklaceImage;
  speakertwo?: NecklaceImage;
  volume?: NecklaceImage;
  light?: NecklaceImage;
}

interface QualityNecklaceProps {
  qualityNecklace: QualityNecklaceData;
}

export default function QualityNecklace({ qualityNecklace }: QualityNecklaceProps) {
  const qtitle = qualityNecklace?.qtitle?.value || "Why AI Necklace Is Different";
  const images = {
    microphone: qualityNecklace?.microphone?.reference?.image,
    speakerone: qualityNecklace?.speakerone?.reference?.image,
    notify: qualityNecklace?.notify?.reference?.image,
    locket: qualityNecklace?.locket?.reference?.image,
    speakertwo: qualityNecklace?.speakertwo?.reference?.image,
    volume: qualityNecklace?.volume?.reference?.image,
    light: qualityNecklace?.light?.reference?.image,
  };

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Title */}
      <h2 className="text-center text-2xl md:text-5xl font-cormorant text-white mb-16">
        {qtitle}
      </h2>

      {/* 3 equal columns */}
      <div className="max-w-7xl px-2 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center relative gap-16 xl:gap-24">
        {/* Left side icons */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-center mx-auto lg:items-end w-[70%] sm:w-[100%] h-full gap-0">
          <IconItem image={images.microphone} label="Microphone" />
          <IconItem image={images.speakerone} label="Speakers" />
          <IconItem image={images.notify} label="Notifications" />
        </div>

        {/* Center locket */}
        {images.locket?.url && (
          <div className="relative flex justify-center items-center">
            <img
              src={images.locket.url}
              alt={images.locket.altText || "AI Necklace"}
              className="w-[200px] sm:w-[320px] xl:w-[420px]  object-cover  p-0"
            />
          </div>
        )}

        {/* Right side icons */}
        <div className="flex flex-col sm:flex-row lg:flex-col justify-center mx-auto  lg:items-start w-[70%] sm:w-[100%] h-full gap-0">
          <IconItem image={images.speakertwo} label="Speakers" />
          <IconItem image={images.volume} label="Volume" />
          <IconItem image={images.light} label="LED light turns green" />
        </div>
      </div>
    </section>
  );
}

function IconItem({
  image,
  label,
}: {
  image?: { url: string; altText?: string };
  label: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center text-[#d4af37]">
      {image?.url && (
        <img
          src={image.url}
          alt={image.altText || label}
          className="w-full h-full object-contain"
        />
      )}
      
    </div>
  );
}
