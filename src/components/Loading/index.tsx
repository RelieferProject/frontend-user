import React from 'react';
import LoadingJson from '@assets/lottie/loading.json';
import ReactLottie from '@components/Base/ReactLottie';

function Loading({ absolute }: { absolute?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center mx-auto ${
        absolute ? 'absolute left-1/2 -translate-x-1/2' : 'relative'
      }`}
    >
      <ReactLottie json={LoadingJson}></ReactLottie>
    </div>
  );
}

export default Loading;
