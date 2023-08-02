import { useEffect, useReducer, useCallback } from "react";
import { GetPostsApiResponse } from "../types";

type State = {
  data?: GetPostsApiResponse;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_FAILURE"; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, error: null };
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
  });

  const fetchPosts = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const response = await fetch(`${url}/posts`);
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
  }, [url]);

  return { state, fetchPosts };
};

export default useApiCall;
