import { useEffect } from "react";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
// const SeoOptimization = dynamic(() => import("@/components/reusableDesign/SeoOptimzation"), { ssr: false });
const Header = dynamic(() => import("@/components/header/Header"), { ssr: false });
const LandingPage = dynamic(() => import("@/components/landingPage/LandingPage"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });
const BackToTop= dynamic(() => import("../backToTop/BackToTop"), { ssr: false });
export default function Home() {
  const userStatus = store.getState().userDetail?.user?.status;
  const router = useRouter();
  useEffect (() => {

    if(userStatus === true){
      router.push("/dashboard");
    }
  }, []);
  return (
    <>
      {/* <SeoOptimization title={"Homepage"} /> */}
      <Head>
        <title>SDIMS :</title>
       
        <link
          rel="icon"
          href="https://res.cloudinary.com/dhxccll9e/image/upload/v1675839528/Emblem_of_Nepal_ekjuxv.ico"
        />
      </Head>
      <div className="app-container">
        <div className="header">
          <Header />
        </div>
        <div className="body ">
          <LandingPage />
        </div>
        <div className=" flex justify-between lg:px-20 px-6  pb-4">
          <div className="lg:px-80">
            <Footer />
          </div>
          <div className="hidden lg:flex ">
            {" "}
            <BackToTop />
          </div>
        </div>
      </div>
    </>
  );
}
