import { redirect } from "next/navigation";
import React from "react";

//@TOdo need proper error handling
async function shortenUrlAction(formData: FormData) {
  "use server";

  if (!formData.get("url")) {
    throw new Error("URL is required");
  }

  const res = await fetch({
    method: "POST",
    url: "https://golang-url-shortener-419717.ue.r.appspot.com/shorten",
    body: JSON.stringify({ url: formData.get("url") }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const shortUrl = await res.json();

  if (!shortUrl || !shortUrl.shortened_url || !shortUrl.id) {
    throw new Error("Could not shorten url");
  }

  const encodedId = encodeURIComponent(btoa(shortUrl.id));

  return redirect(`/url-shortener/${encodedId}`);
}

const page = () => {
  return (
    <main className='flex items-center min-h-screen justify-center w-full bg-amber-400'>
      <form
        className='flex flex-col items-center rounded gap-6 w-3/4 md:w-1/2'
        action={shortenUrlAction}
      >
        <h1 className='font-bold text-2xl md:text-4xl text-center'>
          Shorten your long URL! Shorten it!
        </h1>
        <div className='relative w-full'>
          <input
            required
            name='url'
            type='text'
            placeholder='Enter URL example: https://www.super-long-url.com?why=just-because-we-have-a-long-url'
            className='p-4 bg-transparent z-10 w-full relative outline-none bg-white border-2 border-black'
          />
          <div className='absolute top-2 left-2 block w-full h-full bg-black'></div>
        </div>
        <button
          type='submit'
          className='bg-indigo-500 border-2 uppercase border-black text-black font-semibold px-12 py-3 hover:bg-indigo-600 transition-colors duration-300 ease-in-out'
        >
          Shorten
        </button>
      </form>
    </main>
  );
};

export default page;
