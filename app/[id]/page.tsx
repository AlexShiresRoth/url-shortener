import React from "react";
import { checkShortenedUrl } from "../actions";
import { redirect } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Params) => {
  const { result, error } = await checkShortenedUrl(btoa(id));
  console.log(result);

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Error</h1>
        <p className='text-gray-700 dark:text-gray-400'>
          {error ? error.toString() : "URL not found"}
        </p>
      </div>
    );
  }
  if (result?.original_url) {
    return redirect(result.original_url);
  }
  return (
    <main className='min-h-screen bg-amber-400'>
      <h1>Redirecting...</h1>
    </main>
  );
};

export default Page;
