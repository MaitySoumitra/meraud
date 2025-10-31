interface GridImage {
  reference?: {
    image?: {
      url: string;
      altText?: string;
    };
  };
}

interface BannerGridData {
  gridoneimg?: GridImage;
  gridtwoimg?: GridImage;
}

interface BannerGridProps {
  bannerGrid: BannerGridData;
}

export default function BannerGrid({ bannerGrid }: BannerGridProps) {
  const gridOneUrl = bannerGrid?.gridoneimg?.reference?.image?.url;
  const gridOneAlt = bannerGrid?.gridoneimg?.reference?.image?.altText || 'Men’s Collection';

  const gridTwoUrl = bannerGrid?.gridtwoimg?.reference?.image?.url;
  const gridTwoAlt = bannerGrid?.gridtwoimg?.reference?.image?.altText || 'Women’s Collection';

  return (
    <section className="bg-[#1F1F1F] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Men's Collection Card */}
        {gridOneUrl && (
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={gridOneUrl}
              alt={gridOneAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
           
          </div>
        )}

        {/* Women's Collection Card */}
        {gridTwoUrl && (
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={gridTwoUrl}
              alt={gridTwoAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
          </div>
        )}
      </div>
    </section>
  );
}
