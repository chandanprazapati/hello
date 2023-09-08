
import { useSelector } from 'react-redux';
import CounterView from '../components/viewPage/sidebar/counter/CounterView'
import SuperAdminView from '../components/viewPage/sidebar/superAdmin/SuperAdminView';

export default function Layout({children}) {
  const userData = useSelector((state) => state.userDetail);


  return (
    <>
     {userData.user?.data?.role === "SuperAdmin" ? (
        <SuperAdminView>{children}</SuperAdminView>
      ) : userData.user?.data?.role === "Counter" ? (
        <CounterView>{children}</CounterView>
      ) : null}
    
    </>
  )
}


// import React from 'react'
// import ViewPage from '../components/viewPage/ViewPage'
// import Footer from '../components/footer/Footer'
// import HeaderStats from '../components/viewPage/dashboard/headerStats/HeaderStats'
// const Admin = ({children}) => {
//   return (
//    <>
//    <ViewPage/>
//    <div className="relative md:ml-64 bg-blueGray-100">
        
//         {/* Header */}
//         <HeaderStats/>
//         <div className="px-4 md:px-10 mx-auto w-full -m-24">
//           {children}
//           {/* <Footer/> */}
//         </div>
//       </div>
//    </>
//   )
// }

// export default Admin