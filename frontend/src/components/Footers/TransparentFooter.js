/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
      <footer className="footer footer-default">
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}<br/>Coded by Team SisGrammers.
        </div>
      </footer>
  );
}

export default TransparentFooter;
