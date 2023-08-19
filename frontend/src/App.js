import React from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Landing, { loader as landingLoader } from "./pages/landingPage/Landing";
import Register, { loader as registerLoader } from "./pages/Register";
import Dashboard, {
  loader as dashboardLoader,
} from "./pages/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import axios from "axios";
import TextEditor ,{loader as textLoader} from "./components/TextEditor";
import { ToastContainer } from "react-toastify";
import SingleBlog from "./components/SingleBlog";
import Community from "./pages/Commuity/Community";
import CommunityBlog from "./pages/Commuity/CommunityBlog";
import Explore from "./pages/Explore/Explore";
import ExploreBlog from "./pages/Explore/ExploreBlog";
axios.defaults.withCredentials = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} loader={landingLoader} />
      <Route path="/signup" element={<Register />} loader={registerLoader} />
      <Route path="/dashboard">
        <Route index element={<Dashboard />} loader={dashboardLoader} />
        <Route path=":id" element={<SingleBlog />} />
        <Route path="edit" element={<TextEditor />} loader={textLoader}/>
        <Route path="add" element={<TextEditor />} loader={textLoader} />
      </Route>
      <Route path="/explore">
        <Route index element={<Explore />} />
        <Route path=":exid" element={<ExploreBlog />} />
      </Route>
      <Route path="/community">
        <Route index element={<Community />} />
        <Route path=":cid" element={<CommunityBlog />} />
      </Route>
      <Route path="/blog/edit" element={<TextEditor />} />
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
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
  // return <Navbar />
}

export default App;
