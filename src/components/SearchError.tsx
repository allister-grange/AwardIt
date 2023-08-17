import React from "react";

type SearchErrorProps = {
  error?: string;
};

export default function SearchError({ error }: SearchErrorProps) {
  return (
    <>
      {error ? (
        <h2 className="text-red-500 text-lg text-center py-6">{error}</h2>
      ) : null}
    </>
  );
}
