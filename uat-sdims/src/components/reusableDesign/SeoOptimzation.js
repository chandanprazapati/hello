import Head from "next/head";
import React from "react";
const SeoOptimization = ({ contentDescription, contentTitle, title }) => {
  return (
    <div>
      <Head>
        <title>SDIMS : {title ? title : ""}</title>
        <meta name="description" content={contentDescription} />
        <meta property="og:title" content={contentTitle} />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dhxccll9e/image/upload/v1675839528/Emblem_of_Nepal_ekjuxv.ico"
        />
      </Head>
    </div>
  );
};

export default SeoOptimization;

