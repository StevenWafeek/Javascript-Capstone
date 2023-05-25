const fetchMovieData = async (showId) => {
  const apiUrl = 'https://api.tvmaze.com/shows';
  const response = await fetch(`${apiUrl}/${showId}`);
  const data = await response.json();
  return {
    name: data.name,
    image: data.image.medium,
    genres: data.genres,
  };
};

export default fetchMovieData;