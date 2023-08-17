import React from 'react'
import { redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
export function loader({ request }) {
    if (sessionStorage.getItem("token") === "") {
      throw redirect("/?message=PleaseLogin");
    }
    return null;
}

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    </>
  )
}

export default Dashboard