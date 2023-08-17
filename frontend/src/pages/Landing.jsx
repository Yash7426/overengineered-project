

import Navbar from 'components/Navbar';
import React from 'react'

export function loader({ request }) {
    // const pathname = new URL(request.url).searchParams.get("message") || null;
    // if (pathname) {
    //   console.log("logged out");
    // }
    // console.log(document.cookie.split(";"))
    return request;
}

const Landing = () => {
  return (
    // <div>Landing</div>
    <Navbar />
  )
}

export default Landing