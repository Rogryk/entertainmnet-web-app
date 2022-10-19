function createBasicInfoArray(
  this: any,
  array: any[],
  thumbnail?: "regular" | "trending"
) {
  const thumbnailType = thumbnail ? thumbnail : "regular";

  const basicInfo = array.map((el) => {
    return {
      title: el.title,
      year: el.year,
      rating: el.rating,
      category: el.category,
      isBookmarked: el.isBookmarked,
      smallThumbnail:
        thumbnailType === "regular"
          ? el.thumbnail.regular.small
          : el.thumbnail.trending.small,
    };
  });

  return basicInfo;
}

export default createBasicInfoArray;
