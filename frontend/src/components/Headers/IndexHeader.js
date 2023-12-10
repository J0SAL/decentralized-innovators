/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
// core components

import bg1 from "../../assets/img/bg-supreme.jpg";

function IndexHeader() {
  let pageHeader = React.createRef();

  // React.useEffect(() => {
  //   if (window.innerWidth > 991) {
  //     const updateScroll = () => {
  //       let windowScrollTop = window.scrollY / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //     window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });

  return (
    <>
      <div className="page-header page-header-small" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${bg1})`,
          }}
          ref={pageHeader}
        ></div>
      </div>
    </>
  );
}

export default IndexHeader;
