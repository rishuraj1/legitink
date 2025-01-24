"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingUI = () => {
  return (
    <div className="flex justify-center items-center h-screen min-w-80">
      <DotLottieReact
        src={"/assets/loading.lottie"}
        loop
        autoplay
        width={100}
        height={100}
      />
    </div>
  );
};

export default LoadingUI;
