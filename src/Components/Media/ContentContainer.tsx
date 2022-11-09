import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useHttp from "../../hooks/useHttp";
import Content, { IMediaContentElement } from "./Content";
import shuffle from "../../utility/arrayShuffle";
import createBasicInfoArray from "../../utility/createBasicInfoArray";
import { loadMedia } from "../../store/mediaSlice";
import { auth } from "../../utility/initFirebase";
import styles from "./ContentContainer.module.scss";

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

interface ContentContainerProps {
  isSidebarMenuHidden: boolean;
}

const FIREBASE_URL =
  "https://web-entertainment-app-default-rtdb.firebaseio.com/public/media.json";
let isInitial = true;

const ContentContainer = (props: ContentContainerProps) => {
  const [contentToDisplay, setContentToDisplay] = useState<
    IMediaContentElement[] | null
  >(null);
  const [titleToBookmark, setTitleToBookmark] = useState("");
  const [titleToOpen, setTitleToOpen] = useState("");

  const dispatch = useAppDispatch();
  const mediaSel = useAppSelector((state) => state.media.media);
  const userDataSel = useAppSelector((state) => state.media.userData);
  const navSel = useAppSelector((state) => state.nav);

  const setMediaHandler = useCallback(
    (fetchedData: IMediaElement[]) => {
      // code to transform provided data, single use only
      // const temp = fetchedData.map((el: IMediaElement) => {
      //   el.thumbnail.regular.large = el.thumbnail.regular.large.replace(
      //     "./assets/",
      //     ""
      //   );
      //   el.thumbnail.regular.medium = el.thumbnail.regular.medium?.replace(
      //     "./assets/",
      //     ""
      //   );
      //   el.thumbnail.regular.small = el.thumbnail.regular.small.replace(
      //     "./assets/",
      //     ""
      //   );
      //   if (el.thumbnail.trending) {
      //     el.thumbnail.trending.small = el.thumbnail.trending.small.replace(
      //       "./assets/",
      //       ""
      //     );
      //     el.thumbnail.trending.large = el.thumbnail.trending.large.replace(
      //       "./assets/",
      //       ""
      //     );
      //   }
      //   return el;
      // });
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
    if (mediaSel.length > 1) {
      sendRequest({
        url: FIREBASE_URL,
        method: "PUT",
        body: { ...mediaSel },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [mediaSel, sendRequest]);

  // Push updated user data to server
  useEffect(() => {
    if (isInitial && mediaSel.length > 1) {
      isInitial = false;
      return;
    }
    if (mediaSel.length > 1) {
      sendRequest({
        url: `https://web-entertainment-app-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`,
        method: "PUT",
        body: { ...userDataSel },
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [userDataSel, sendRequest]);

  useEffect(() => {
    if (mediaSel) {
      // ### SEARCH ###
      if (navSel.searchValue) {
        const tempSearched = mediaSel.filter((el) =>
          el.title.toLowerCase().includes(navSel.searchValue.toLowerCase())
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
      if (!navSel.searchValue) {
        // ### HOME ###
        if (navSel.currentCategory === "home") {
          const tempTrending = mediaSel.filter((el) => el.isTrending === true);
          const trendingBasicInfo = createBasicInfoArray(
            tempTrending,
            "trending"
          );

          const tempNotTrending = mediaSel.filter(
            (el) => el.isTrending !== true
          );
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
        if (navSel.currentCategory === "tvseries") {
          const tempTvSeries = mediaSel.filter(
            (el) => el.category === "TV Series"
          );
          const tvSeriesBasicInfo = createBasicInfoArray(tempTvSeries);
          setContentToDisplay([
            { title: "TV Series", theme: "Short", content: tvSeriesBasicInfo },
          ]);
        }

        // ### MOVIES ###
        if (navSel.currentCategory === "movies") {
          const tempMovie = mediaSel.filter((el) => el.category === "Movie");
          const movieBasicInfo = createBasicInfoArray(tempMovie);
          setContentToDisplay([
            { title: "Movies", theme: "Short", content: movieBasicInfo },
          ]);
        }
      }
    }
  }, [mediaSel, navSel.currentCategory, navSel.searchValue]);

  useEffect(() => {
    // ### BOOKMARKS ###
    if (navSel.currentCategory === "bookmarks") {
      if (!userDataSel) {
        return;
      }
      const tempBookmarked = mediaSel.filter(
        (el) => el.title in userDataSel.bookmarks
      );
      const bookmarkedBasicInfo = createBasicInfoArray(tempBookmarked);
      setContentToDisplay([
        {
          title: "Bookmarks",
          theme: "Short",
          content: bookmarkedBasicInfo,
        },
      ]);
    }
  }, [mediaSel, navSel.currentCategory, userDataSel]);

  return (
    <div
      className={`${styles.mediaContainer} ${
        props.isSidebarMenuHidden && styles.thin
      }`}
    >
      {!isLoading && !error && contentToDisplay && (
        <Content mediaContent={contentToDisplay} />
      )}

      {isLoading ||
        (error && (
          <div className={styles.stateDisplay}>
            {isLoading && "Loading data..."}
            {error && `Loading error. Try refresh. ${error}`}
          </div>
        ))}
    </div>
  );
};

export default ContentContainer;
