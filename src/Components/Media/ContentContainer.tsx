import { useState, useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/useHttp";
import Content, { IMediaContentElement } from "./Content";
import shuffle from "../../utility/arrayShuffle";
import MenuContext from "../../store/menu-context";
import createBasicInfoArray from "../../utility/createBasicInfoArray";
import SearchContext from "../../store/search-context";
import ElementContext from "../../store/element-context";
import { loadMedia, toggleBookmark } from "../../store/mediaSlice";
import styles from "./ContentContainer.module.scss";
import type { RootState, AppDispatch } from "../../store/store";

export interface IMediaBasicInfo {
  title: string;
  year: number;
  rating: string;
  category: string;
  isBookmarked: boolean;
  smallThumbnail: string;
}

export interface IMediaElement extends IMediaBasicInfo {
  category: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: IMediaElementThumbnail;
}

interface IMediaElementThumbnailContent {
  large: string;
  medium?: string;
  small: string;
}
interface IMediaElementThumbnail {
  regular: IMediaElementThumbnailContent;
  trending?: IMediaElementThumbnailContent;
}

const FIREBASE_URL =
  "https://web-entertainment-app-default-rtdb.firebaseio.com/public/media.json";
let isInitial = true;

const ContentContainer = () => {
  const [contentToDisplay, setContentToDisplay] = useState<
    IMediaContentElement[] | null
  >(null);
  const [titleToBookmark, setTitleToBookmark] = useState("");
  const [titleToOpen, setTitleToOpen] = useState("");

  const menuCtx = useContext(MenuContext);
  const searchCtx = useContext(SearchContext);
  const dispatch = useDispatch<AppDispatch>();
  const media = useSelector((state: RootState) => state.media.media);

  const setMediaHandler = useCallback(
    (fetchedData: IMediaElement[]) => {
      const temp = fetchedData.map((el: IMediaElement) => {
        el.thumbnail.regular.large = el.thumbnail.regular.large.replace(
          "./assets/",
          ""
        );
        el.thumbnail.regular.medium = el.thumbnail.regular.medium?.replace(
          "./assets/",
          ""
        );
        el.thumbnail.regular.small = el.thumbnail.regular.small.replace(
          "./assets/",
          ""
        );
        if (el.thumbnail.trending) {
          el.thumbnail.trending.small = el.thumbnail.trending.small.replace(
            "./assets/",
            ""
          );
          el.thumbnail.trending.large = el.thumbnail.trending.large.replace(
            "./assets/",
            ""
          );
        }
        return el;
      });
      dispatch(loadMedia(fetchedData));
    },
    [dispatch]
  );

  const { isLoading, error, sendRequest } = useHttp();

  // Fetch media from server
  useEffect(() => {
    sendRequest(
      {
        url: FIREBASE_URL,
      },
      setMediaHandler
    );
  }, [sendRequest, setMediaHandler]);

  // Push updated media to server
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (media.length > 1) {
      sendRequest({
        url: FIREBASE_URL,
        method: "PUT",
        body: { ...media },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [media, sendRequest]);

  useEffect(() => {
    if (media) {
      // ### SEARCH ###
      if (searchCtx.searchText) {
        const tempSearched = media.filter((el) =>
          el.title.toLowerCase().includes(searchCtx.searchText.toLowerCase())
        );
        const tempSearchedBasicInfo = createBasicInfoArray(tempSearched);
        setContentToDisplay([
          {
            title: "Found",
            theme: "Short",
            content: tempSearchedBasicInfo,
          },
        ]);
      }
      if (!searchCtx.searchText) {
        // ### HOME ###
        if (menuCtx.menuState === "home") {
          const tempTrending = media.filter((el) => el.isTrending === true);
          const trendingBasicInfo = createBasicInfoArray(
            tempTrending,
            "trending"
          );

          const tempNotTrending = media.filter((el) => el.isTrending !== true);
          const notTrendingBasicInfo = createBasicInfoArray(tempNotTrending);

          setContentToDisplay([
            { title: "Trending", theme: "Long", content: trendingBasicInfo },
            {
              title: "Recommended for you",
              theme: "Short",
              content: notTrendingBasicInfo?.slice(0, 12),
            },
            {
              title: "Random",
              theme: "Short",
              content: shuffle([...notTrendingBasicInfo])?.slice(0, 6),
            },
          ]);
        }

        // ### TV SERIES ###
        //TODO: rewrite to switch
        if (menuCtx.menuState === "tvseries") {
          const tempTvSeries = media.filter(
            (el) => el.category === "TV Series"
          );
          const tvSeriesBasicInfo = createBasicInfoArray(tempTvSeries);
          setContentToDisplay([
            { title: "TV Series", theme: "Short", content: tvSeriesBasicInfo },
          ]);
        }

        // ### MOVIES ###
        if (menuCtx.menuState === "movies") {
          const tempMovie = media.filter((el) => el.category === "Movie");
          const movieBasicInfo = createBasicInfoArray(tempMovie);
          setContentToDisplay([
            { title: "Movies", theme: "Short", content: movieBasicInfo },
          ]);
        }

        // ### BOOKMARKS ###
        if (menuCtx.menuState === "bookmarks") {
          const tempBookmarked = media.filter((el) => el.isBookmarked === true);
          const bookmarkedBasicInfo = createBasicInfoArray(tempBookmarked);
          setContentToDisplay([
            {
              title: "Bookmarks",
              theme: "Short",
              content: bookmarkedBasicInfo,
            },
          ]);
        }
      }
    }
  }, [media, menuCtx.menuState, searchCtx.searchText]);

  useEffect(() => {
    titleToBookmark && dispatch(toggleBookmark(titleToBookmark));
  }, [titleToBookmark]);

  return (
    <>
      {!isLoading && !error && (
        <ElementContext.Provider
          value={{
            titleToBookmark,
            setTitleToBookmark,
            titleToOpen,
            setTitleToOpen,
          }}
        >
          {contentToDisplay && <Content mediaContent={contentToDisplay} />}
        </ElementContext.Provider>
      )}
      <div className={styles.stateDisplay}>
        {isLoading && "Loading data..."}
        {error && `Loading error. Try refresh. ${error}`}
      </div>
    </>
  );
};

export default ContentContainer;
