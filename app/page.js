"use client";

import { useState } from 'react';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [palmReadingResult, setPalmReadingResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPalmReadingResult('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('画像をアップロードしてください。');
      return;
    }

    setLoading(true);
    setPalmReadingResult('');
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/palm-reading', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '手相占いに失敗しました。');
      }

      const data = await response.json();
      setPalmReadingResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">AI手相占い</h1>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="palmImage" className="form-label">
              手のひらの画像をアップロードしてください
            </label>
            <input
              className="form-control"
              type="file"
              id="palmImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                占いの準備中...
              </>
            ) : (
              '占う'
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}

        {palmReadingResult && (
          <div className="mt-4">
            <h3>鑑定結果:</h3>
            <div className="card card-body bg-light">
              <p style={{ whiteSpace: 'pre-wrap' }}>{palmReadingResult}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
