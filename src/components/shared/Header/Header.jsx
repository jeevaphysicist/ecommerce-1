import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "components/utils/windowSize/windowSize";
import { header, navItem } from "data/data.header";
import Link from "next/link";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { cart, setCart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [height, width] = useWindowSize();
  const { data: session } = useSession();

  // For Fixed nav
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };

  useEffect(() => {
    if (openMenu) {
      if (height < 767) {
        disableBodyScroll(document);
      } else {
        enableBodyScroll(document);
      }
    } else {
      enableBodyScroll(document);
    }
  }, [openMenu, height]);

  useEffect(() => {
    if (session) GetCartHandler();
  }, [session]);

  useEffect(() => {
    if (cart.length > 0 && session) UpdateCartHandler();
  }, [cart]);

  const GetCartHandler = async () => {
    let data = { id: session?.user.id };
    let options = {
      method: "POST",
      body: JSON.stringify(data),
    };
    let response = await fetch(`/api/user/get-user-cart/cart`, options);
    let result = await response.json();
    // console.log("get result",result);
    if (result?.data?.cart) setCart(result?.data?.cart);
  };

  const UpdateCartHandler = async () => {
    let data = { cart, id: session?.user.id };
    let options = {
      method: "PATCH",
      body: JSON.stringify(data),
    };
    let response = await fetch(`/api/user/update-cart`, options);
    let result = await response.json();
    //  console.log("result",result);
  };

  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className="header">
        {promo && (
          <div className="header-top">
            <span>30% OFF ON ALL PRODUCTS ENTER CODE: beshop2020</span>
            <i
              onClick={() => setPromo(false)}
              className="header-top-close js-header-top-close icon-close"
            ></i>
          </div>
        )}
        <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
          <div className="header-logo">
            <Link href="/">
              <a>
                <img src={header.logo} alt="" />
              </a>
            </Link>
          </div>
          <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
            <ul className="header-options">
              <li>
                <Link href="/faq">
                  <a>
                    <i className="icon-search"></i>
                  </a>
                </Link>
              </li>
              <li>
                {!session ? (
                  <Link href="/login">
                    <a>
                      <span>Login</span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/profile">
                    <a>
                      <i className="icon-user"></i>
                    </a>
                  </Link>
                )}
              </li>
              <li>
                <Link href="/wishlist">
                  <a>
                    <i className="icon-heart"></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`${session ? "/cart":"/login"}`}>
                  <a>
                    <i className="icon-cart"></i>
                    <span>{cart.length ?? "0"}</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={
              openMenu ? "btn-menu js-btn-menu active" : "btn-menu js-btn-menu"
            }
          >
            {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))}
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
