import React, { useState, useEffect, useContext } from "react";
import styles from "./ContentContainer.module.scss";
import shuffle from "../../utility/arrayShuffle";
import MenuContext from "../../store/menu-context";
import createBasicInfoArray from "../../utility/createBasicInfoArray";
import Content from "./Content";
import { IMediaContentElement } from "./Content";
import SearchContext from "../../store/search-context";
import useHttp from "../../hooks/useHttp";
import ElementContext from "../../store/element-context";

export interface IMediaBasicInfo {
  title: string;
  year: number;
  rating: string;
  category: string;
  isBookmarked: boolean;
  smallThumbnail: string;
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

interface IMediaElement extends IMediaBasicInfo {
  category: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: IMediaElementThumbnail;
}

const ContentContainer = () => {
  const [media, setMedia] = useState<IMediaElement[]>([]);
  const [contentToDisplay, setContentToDisplay] = useState<
    IMediaContentElement[] | null
  >(null);
  const [titleToBookmark, setTitleToBookmark] = useState("");
  const [titleToOpen, setTitleToOpen] = useState("");

  const menuCtx = useContext(MenuContext);
  const searchCtx = useContext(SearchContext);

  const setMediaHandler = (fetchedData: any) => {
    const temp = fetchedData.map((el: any) => {
      el.thumbnail.regular.large = el.thumbnail.regular.large.replace(
        "./assets/",
        ""
      );
      el.thumbnail.regular.medium = el.thumbnail.regular.medium.replace(
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
    setMedia(temp);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchMedia,
  } = useHttp(
    {
      url: "https://web-entertainment-app-default-rtdb.firebaseio.com/public/media.json",
    },
    setMediaHandler
  );

  const displayInLog = (data: any) => {
    // console.log(data);
  };

  const { sendRequest: updateMedia } = useHttp(
    {
      url: "https://web-entertainment-app-default-rtdb.firebaseio.com/public.json",
      method: "PATCH",
      body: { media: media },
      headers: {
        "Content-Type": "application/json",
      },
    },
    null
  );

  // initial fetch
  useEffect(() => {
    fetchMedia();
  }, []);

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
            theme: "short",
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
            { title: "Trending", theme: "long", content: trendingBasicInfo },
            {
              title: "Recommended for you",
              theme: "short",
              content: notTrendingBasicInfo?.slice(0, 12),
            },
            {
              title: "Random",
              theme: "short",
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
            { title: "TV Series", theme: "short", content: tvSeriesBasicInfo },
          ]);
        }

        // ### MOVIES ###
        if (menuCtx.menuState === "movies") {
          const tempMovie = media.filter((el) => el.category === "Movie");
          const movieBasicInfo = createBasicInfoArray(tempMovie);
          setContentToDisplay([
            { title: "Movies", theme: "short", content: movieBasicInfo },
          ]);
        }

        // ### BOOKMARKS ###
        if (menuCtx.menuState === "bookmarks") {
          const tempBookmarked = media.filter((el) => el.isBookmarked === true);
          const bookmarkedBasicInfo = createBasicInfoArray(tempBookmarked);
          setContentToDisplay([
            {
              title: "Bookmarks",
              theme: "short",
              content: bookmarkedBasicInfo,
            },
          ]);
        }
      }
    }
  }, [media, menuCtx.menuState, searchCtx.searchText]);

  useEffect(() => {
    if (titleToBookmark.length > 1 && media) {
      setMedia((prevMedia) => {
        return prevMedia.map((el) => {
          if (el.title.includes(titleToBookmark)) {
            el.isBookmarked = !el.isBookmarked;
          }
          return el;
        });
      });

      // send updated data to server
      updateMedia();
    }

    return () => {
      setTitleToBookmark("");
    };
  }, [titleToBookmark]);

  return (
    <>
      {!isLoading && !error && (
        <ElementContext.Provider
          value={{
            titleToBookmark: titleToBookmark,
            setTitleToBookmark: setTitleToBookmark,
            titleToOpen: titleToOpen,
            setTitleToOpen: setTitleToOpen,
          }}
        >
          {contentToDisplay && <Content mediaContent={contentToDisplay} />}
        </ElementContext.Provider>
      )}
      <div className={styles.stateDisplay}>
        {isLoading && "Loading data..."}
        {error && "Loading error. Try refresh."}
      </div>
    </>
  );
};

export default ContentContainer;
