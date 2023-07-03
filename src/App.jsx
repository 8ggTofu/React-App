import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import logoImg from "./assets/images/logo.png";
import { Logo } from "./components/Logo/Logo";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  // Fetch popular TV shows and set the current TV show
  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      alert("Something went wrong when fetching the popular TV shows")
    }
  }

  // Fetch recommended TV shows based on the current TV show
  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendationListResp.length > 0) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (error) {
      alert("Something went wrong when fetching the recommended TV shows")
    }
  }

  // Fetch TV shows by title
  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Something went wrong when fetching TV shows")
    }
  }

  useEffect(() => {
    // Fetch popular TV shows when the component mounts
    // This useEffect hook is triggered only once upon component mounting
    fetchPopulars();
  }, []);

  useEffect(() => {
    // Fetch recommendations when the current TV show changes
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  // Update the current TV show
  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
           url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div>
              <Logo
                img={logoImg}
                title="Watowatch"
                subtitle="Find a show you may like"
              />
            </div>
          </div>

          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_tv_shows}>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
