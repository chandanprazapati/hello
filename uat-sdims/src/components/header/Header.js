import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import logo from "../../../public/assets/Emblem_of_Nepal.png";
import en from "../../../public/locales/en/header"
import ne from "../../../public/locales/ne/header"
import { useSelector } from "react-redux";


export function getStaticProps({locale}){
  
  return{
    props:{
      locale
    }
  }
}


const Header = () => {
  const router = useRouter();
  // const {locale} = router
  // const t = locale === "en"? en : ne
  const [scrollPosition, setScrollPosition] = useState(0);

  useLayoutEffect(() => {
    function updateScrollPosition() {
      setScrollPosition(window.pageYOffset);
    }
    // Add an event listener to update the scroll position on scroll
    window.addEventListener("scroll", updateScrollPosition);

    // Call the update function initially to get the initial scroll position
    updateScrollPosition();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  // const handleLanguage = (e) => {
  //   const locale = e.target.value;
  //   console.log(locale,"handle");
  // router.push('/', undefined, { locale:locale });
  // }

  const handleTeams = () => {
    window.scrollTo({
      top: 690,
      behavior: "smooth",
    });
  };
  const handleAbout = () => {
    window.scrollTo({
      top: 1410,
      behavior: "smooth",
    });
  };
  const handleContact = () => {
    window.scrollTo({
      top: 1760,
      behavior: "smooth",
    });
  };
  const handleHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // const userData = useSelector((state) => state.userDetail);
  return (
    <>
      <div className=" flex  top-0 fixed z-50 w-full items-center justify-between  bg-white shadow-xl px-5 py-2 ">
        <div className="flex gap-4 ">
          <div>
            <Image src={logo} alt="nagarpalikaLogo" width={80} height={80}/>
          </div>
          <div className="text-lg font-bold pt-4 lg:flex hidden ">
            {/* {t.fidim} */}
            फिदिम नगरपालिका
          </div>
        </div>
        <div className="text-xs font-bold lg:text-lg lg:flex gap-5 hidden ">
          <div onClick={handleHome} className="cursor-pointer">
            {/* {t('home')} */}
            Home
          </div>
          <div onClick={handleTeams} className="cursor-pointer">
            {/* {t('teams')} */}
            Teams
          </div>
          <div onClick={handleAbout} className="cursor-pointer">
            {/* {t('about')} */}
            About
          </div>
          <div onClick={handleContact} className="cursor-pointer">
            {/* {t('contact')} */}
            Contact
          </div>
         
        </div>

        <div className=" flex gap-2 ">
          {/* language translation ya rakhne github ma xa code */}
          {/* <select onChange={handleLanguage} defaultValue={locale} >
            <option value={"en"} >EN</option>
            <option value = {"ne"} >NE</option>
          </select> */}
          <div>
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
              variant="outlined"
            >
              {/* {t('login')} */}
              login
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                router.push("/auth/signup");
              }}
              variant="outlined"
            >
              {/* {t('signup')} */}
              signup
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
