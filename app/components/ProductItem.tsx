import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import { ProductPrice } from '~/components/ProductPrice';

interface ProductItemProps {
  product: any;
}

export default function ProductItem({product}: ProductItemProps) {
  const image = product.featuredImage;

  return (
    <div className="flex-shrink-0 w-[50%] sm:w-[50%]  lg:w-[33.33%] xl:w-[25%] text-center ">
      {/* Product Image with arch shape */}
      <div className="relative bg-transparent  overflow-hidden  ">
        <div className=" p-2 sm:p-6 overflow-hidden">
          {image && (
            <Image
              data={image}
              alt={image.altText || product.title}
              className="w-full object-contain transition-transform duration-500 hover:scale-110"
            />
          )}
        </div>
      </div>

      {/* Product Title */}
      {/* Price Details */}
      <div className="items-center space-y-1 font-inter">
        <div className="justify-center items-center gap-5 flex">
        <p className="text-white line-through text-base font-semibold">
          ${Math.round(
        parseFloat(product.compareAtPriceRange.maxVariantPrice.amount) / 88.26
      )}
        </p>
        <p className="text-white text-2xl lg:text-3xl font-semibold">
          ${Math.round(parseFloat(product.priceRange.minVariantPrice.amount) / 88.26)}
        </p>
        </div>
       <h5 className="mt-4 text-white font-medium text-base">{product.title}</h5>
      </div>

      {/* Buy Now Button */}
      <Link
        to={`/products/${product.handle}`}
        className="mt-3 inline-block border border-[#d4af37] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#d4af37] hover:text-black transition"
      >
        Buy Now
      </Link>
    </div>
  );
}
