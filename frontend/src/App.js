import React from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Landing,{ loader as landingLoader } from "./pages/landingPage/Landing";
import Register,{loader as registerLoader} from "./pages/Register";
import Dashboard ,{ loader as dashboardLoader }from "./pages/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import axios from "axios";
import TextEditor from "./components/TextEditor";
import {ToastContainer} from "react-toastify"
axios.defaults.withCredentials=true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} loader={landingLoader} />
      <Route path="/signup" element={<Register />} loader={registerLoader} />
     <Route path="/dashboard" element={<Dashboard />} loader={dashboardLoader} />
     <Route path="/explore" element={<Dashboard />} loader={dashboardLoader} />
     <Route path="/community" element={<Dashboard />} loader={dashboardLoader} />
     <Route path="/blog/edit" element={<TextEditor/>}/>
      {/*<Route path="/gallery" element={<Gallery />} loader={galleryloader} />
      <Route path="/contactus" element={<Contactus />} />
      <Route
        path="/connections"
        element={<Userconnect />}
        loader={userconnectloader}
      />
      <Route path="/queries" element={<Queries />} loader={queryloader} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/adminpanel" element={<AdminPanel />} />
      <Route path="/updateuser" element={<UpdateProfile />} />
      <Route path="/account/reset" element={<ResetPassword />} /> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return(
    
   <>
    <ToastContainer/>
    <RouterProvider router={router} />
   </>
    
    );
  // return <Navbar />
}

export default App;
