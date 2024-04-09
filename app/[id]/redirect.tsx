"use client";
import { useEffect } from "react";

type Props = {
  url: string;
};

const Redirect = ({ url }: Props) => {
  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  return <div className='min-h-screen bg-white'></div>;
};

export default Redirect;
