import React from "react";
import Element from "./Element";
import styles from "./SubcontentContainer.module.scss";

interface ISubcontentContainer {
  style: "long" | "short";
  title: string;
}

const DUMMY_DATA = {
  title: "Beyond Earth",
  thumbnail: {
    trending: {
      // small: "/assets/thumbnails/beyond-earth/trending/small.jpg",
      small: "./src/assets/thumbnails/beyond-earth/trending/small.jpg",
      large: "/src/assets/thumbnails/beyond-earth/trending/large.jpg",
    },
    regular: {
      small: "/assets/thumbnails/beyond-earth/regular/small.jpg",
      medium: "/assets/thumbnails/beyond-earth/regular/medium.jpg",
      large: "/assets/thumbnails/beyond-earth/regular/large.jpg",
    },
  },
  year: 2019,
  category: "Movie",
  rating: "PG",
  isBookmarked: false,
  isTrending: true,
};

const SubcontentContainer: React.FC<ISubcontentContainer> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h2>{props.title}</h2>
      <div className={styles.subcontentContainer}>
        {/* TODO: Change image path */}
        <Element
          image={
            process.env.PUBLIC_URL +
            "thumbnails/beyond-earth/trending/small.jpg"
          }
        />
        <Element
          image={
            process.env.PUBLIC_URL +
            "thumbnails/beyond-earth/trending/small.jpg"
          }
        />
        <Element
          image={
            process.env.PUBLIC_URL +
            "thumbnails/beyond-earth/trending/small.jpg"
          }
        />
      </div>
    </div>
  );
};

export default SubcontentContainer;
