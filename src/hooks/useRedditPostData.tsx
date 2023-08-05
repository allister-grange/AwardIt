import { useEffect, useReducer, useCallback } from "react";
import { GetPostsApiResponse } from "../types";

type State = {
  data?: GetPostsApiResponse;
  page: number;
  isLoading: boolean;
  error: string | null;
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
      return { ...state, isLoading: true, error: null };
    case "SET_SEARCHED":
      return { ...state, hasSearched: true };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, error: null };
    case "FETCH_PAGE":
      return { ...state, isLoading: false, error: null, page: action.payload };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const useApiCall = (url: string) => {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    isLoading: false,
    error: null,
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
        const response = await fetch(`${url}/posts?page=${pageNumber}`);
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
    [url]
  );

  const searchAwardsForId = useCallback(
    async (id, postOrComment) => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const getAwardsForIdsRes = await fetch(
          `${url}/awards?id=${id}&postOrComment=${postOrComment}`
        );
        if (!getAwardsForIdsRes.ok) {
          throw new Error("GetAwardsForIdsRes failed");
        }
        const awardData = await getAwardsForIdsRes.json();

        // push the data into the leader board
        const pushingDataIntoDbRes = await fetch(`${url}/posts`, {
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
          `${url}/postsByTotalCost?totalCost=${createdPostData.totalcost}`
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
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error as string });
      }
    },
    [url]
  );

  useEffect(() => {
    fetchPosts(state.page);
  }, [state.page]);

  return { state, fetchPosts, changePage, searchAwardsForId };
};

export default useApiCall;
