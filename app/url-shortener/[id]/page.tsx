import { atob } from "buffer";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

type Result = {
  short_url: string;
  original_url: string;
};

async function checkShortenedUrl(
  id: string
): Promise<{ result: Result | null; error: unknown | null }> {
  try {
    const res = await fetch(
      `https://golang-url-shortener-419717.ue.r.appspot.com/get-url/${id}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();

    return { result: data, error: null };
  } catch (error) {
    console.log(error);
    return { result: null, error };
  }
}

// @TODO add copy text functionality navigator.copyText
const page = async ({ params }: Props) => {
  const decodedId = atob(decodeURIComponent(params.id));

  const { result, error } = await checkShortenedUrl(decodedId);

  if (error || !result?.original_url) {
    console.error(error, result);
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Error</h1>
        <p className='text-gray-700 dark:text-gray-400'>
          {error ? JSON.stringify(error) : "URL not found"}
        </p>
      </div>
    );
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center w-full'>
      <div className='w-3/4 flex flex-col items-center'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-bold text-4xl text-center'>Shortened URL</h1>
          <a href={result.short_url} className='text-indigo-500 underline'>
            {result.short_url}
          </a>
        </div>
        <div>
          <p>Original URL</p>
          <a href={result.original_url} className='text-indigo-500 underline'>
            {result.original_url}
          </a>
        </div>
      </div>
    </main>
  );
};

export default page;
