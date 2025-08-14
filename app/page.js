"use client";

import { useState } from 'react';
import Link from 'next/link';

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

  const handleShare = async () => {
    const shareText = `星読み手相の鑑定結果：\n${palmReadingResult}\n\nあなたも試してみませんか？\n${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '星読み手相 鑑定結果',
          text: shareText,
          url: window.location.href,
        });
        console.log('シェアに成功しました');
      } catch (error) {
        console.error('シェアに失敗しました:', error);
      }
    } else {
      // Web Share APIが利用できない場合、クリップボードにコピー
      try {
        await navigator.clipboard.writeText(shareText);
        alert('鑑定結果をクリップボードにコピーしました！SNSなどに貼り付けてシェアしてください。');
        console.log('クリップボードにコピーしました');
      } catch (error) {
        console.error('クリップボードへのコピーに失敗しました:', error);
        alert('鑑定結果のコピーに失敗しました。');
      }
    }
  };

  return (
    <div className="container mt-5 fade-in">
      <h1 className="text-center mb-4 display-4">星読み手相</h1>
      <p className="text-center mb-3 lead">あなたの運命の扉を開く</p>
      <p className="text-center mb-5"><Link href="/about" className="text-decoration-none" style={{ color: 'var(--color-accent-lavender)' }}>星読み手相について</Link></p>
      <div className="card p-4 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center">
            <p className="fs-5 mb-3">
                <i className="bi bi-hand-index-fill me-2"></i>
                あなたの手のひらの写真をアップロードするか、カメラで撮影してください。
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <label htmlFor="palmImage" className="btn btn-light btn-lg mb-3">
                    <i className="bi bi-image me-2"></i>写真を選択
                </label>
                <input
                    className="d-none"
                    type="file"
                    id="palmImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <label htmlFor="cameraImage" className="btn btn-light btn-lg mb-3">
                    <i className="bi bi-camera me-2"></i>カメラで撮影
                </label>
                <input
                    className="d-none"
                    type="file"
                    id="cameraImage"
                    accept="image/*"
                    capture="camera"
                    onChange={handleFileChange}
                />
            </div>
            {selectedFile && (
                <div className="mt-3">
                    <p>選択されたファイル: {selectedFile.name}</p>
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected palm" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
                </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <span className="text-white">星々があなたの手相を読み解いています...</span>
              </>
            ) : (
              <span className="d-flex justify-content-center align-items-center">
                <i className="bi bi-stars me-2"></i>占う
              </span>
            )}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}

        {palmReadingResult && (
          <div className="mt-5 slide-up">
            <h3 className="text-center mb-3">鑑定結果:</h3>
            <div className="card card-body bg-light p-4">
              <p className="lead" style={{ whiteSpace: 'pre-wrap' }}>{palmReadingResult}</p>
              <button onClick={handleShare} className="btn btn-success mt-3">
                <i className="bi bi-share-fill me-2"></i>結果をシェアする
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ad Block 1 */}
      <div className="text-center mt-5 mb-4">
        <div dangerouslySetInnerHTML={{ __html: `<a href="https://px.a8.net/svt/ejp?a8mat=45BSYY+2P1P5M+4PWE+BYLJL" rel="nofollow">
          <img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=250813546163&wid=002&eno=01&mid=s00000022019002009000&mc=1"></a>
          <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=45BSYY+2P1P5M+4PWE+BYLJL" alt="">
        ` }} />
      </div>

      {/* Ad Block 2 */}
      <div className="text-center mb-5">
        <div dangerouslySetInnerHTML={{ __html: `<a href="https://px.a8.net/svt/ejp?a8mat=45BSYY+3PYLFM+2PEO+C2O5D" rel="nofollow">
          <img border="0" width="468" height="60" alt="" src="https://www28.a8.net/svt/bgt?aid=250813546225&wid=003&eno=01&mid=s00000012624002028000&mc=1"></a>
          <img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=45BSYY+3PYLFM+2PEO+C2O5D" alt="">
        ` }} />
      </div>

    </div>
  );
}
