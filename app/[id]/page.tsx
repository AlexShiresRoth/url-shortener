import React from "react";
import { checkShortenedUrl } from "../actions";
import Redirect from "./redirect";

type Params = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Params) => {
  const { result, error } = await checkShortenedUrl(btoa(id));

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Error Redirecting</h1>
        <p className='text-gray-700 dark:text-gray-400'>
          {error ? error.toString() : "URL not found"}
        </p>
      </div>
    );
  }

  if (!result?.original_url) {
    return <div className='min-s-h-screen bg-white'></div>;
  }

  return <Redirect url={result.original_url} />;
};

export default Page;
