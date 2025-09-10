import React, { useState } from 'react';

const EncryptedBrowser = () => {
  const [url, setUrl] = useState('https://streetwiseapp.com');

  return (
    <div className="absolute inset-10 z-40 bg-black border-4 border-green-500 rounded-xl overflow-hidden">
      <div className="flex bg-green-900 p-2 text-white">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-2 text-black rounded"
        />
      </div>
      <iframe src={url} className="w-full h-full" title="Encrypted Browser" />
    </div>
  );
};

export default EncryptedBrowser;



