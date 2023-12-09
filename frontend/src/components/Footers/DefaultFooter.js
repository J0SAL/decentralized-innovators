/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}
          <br />
          Coded by Team Decentralized Innovators.
        </div>
      </footer>
    </>
  );
}

export default DefaultFooter;
