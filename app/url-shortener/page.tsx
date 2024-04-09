"use client";
import React from "react";
import { shortenUrlAction } from "../actions";

const Page = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleChange = (e: string) => setUrl(e);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!url) return;

    try {
      await shortenUrlAction(url);
    } catch (error: any) {
      console.error(error);
      setError(error.toString());
    }
    setIsLoading(false);
  };
  return (
    <main className='flex items-center min-h-screen justify-center w-full bg-amber-400'>
      <form
        className='flex flex-col items-center rounded gap-6 w-3/4 md:w-1/2'
        onSubmit={(e) => submit(e)}
      >
        <h1 className='font-bold text-2xl md:text-4xl text-center'>
          Shorten your long URL!
        </h1>
        {error && <p className='text-red-500 text-center text-lg'>{error}</p>}
        <div className='relative w-full'>
          <input
            required
            name='url'
            type='text'
            minLength={35}
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={url}
            placeholder='Enter URL example: https://www.super-long-url.com?why=just-because-we-have-a-long-url'
            className='p-4 bg-transparent z-10 w-full relative outline-none bg-white border-2 border-black'
          />
          <div className='absolute top-2 left-2 block w-full h-full bg-black'></div>
        </div>
        {!isLoading && (
          <button
            type='submit'
            className='bg-indigo-500 border-2 uppercase border-black text-black font-semibold px-12 py-3 hover:bg-indigo-600 transition-colors duration-300 ease-in-out'
          >
            Shorten
          </button>
        )}
        {isLoading && (
          <span className='h-6 w-6 border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin rounded-full' />
        )}
      </form>
    </main>
  );
};

export default Page;
