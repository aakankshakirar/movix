import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  // Created the instance of usenavigate hook
  const navigate = useNavigate();

  // This method will call automaticaly at least once as soon as this page runs
  const { data, loading } = useFetch("/movie/upcoming");

  // We are accessing it to get the full path of an image
  const { url } = useSelector((state) => state.home);

  // As soon as we get the data in data constant we will call the useEffect hook and set the background image
  // ?. is optional chaining becuase we may not have data in the starting to avoid errors
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  // For setting the hero banner background image directly by API call
  const [background, setBackground] = useState("");

  // For setting the search input value
  const [query, setQuery] = useState("");

  // When we click on search button
  const searchQueryHandler = (event) => {
    // API call should make only if
    // When we click on enter button
    // And the length of input box is not empty
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {/* Show the image only when data is loaded through api */}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="title">
            Millions of movies, TV shows and people to discover. Explore Now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or a tv show"
              onKeyUp={searchQueryHandler}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
