const likesApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EggSGBLacbxyGumZrK3e/likes/';

const fetchLikesData = async (showId) => {
  const response = await fetch(`${likesApiUrl}?item_id=${showId}`);
  const data = await response.json();
  // eslint-disable-next-line camelcase
  const res = data.find(({ item_id }) => item_id === showId);
  return res ? res.likes : 0;
};

const updateLikesData = async (showId, likes) => {
  const response = await fetch(`${likesApiUrl}`, {
    method: 'POST',
    body: JSON.stringify({ item_id: showId, likes }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.text();
  return data;
};

export { fetchLikesData, updateLikesData };