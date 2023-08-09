import { useEffect, useReducer, useCallback } from "react";
import { GetPostsApiResponse } from "../types";

const BACKEND_URL = "https://backend.awardit.com";

type State = {
  data?: GetPostsApiResponse;
  page: number;
  isLoading: boolean;
  error?: string;
  hasSearched: boolean;
};

type Action =
  | { type: "FETCH_INIT" }
  | { type: "SET_SEARCHED" }
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "FETCH_PAGE"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: undefined };
    case "SET_SEARCHED":
      return { ...state, hasSearched: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: undefined,
      };
    case "FETCH_PAGE":
      return {
        ...state,
        isLoading: false,
        error: undefined,
        page: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// parse out id of post or comment from search
const parseRedditIdFromUrl = (url: string, postOrComment: string) => {
  let id = "";

  if (postOrComment === "post") {
    const regex = /(?:old\.)?reddit\.com\/(?:r\/\w+\/comments\/)?(\w+)/i;
    const match = url.match(regex);

    if (!match) {
      return null;
    }

    id = match[1];
  } else {
    const regex = /\/([a-z0-9]+)\/?$/i;
    const match = url.match(regex);

    if (!match) {
      return null;
    }

    id = match[1];
  }

  return id;
};

const useApiCall = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    isLoading: false,
    error: undefined,
    page: 1,
    hasSearched: false,
  });

  const changePage = useCallback((pageNumber: number) => {
    dispatch({ type: "FETCH_PAGE", payload: pageNumber });
  }, []);

  const fetchPosts = useCallback(
    async (pageNumber: number) => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(`${BACKEND_URL}/posts?page=${pageNumber}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = (await response.json()) as GetPostsApiResponse;

        const formattedData = data.posts.map((post: any) => ({
          ...post,
          subReddit: post.subreddit,
          totalCost: parseInt(post.totalcost),
        }));

        data["posts"] = formattedData;

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error as string });
      }
    },
    [BACKEND_URL]
  );

  const searchAwardsForId = useCallback(
    async (url, postOrComment) => {
      const id = parseRedditIdFromUrl(url, postOrComment);

      if (!id) {
        dispatch({
          type: "FETCH_FAILURE",
          payload:
            "🤕 there's an issue with your url - make sure the ID of the post is present",
        });
        return;
      }

      try {
        dispatch({ type: "FETCH_INIT" });
        const getAwardsForIdsRes = await fetch(
          `${BACKEND_URL}/awards?id=${id}&postOrComment=${postOrComment}`
        );
        if (!getAwardsForIdsRes.ok) {
          throw new Error("GetAwardsForIdsRes failed");
        }
        const awardData = await getAwardsForIdsRes.json();

        if (!getAwardsForIdsRes.ok) {
          throw new Error("Failed to pull down awards for record");
        }

        // early break out if the post has no awards
        if (awardData.coins.length === 0) {
          throw new Error(`🤕 there are no awards on that ${postOrComment}`);
        }

        // push the data into the leader board
        const pushingDataIntoDbRes = await fetch(`${BACKEND_URL}/posts`, {
          body: JSON.stringify(awardData),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!pushingDataIntoDbRes.ok) {
          throw new Error("Failed to create the reddit post record");
        }

        const createdPostData = await pushingDataIntoDbRes.json();

        // query the leaderboard again, we only need the page that has the data on it
        const response = await fetch(
          `${BACKEND_URL}/postsByTotalCost?totalCost=${createdPostData.totalcost}`
        );
        if (!response.ok) {
          throw new Error("Pulling down leader board by total cost failed");
        }
        const data = (await response.json()) as GetPostsApiResponse;

        // set the highlighted row to the row that matches the one returned from the post above
        const formattedData = data.posts.map((post: any) => ({
          ...post,
          subReddit: post.subreddit,
          totalCost: parseInt(post.totalcost),
          isHighlighted: createdPostData.id === post.id,
        }));

        data["posts"] = formattedData;

        dispatch({ type: "FETCH_SUCCESS", payload: data });
        dispatch({ type: "SET_SEARCHED" });
        return data;
      } catch (error) {
        const errorMessage = error as any;
        dispatch({
          type: "FETCH_FAILURE",
          payload: errorMessage.message as string,
        });
      }
    },
    [BACKEND_URL]
  );

  useEffect(() => {
    fetchPosts(state.page);
  }, [state.page]);

  return { state, fetchPosts, changePage, searchAwardsForId };
};

export default useApiCall;
