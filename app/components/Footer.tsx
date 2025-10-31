import { Suspense } from 'react';
import { Await, NavLink } from 'react-router';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-[#0F0E0E] text-white pt-12 pb-6 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10  xl:gap-20">

              {/* Column 1: Logo + Description + Subscribe */}
              <div className='lg:ml-4 '>
                <div className="flex items-center gap-2 mb-4 ">
                  <img
                    src="/logo.png"
                    alt="Méraud Logo"
                    className="w-72 object-contain"
                  />

                </div>
                <p className="text-white text-md mb-5 leading-normal font-inter">
                  Aifrodite necklaces don’t just enhance your style — they adapt to you. From tracking focus to sensing emotions, each piece acts like a second brain, made just for you.
                </p>
                <div className="flex w-full max-w-xs bg-[#EAECEE] rounded-full overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 ps-7 py-5 text-sm text-gray-700 outline-none"
                  />
                  <button className="bg-[#D4AF37] ps-7 pe-9 py-5 text-sm text-white font-bold ">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="items-center justify-center">
                <h3 className="text-2xl font-light mb-4 font-cormorant leading-[28px]">Quick Links</h3>
                <div className=" text-sm font-outfit p-2">
                  {footer && footer.menu && header.shop.primaryDomain?.url && (
                    <FooterMenu
                      menu={footer.menu}
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                      startIndex={0}
                      endIndex={5}
                      
                    />
                  )}

                </div>
              </div>

              {/* Column 3: Legal Links */}
              <div className="items-center justify-center">
                 <h3 className="text-2xl font-light mb-4 font-cormorant leading-[28px]">Legal Links</h3>
                <div className=" text-sm font-outfit p-2">
                {footer && (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                    startIndex={5}
                    
                  />
                )}
                </div>
              </div>

              {/* Column 4: Get the App */}
              <div className="items-center justify-center">
                 <h3 className="text-2xl font-light mb-4 font-cormorant leading-[28px]">Get the app!</h3>
                <div className="space-y-3 font-inter">
                  <button className="bg-white text-black  ps-2  pe-4  py-1.5 sm:ps-3 sm:pe-9 sm:py-2.5 lg:pe-4 xl:pe-9 rounded-sm flex items-center gap-3 hover:bg-gray-100 transition">
                    <img
                      src="/apple.png"
                      alt="Apple Store"
                      className="w-5 h-5 sm:w-10 sm:h-10"
                    />
                    <div className="font-inter flex flex-col">
                      <span className="text-xs font-regular xl:font-semibold">Download on the</span>
                      <span className="text-sm sm:font-semibold">Apple Store</span>
                    </div>
                  </button>

                  <button className="bg-white text-black ps-2  pe-4  py-1.5 sm:ps-3 sm:pe-9 sm:py-2.5 lg:pe-4 xl:pe-9 rounded-sm flex items-center gap-3 hover:bg-gray-100 transition">
                    <img
                      src="/playstore.png"
                      alt="Google Play"
                      className="w-5 h-5 sm:w-10 sm:h-10"
                    />
                    <div className="font-inter flex flex-col">
                      <span className="text-xs font-regular font-regular xl:font-semibold">Get it on</span>
                      <span className="text-sm font-regular sm:font-semibold">Google Play</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto mt-10 px-6 border-t-1 border-white pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-outfit">
              <p className='text-white text-base sm:text-lg font-medium'>© 2025 NexBroker Inc. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="border border-gray-500 rounded-full p-2 hover:bg-gray-800">
                  <img
                    src="/facebook.png"
                    alt="Méraud Logo"
                    className="w-6 object-contain"
                  />
                </a>
                <a href="#" className="border border-gray-500 rounded-full p-2 hover:bg-gray-800">
                  <img
                    src="/twitter.png"
                    alt="Méraud Logo"
                    className="w-6 object-contain"
                  />
                </a>
                <a href="#" className="border border-gray-500 rounded-full p-2 hover:bg-gray-800">
                  <img
                    src="/linkedin.png"
                    alt="Méraud Logo"
                    className="w-6 object-contain"
                  />
                </a>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
  className,
  startIndex = 0,
  endIndex,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
  className?: string;
  startIndex?: number;
  endIndex?: number;
}) {
  const items = (menu || FALLBACK_FOOTER_MENU).items.slice(startIndex, endIndex);

  return (
    <nav className="flex flex-col space-y-5 " role="navigation">
      {items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        const isExternal = !url.startsWith('/');

        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className="text-white hover:text-[#D4AF37] text-md lg:text-xs xl:text-md p-2"
          >
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className={({ isActive }) =>
              `text-md lg:text-xs xl:text-md p-2 ${isActive ? 'text-white' : 'text-white hover:text-[#D4AF37]'}`
            }
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}


const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633999999',
      resourceId: 'gid://shopify/ShopPolicy/23358011111',
      tags: [],
      title: 'Cookie Preferences',
      type: 'SHOP_POLICY',
      url: '/policies/cookie-preferences',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
