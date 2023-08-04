import { useEffect, useReducer, useCallback } from "react";
import { GetPostsApiResponse } from "../types";

type State = {
  data?: GetPostsApiResponse;
  page: number;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "FETCH_PAGE"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
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
        const response = await fetch(
          `${url}/awards?id=${id}&postOrComment=${postOrComment}`
        );
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        const awardData = await response.json();

        console.log(awardData);

        // dispatch({ type: "FETCH_SUCCESS", payload: data });
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
