import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const [data, setData] = useState(null);

  const [pageNum, setPageNum] = useState(1);

  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  // Initial API call
  const fetchInitialData = () => {
    // start the loading
    setLoading(true);

    // call the api
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);

        // Add the page num to next page
        setPageNum((prev) => prev + 1);

        // set the loading to false
        setLoading(false);
      }
    );
  };

  // fetch next page data
  const fetchNextPageData = () => {
    // start the loading
    setLoading(true);

    // call the api
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data.results, ...res.results] });
        } else {
          setData(res);
        }
        console.log(data);
        // Add the page num to next page
        setPageNum((prev) => prev + 1);

        // set the loading to false
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {/* When the data is loading */}
      {loading && <Spinner initial={true} />}

      {/* When the data loads */}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of ${query}`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
