// Author: Aditya Mahale(ad619659@dal.ca)

export function getSortedReviews(reviews, sortCriteria) {
  const sortedReviews = [...reviews];

  // Sort low to high
  if (sortCriteria === "lh")
    return sortedReviews.sort((a, b) =>
      a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
    );

  // Sort high to low
  if (sortCriteria === "hl")
    return sortedReviews.sort((a, b) =>
      b.rating > a.rating ? 1 : a.rating > b.rating ? -1 : 0
    );

  return sortedReviews.sort((a, b) => {
    const bDate = new Date(b.date);
    const aDate = new Date(a.date);
    return bDate.getTime() > aDate.getTime()
      ? 1
      : aDate.getTime() > bDate.getTime()
      ? -1
      : 0;
  });
}
