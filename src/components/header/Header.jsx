import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // When we click on search button
  const searchQueryHandler = (event) => {
    // API call should make only if
    // When we click on enter button
    // And the length of input box is not empty
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);

      // After navigation the search bar will remain open, we have to hide it after 1 second
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={() => navigate("/")} />
        </div>
        {/* For normal screen */}
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        {/* For mobile screen */}
        <div className="mobileMenuItems">
          {/* When we click on search icon on header it will open the search input box */}
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            // If mobile menu is true it means mobile menu is showing so we have to show close button
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            // If mobile menu is not showing then we have to show mobile menu
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {/* For showing search in the header menu */}
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or a tv show"
                onKeyUp={searchQueryHandler}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
