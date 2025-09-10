import React, { useState } from 'react';
import { uploadFile } from '../services/storage';

export default function StorageCard() {
  const [url, setUrl] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const downloadUrl = await uploadFile(file, 'uploads/' + file.name);
    setUrl(downloadUrl);
  };

  return (
    <div className="p-4 bg-purple-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Storage Upload</h2>
      <input
        type="file"
        onChange={handleUpload}
        className="block mb-2 text-black"
      />
      {url && (
        <p>
          File uploaded!{' '}
          <a href={url} target="_blank" rel="noreferrer" className="underline">
            View File
          </a>
        </p>
      )}
    </div>
  );
}



