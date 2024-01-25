import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api.js";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice.js";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import PageNotFound from "./pages/404/PageNotFound.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  // state.home will give you url and genres in an object. You can destructrure URL from it
  // also we have set url to the response we got.
  // we will save the value in actions using dispatch method
  // And we will access the actions data using use selector method
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration", null).then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  useEffect(() => {
    fetchApiConfig();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div style={{ height: "600px" }}></div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
