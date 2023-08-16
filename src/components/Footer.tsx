import React from "react";

export default function Footer() {
  return (
    <div className={`text-gray-500 w-full text-center pb-8`}>
      <p>
        Using estimates from the cheapest and most expensive bundles found on{" "}
        <a
          href="https://www.reddit.com/coins/"
          className="underline text-orange-600"
        >
          reddit
        </a>
      </p>
      <p>
        View the code on{" "}
        <a
          href="https://github.com/allister-grange/AwardIt"
          className="underline text-orange-600"
        >
          GitHub
        </a>
      </p>
      <p>
        Made by{" "}
        <a
          href="https://allistergrange.com"
          className="underline text-orange-600"
        >
          Allister
        </a>
        , a 🥝
      </p>
    </div>
  );
}
