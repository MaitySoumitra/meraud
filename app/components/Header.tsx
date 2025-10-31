import { Suspense, useState } from "react";
import { Await, NavLink, useAsyncValue } from "react-router";
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from "@shopify/hydrogen";
import type { HeaderQuery, CartApiQueryFragment } from "storefrontapi.generated";
import { useAside } from "~/components/Aside";

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="top-0 z-50 w-full bg-black  left-0">
        <div className="flex items-center justify-between w-full px-6 lg:px-20 py-7 relative">
          {/* Left side (desktop) */}
          <div className="hidden lg:flex items-center ">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
              startIndex={0}
              endIndex={4}
            />
          </div>

          {/* Center logo */}
          <NavLink
            to="/"
            prefetch="intent"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <img src="/logo.png" alt="Logo" className="w-36 sm:w-44 object-contain" />
          </NavLink>

          {/* Right side (desktop) */}
          <div className="hidden lg:flex items-center  gap-8 xl:gap-16 ml-auto">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
              startIndex={4}
            />
            <div className="flex items-center gap-6">
              <SearchToggle />
              <CartToggle cart={cart} />
              <AccountToggle />
            </div>
          </div>

          {/* Mobile menu toggle (right side) */}
          <button
            className="lg:hidden text-white ml-auto z-[60]"
            onClick={() => setOpen(!open)}
          >
            {open ? "X" : "☰"}
          </button>
        </div>
      </header>

      {/* OFF-CANVAS MOBILE MENU (moved outside header) */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-black text-white border-l border-white/10 transform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start pt-24 gap-6">
          <HeaderMenu
            menu={menu}
            viewport="mobile"
            primaryDomainUrl={shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <div className="flex items-center gap-8 mt-6">
            <SearchToggle />
            <CartToggle cart={cart} />
            <AccountToggle />
          </div>
        </div>
      </div>

      {/* BACKGROUND OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40  z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* === MENU COMPONENT === */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  startIndex = 0,
  endIndex,
}: {
  menu: HeaderProps["header"]["menu"];
  primaryDomainUrl: HeaderProps["header"]["shop"]["primaryDomain"]["url"];
  viewport: "desktop" | "mobile";
  publicStoreDomain: HeaderProps["publicStoreDomain"];
  startIndex?: number;
  endIndex?: number;
}) {
  const { close } = useAside();
  const items = (menu || FALLBACK_HEADER_MENU).items.slice(startIndex, endIndex);

  const className =
    viewport === "desktop"
      ? "hidden lg:flex gap-8 xl:gap-16 text-white text-base"
      : "flex flex-col items-center gap-6 text-base";

  return (
    <nav className={className}>
      {items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes("myshopify.com") ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            key={item.id}
            to={url}
            onClick={close}
            className="hover:text-[#D4AF37] transition-colors"
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/* === ICON BUTTONS === */
function SearchToggle() {
  const { open } = useAside();
  return (
    <button
      onClick={() => open("search")}
      className="hover:scale-110 transition-transform"
    >
      <img src="/search.png" alt="Search" className="w-6" />
    </button>
  );
}

function AccountToggle() {
  return (
    <button className="hover:scale-110 transition-transform">
      <img src="/wish.png" alt="Wishlist" className="w-6" />
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        open("cart");
        publish("cart_viewed", {
          cart,
          prevCart,
          shop,
          url: window.location.href || "",
        } as CartViewPayload);
      }}
      className="relative hover:scale-110 transition-transform"
    >
      <img src="/cart.png" alt="Cart" className="w-6" />
      {count ? (
        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs font-bold rounded-full px-[5px]">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, "cart">) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/* === FALLBACK MENU === */
const FALLBACK_HEADER_MENU = {
  id: "gid://shopify/Menu/199655587896",
  items: [
    { id: "1", title: "Home", url: "/" },
    { id: "2", title: "Men", url: "/collections/men" },
    { id: "3", title: "Women", url: "/collections/women" },
    { id: "4", title: "Solutions", url: "/pages/solutions" },
    { id: "5", title: "Investors", url: "/pages/investors" },
    { id: "6", title: "Contact", url: "/pages/contact" },
  ],
};
