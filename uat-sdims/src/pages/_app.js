// import React, { useEffect, useState } from "react";
// import "@/styles/globals.css";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";
// import NextNProgress from "nextjs-progressbar";
// import Layout from "../layouts/Layout";
// // for persist
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import LoadingSpinner from "../components/reusableDesign/Loading";
// const App = ({ Component, pageProps }) => {
//   const [persistor, setPersistor] = useState(null);
//   const [isRehydrated, setIsRehydrated] = useState(false);

//   useEffect(() => {
//     const persistor = persistStore(store, null, () => {
//       setIsRehydrated(true);
//     });
//     setPersistor(persistor);
//   }, []);

//   const theme = createTheme();

//   if (!isRehydrated) {
//     // Show a loading spinner or skeleton screen while rehydrating the state
//     return (
//       <div className=" pt-80 " >
//         <LoadingSpinner />
//       </div>
//     )
//   }
//   const userStatus = store.getState().userDetail?.user?.status;

//   if (userStatus === true) {
//     return (
//       <React.Fragment>
//         <NextNProgress color="red" />
//         <Provider store={store}>
//           <PersistGate persistor={persistor}>
//             <ThemeProvider theme={theme}>
//               <CssBaseline />
//               <ToastContainer />
//               <Layout>
//                 <Component {...pageProps} />
//               </Layout>
//             </ThemeProvider>
//           </PersistGate>
//         </Provider>
//       </React.Fragment>
//     );
//   }

//   // if (userStatus === null && router.pathname !== "/") {
//   //   // Redirect to the index page if user status is null and not already on the index page
//   //   router.push("/");
//   // }

//   return (
//     <React.Fragment>
//       <NextNProgress color="red" />
//       <Provider store={store}>
//         <PersistGate persistor={persistor}>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <ToastContainer />
//             <Component {...pageProps} />
//           </ThemeProvider>
//         </PersistGate>
//       </Provider>
//     </React.Fragment>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { store } from "../redux/store";
import Layout from "../layouts/Layout";
import LoadingSpinner from "../components/reusableDesign/Loading";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }) => {
  const [isRehydrated, setIsRehydrated] = useState(false);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    const persistorInstance = persistStore(store, null, () => {
      setIsRehydrated(true);
    });
    setPersistor(persistorInstance);

    return () => {
      persistorInstance && persistorInstance.pause();
    };
  }, []);

  const theme = createTheme();

  if (!isRehydrated) {
    return (
      <div className="pt-80">
        <LoadingSpinner />
      </div>
    );
  }

  const userStatus = store.getState().userDetail?.user?.status;
  const LayoutComponent = userStatus === true ? Layout : React.Fragment;

  return (
    <React.Fragment>
      <NextNProgress color="red" />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer />
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default App;
