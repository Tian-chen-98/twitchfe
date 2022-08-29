const SERVER_ORIGIN = " ";

const loginURL = `${SERVER_ORIGIN}/login`;

export const login = (credential) => {
    // fetch is to check network connection; fetch sucess does not mean response success
  return fetch(loginURL, {
    // coordinate with backend to ensure consistensy of http method
    method: "POST",
    // format of response header
    headers: {
      "Content-Type": "application/json",
    },
    // since backend creates a cookie upon login, we need to let the server know the credential
    credentials: "include",
    // credentials will be serialized into JSON
    body: JSON.stringify(credential),
    // .then means request was successful
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to log in");
    }
    return response.json();
  });
};

const registerURL = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
  return fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to register");
    }
  });
};

const logoutURL = `${SERVER_ORIGIN}/logout`;

export const logout = () => {
  return fetch(logoutURL, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to log out");
    }
  });
};

const topGamesURL = `${SERVER_ORIGIN}/game`;

export const getTopGames = () => {
  return fetch(topGamesURL).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get top games");
    }
    return response.json();
  });
};

const getGameDetailsURL = `${SERVER_ORIGIN}/game?game_name=`;

const getGameDetails = (gameName) => {
  return fetch(`${getGameDetailsURL}${gameName}`).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get game details");
    }
    return response.json();
  });
};

const searchGameByIdUrl = `${SERVER_ORIGIN}/search?game_id=`;

export const searchGameById = (gameId) => {
  return fetch(`${searchGameByIdUrl}${gameId}`).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to find the game");
    }
    return response.json();
  });
};

export const searchGameByName = (gameName) => {
  return getGameDetails(gameName).then((data) => {
    if (data && data.id) {
      return searchGameById(data.id);
    }

    throw Error("Failed to find the game");
  });
};

const favoriteItemUrl = `${SERVER_ORIGIN}/favorite`;

export const addFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ favorite: favItem }),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to add favorite item");
    }
  });
};

export const deleteFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ favorite: favItem }),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to delete favorite item");
    }
  });
};

export const getFavoriteItem = () => {
  return fetch(favoriteItemUrl, {
    credentials: "include",
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get favorite item");
    }

    return response.json();
  });
};

const getRecommendedItemsUrl = `${SERVER_ORIGIN}/recommendation`;

export const getRecommendations = () => {
  return fetch(getRecommendedItemsUrl, {
    credentials: "include",
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get recommended item");
    }

    return response.json();
  });
};
