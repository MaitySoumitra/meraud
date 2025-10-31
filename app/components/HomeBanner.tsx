interface HomeField {
  value: string;
}

interface HomeImage {
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };
}

interface HomeBannerData {
  homeimg?: HomeImage;
}

interface HomeBannerProps {
  homeBanner: HomeBannerData;
}

export default function HomeBanner({ homeBanner }: HomeBannerProps) {
  const imageUrl = homeBanner?.homeimg?.reference?.image?.url;
  const altText = homeBanner?.homeimg?.reference?.image?.altText;

  return (
 
     <section className="relative pt-32 pb-6 px-8 md:px-28 overflow-hidden h-[35vh] sm:h-[50vh] md:h-[60vh] xl:h-[100vh] z-20">
      {/* Background */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={altText || "Home banner"}
          className="absolute inset-0 w-full h-full sm:object-cover object-center"
        />
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-6">
      
        
      </div>
    </section>
  );
}
