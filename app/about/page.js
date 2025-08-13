import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-4">星読み手相について</h1>
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: '800px' }}>
        <p className="lead mb-4">
          「星読み手相」は、あなたの手のひらに刻まれた線から、星々の導きを読み解くAI手相占いサービスです。
          最新のAI技術と古くからの手相術を融合させ、あなたの運命、才能、そして未来の可能性を深く探求します。
        </p>
        <p className="mb-4">
          私たちは、手相が単なる手のしわではなく、あなたの人生の物語を映し出す鏡だと信じています。
          このサービスを通じて、あなたが自分自身をより深く理解し、前向きな一歩を踏み出すきっかけとなることを願っています。
        </p>
        <p className="mb-4">
          手のひらの画像をアップロードするだけで、AIがあなたの手相を鑑定し、詳細な結果をお届けします。
          生命線、感情線、知能線、運命線など、主要な手相の線からあなたの個性や運勢を読み解きます。
        </p>
        <p className="mb-5">
          さあ、あなたの手のひらに隠されたメッセージを、私たちと一緒に解き明かしましょう。
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          手相占いに戻る
        </Link>
      </div>
    </div>
  );
}
