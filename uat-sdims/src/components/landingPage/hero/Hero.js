import Image from "next/image";
import React from "react";
import SimpleSlider from "../carousel/Carousel";
import slider3 from "../../../../public/assets/web3.jpg";
import slider from "../../../../public/assets/web.jpg";
import slider5 from "../../../../public/assets/web5.jpg";


const Hero = () => {
  return (
    <SimpleSlider slideToShow={1}  >
      <div>
        <Image src={slider} alt={"slider"} priority width={"1500"} height={"100"}  />
      </div>
      <div>
        <Image src={slider3} alt={"slider3"} priority width={"1500"} height={"100"}  />
      </div>
      <div>
        <Image src={slider5} priority alt={"slider5"} width={"1500"} height={"100"}  />
      </div>
      <div>
        <Image src={slider3} alt={"slider3"} priority  width={"1500"} height={"100"} />
      </div>
      <div>
        <Image src={slider} alt={"slider"} priority width={"1500"} height={"100"}  />
      </div>
      <div>
        <Image src={slider5} priority alt={"slider5"} width={"1500"} height={"100"} />
      </div>
    </SimpleSlider>
  );
};

export default Hero;
