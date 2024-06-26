import React from "react";

interface CommentOrPostToggleProps {
  setPostOrComment: React.Dispatch<React.SetStateAction<string>>;
  postOrComment: string;
  isLoadingLeaderBoard: boolean;
}

export const CommentOrPostToggle: React.FC<CommentOrPostToggleProps> = ({
  postOrComment,
  setPostOrComment,
  isLoadingLeaderBoard,
}) => {
  const [postOrCommentPillPosition, setNavPillPosition] = React.useState({
    left: 0,
    width: 0,
    animate: false,
  });
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const postOrCommentRef = React.useRef<HTMLDivElement>(null);
  const postRef = React.useRef<HTMLDivElement>(null);
  const commentRef = React.useRef<HTMLDivElement>(null);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // set the original position for the pill, need to account for the scrollbar popping when the leaderboard comes in
  React.useEffect(() => {
    const boundingRect = postRef.current!.getBoundingClientRect();

    const offsetX = boundingRect.left;
    const width = boundingRect.width;

    setNavPillPosition({ left: offsetX, width, animate: false });
  }, [isLoadingLeaderBoard, windowWidth]);

  React.useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const onLinkMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const linkRect = (e.target as HTMLAnchorElement).getBoundingClientRect();

    const boundingRect = postOrCommentRef.current!.getBoundingClientRect();

    const offsetX = linkRect.left - boundingRect.left;
    const width = linkRect.width;

    const target = e.target as HTMLElement;
    const textContent = target.textContent;

    setPostOrComment(textContent === "Post" ? "post" : "comment");

    setNavPillPosition({ left: offsetX, width, animate: true });
  };

  const isPost = postOrComment === "post";

  return (
    <div
      className="w-100 text-center pt-5 flex flex-row justify-center relative"
      ref={postOrCommentRef}
    >
      <button className="w-100 border border-black rounded-3xl h-8 ">
        <span
          className={` pr-4 pl-4 relative transition-all
          ${isPost ? "text-white" : ""} z-50`}
          onMouseOver={(e) => onLinkMouseEnter(e)}
          ref={postRef}
        >
          Post
        </span>
        <span
          className={` pr-4 pl-4 relative transition-all
          ${!isPost ? "text-white" : ""} z-50`}
          onMouseOver={(e) => onLinkMouseEnter(e)}
          ref={commentRef}
        >
          Comment
        </span>
        <span
          style={{
            left: `${postOrCommentPillPosition.left}px`,
            width: `${postOrCommentPillPosition.width}px`,
            top: "20px",
            transition: postOrCommentPillPosition.animate
              ? "transform .3s ease, width .3s ease, left .3s ease"
              : "",
          }}
          className="bg-black absolute rounded-3xl h-8 z-1"
        ></span>
      </button>
    </div>
  );
};
