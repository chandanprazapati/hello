import Image from "next/image";
import { useRouter } from "next/router";
import Data from "./data/footerData.json";

const MainFooter = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row px-5 xl:px-0 xl:pl-36 py-10 gap-10 text-lg font-normal pb-16 text-[#161616]">
      <div className="w-full xl:w-[30vw]">
        {/* <Image
        className="w-auto h-h-auto"
          src="https://res.cloudinary.com/dhxccll9e/image/upload/v1668754172/thrunode/HomePage/eydean_logo_k1lo7m.svg"
          height={144}
          alt={"images"}
          width={132}
        /> */}
        <div className="py-2 mt-5 hover:underline">Information Care.</div>
        <div className="py-2 hover:underline 2xl:py-3">
          Mid-Baneshwor, Kathmandu
        </div>
        <div className="py-2 hover:underline 2xl:py-3">Phone: 01-4482998 , 44282996</div>
        <div className="py-2 hover:underline 2xl:py-3">
          Nepal: +977 9849845385
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 w-full gap-8 xl:gap-0 mt-3 xl:mt-0">
        {Data.links.map((link, index) => {
          return (
            <div key={index}>
              <div className="text-2xl font-semibold">{link.title}</div>
              <div
                className={`${
                  link.title === "Products"
                    ? "grid grid-cols-2 w-[95vw] xl:w-full"
                    : "grid-cols-1"
                } grid gap-4 xl:gap-6 mt-5`}
              >
                {link.comps.map((comp, index) => {
                  return (
                    <div
                      key={index}
                      className="hover:underline"
                    //   onClick={() => {
                    //     router.push(comp.path);
                    //   }}
                    >
                      {comp.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainFooter;
