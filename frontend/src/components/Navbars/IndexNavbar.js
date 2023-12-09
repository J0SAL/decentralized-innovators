import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar() {
  // const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 599 ||
        document.body.scrollTop > 599
      ) {
        // setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 600 ||
        document.body.scrollTop < 600
      ) {
        // setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  // const emailSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("emailSubmit");
  // };
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar
        // className={"fixed-top " + navbarColor}
        fixed="top"
        style={{
          backgroundColor: "white",
          color: "black",
          marginLeft: "100px",
          borderBottomLeftRadius: "50px",
          height: "80px",
        }}
        expand="lg"
        // color="info"
      >
        <Container>
          <div className="navbar-translate">
            <Link to="/home">
              <NavbarBrand
                style={{
                  color: "black",
                  fontFamily: "unset",
                  fontSize: "25px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                // href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
                // target="_blank"
                id="navbar-brand"
              >
                <div
                  style={
                    {
                      // flexDirection: "row"
                    }
                  }
                >
                  {/* <img
                    style={{
                      // 636 × 496
                      position: "absolute",
                      bottom: 30,
                      left: 20,
                      height: "50px",
                      width: "170px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      paddingRight: 100,
                    }}
                    alt="..."
                    className="n-logo"
                    src={require("assets/img/impact bear.jpeg").default}
                  ></img> */}

                  <p
                    style={{
                      position: "absolute",
                      paddingLeft: 250,
                      bottom: 31,
                      fontWeight: "bolder",
                      left: -153,
                    }}
                  >
                    {" "}
                    KhabriChain
                  </p>
                </div>
              </NavbarBrand>
            </Link>
            <UncontrolledTooltip target="#navbar-brand">
              Welcome to KhabriChain
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              {/* <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span> */}
              <i style={{ color: "black" }} className="fas fa-bars"></i>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Link to="/crime-hotspot">
                  <NavLink
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                    href="#pablo"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    // }}
                  >
                    <p
                    // style={{
                    //   color: "black",
                    //   fontFamily: "sans-serif",
                    //   fontWeight: "bold",
                    //   fontSize: "18px",
                    // }}
                    >
                      &nbsp;View Hotspot
                    </p>
                  </NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link to="/user-onboard">
                <NavLink
                  style={{
                    color: "black",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  href="#pablo"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("http://localhost:3001/user-onboard");
                  // }}
                >
                  <p>User Onboard</p>
                </NavLink>

                </Link>
              </NavItem>

              <NavItem>
                <Link to="/police-login-page">
                  <NavLink
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                    href="#pablo"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    // }}
                  >
                    <p
                    // style={{
                    //   color: "black",
                    //   fontFamily: "sans-serif",
                    //   fontWeight: "bold",
                    //   fontSize: "18px",
                    // }}
                    >
                      &nbsp;Police Login
                    </p>
                  </NavLink>
                </Link>
              </NavItem>

              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Components</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    All components
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Documentation
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              {/* <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  href="https://www.creative-tim.com/product/now-ui-kit-pro-react?ref=nukr-index-navbar"
                  id="upgrade-to-pro"
                  target="_blank"
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>Upgrade to PRO</p>
                </Button>
                <UncontrolledTooltip target="#upgrade-to-pro">
                  Cooming soon!
                </UncontrolledTooltip>
              </NavItem> */}
              <NavItem>
                <NavLink
                  style={{
                    color: "black",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  href="https://twitter.com/impact_bear"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    color: "black",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  href="https://www.facebook.com/profile.php?id=100075056961160"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    color: "black",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  href="https://www.instagram.com/nevertoolate.podcast/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
