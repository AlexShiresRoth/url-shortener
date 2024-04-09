"use client";
import { Result, checkShortenedUrl } from "@/app/actions";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [data, setData] = React.useState<Result | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  const goBack = () => router.back();

  useEffect(() => {
    (async () => {
      const { result, error } = await checkShortenedUrl(params.id);
      if (error) {
        setError(error);
        return;
      }
      setData(result);
      setIsLoading(false);
    })();
  }, [params.id]);

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-amber-400'>
        <h1 className='text-4xl font-bold'>Error</h1>
        <p className='text-gray-700 dark:text-gray-400'>
          {JSON.stringify(error)}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-amber-400'>
        <h1 className='text-4xl font-bold'>Loading...</h1>
      </div>
    );
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center w-full bg-amber-400'>
      <button
        type='button'
        onClick={goBack}
        className='mb-8 text-2xl font-semibold flex items-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          width={22}
        >
          <path d='M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z'></path>
        </svg>
        <p>Go Back</p>
      </button>
      <div className='w-3/4 flex justify-center gap-8 items-center flex-col md:flex-row'>
        <URLCard url={data?.short_url as string} title='Shortened URL' />
        <URLCard url={data?.original_url as string} title='Original URL' />
      </div>
    </main>
  );
};

type CardProps = {
  url: string;
  title: string;
};

const URLCard = ({ url, title }: CardProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className='flex flex-col items-center border-2 border-black w-full'>
      <div className='w-full p-4 bg-black'>
        <h1 className='font-bold text-4xl text-center  text-amber-400'>
          {title}
        </h1>
      </div>
      <a href={url} className='text-black underline px-4 pt-4 text-lg'>
        {url}
      </a>
      <button
        type='button'
        className='flex items-center py-4 hover:cursor-pointer'
        onClick={copyText}
      >
        {!isCopied && (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              width={22}
              className='fill-indigo-500 hover:cursor-pointer'
            >
              <path d='M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z'></path>
            </svg>
            <p>Copy URL</p>
          </>
        )}
        {isCopied && (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              width={22}
              className='fill-indigo-500'
            >
              <path d='M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z'></path>
            </svg>
            <p>Copied!</p>
          </>
        )}
      </button>
    </div>
  );
};

export default Page;
