"use server";

import { atob } from "buffer";
import { redirect } from "next/navigation";

export type Result = {
  short_url: string;
  original_url: string;
};

export async function checkShortenedUrl(
  id: string
): Promise<{ result: Result | null; error: unknown | null }> {
  try {
    const decodedId = atob(decodeURIComponent(id));

    console.log("decoded id", decodedId);
    if (!decodedId) {
      throw new Error("Invalid ID");
    }

    const res = await fetch(
      `https://golang-url-shortener-419717.ue.r.appspot.com/get-url/${decodedId}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    console.log("data?", data);

    return { result: data, error: null };
  } catch (error) {
    console.log(error);
    return { result: null, error };
  }
}

export async function shortenUrlAction(url: string) {
  if (!url) {
    throw new Error("URL is required");
  }

  if (url.toString().length < 35) {
    throw new Error("URL is too short");
  }

  const whitespaceRegex = /\s/g;

  if (whitespaceRegex.test(url)) {
    throw new Error("URL cannot contain whitespace characters");
  }

  const res = await fetch(
    "https://golang-url-shortener-419717.ue.r.appspot.com/shorten",
    {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const shortUrl = await res.json();

  console.log("short url", shortUrl);

  if (!shortUrl || !shortUrl.shortened_url || !shortUrl.id) {
    throw new Error("Could not shorten url");
  }

  const encodedId = encodeURIComponent(btoa(shortUrl.id));

  return redirect(`/url-shortener/${encodedId}`);
}
