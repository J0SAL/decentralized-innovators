/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">      
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}<br/>Coded by Team SisGrammers.
        </div>
    </footer>
  );
}

export default DarkFooter;
