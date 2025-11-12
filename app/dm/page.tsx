"use client";
import { useEffect, useState, useRef } from "react";
import { Send, ArrowLeft, Info, Image as ImageIcon, X } from "lucide-react";
import styles from "./dm.module.css";
import { supabase } from "@/lib/supabaseClient";

export default function DMPage() {
  const [messages, setMessages] = useState([
   {
      text: "オフ会楽しかったー！😆",
      sender: "other",
      time: "2024年09月03日午後8時25分",
    },
    {
      text: "どん兵衛ありがとね！毎日食べる",
      sender: "me",
      time: "2024年09月03日午前9時30分",
      image: "/picture2.png",
    },
    { text: "嬉しい〜☺️", sender: "other", time: "2025年01月03日午前9時32分" },
    { text: "100万人行くまでぜったい応援し続けるね", sender: "other", time: "2025年01月33日午前9時40分" },
    { text: "まだ1000人しかおらんけど絶対1000倍にするから着いてきてな！", sender: "me", time: "2025年01月33日午前10時05分" },
    { text: "あと100万人行っても応援してや笑", sender: "me", time: "2025年01月33日午前10時05分" },
    { text: "あ、ごめんwそういうつもりじゃなかったのw", sender: "other", time: "2025年01月33日午前10時07分" },
    { text: "死ぬまで応援する！", sender: "other", time: "2025年01月33日午前10時07分" },
    { text: "電車の話面白すぎるwご飯吹き出しちゃった", sender: "other", time: "2025年01月34日午後09時30分" },
    { text: "良かったぁー。友達全然笑ってくれへんかったからめっちゃ心配やったねん。おもろいよな笑", sender: "me", time: "2025年01月35日午前12時02分" },
    { text: "あれ笑わない友達すごいw絶対耐えれない😂", sender: "other", time: "2025年01月35日午後12時10分" },
    { text: "今日も動画あげてくれてありがとう〜。疲れ吹き飛んだ🌬️", sender: "other", time: "2025年01月35日午後09時10分" },
    { text: "頑張りすぎんと休みやー", sender: "me", time: "2025年01月35日午後10時10分" },
    { text: "ありがとう！優しい😭", sender: "other", time: "2025年01月35日午後10時12分" },
    { text: "何の仕事してるん？", sender: "me", time: "2025年01月35日午前12時23分" },
    { text: "大学生！🏫", sender: "other", time: "2025年01月35日午前12時25分" },
    { text: "ヘー！何やってるん？", sender: "me", time: "2025年01月36日午後09時54分" },
    { text: "IT系〜！", sender: "other", time: "2025年01月36日午後09時57分" },
    { text: "すご！天才やん", sender: "me", time: "2025年01月37日午後9時08分" },
    { text: "全然だよw", sender: "other", time: "2025年01月37日午後9時10分" },
    { text: "おはよー☀️", sender: "other", time: "2025年01月38日午前9時05分" },
    { text: "おはよー！", sender: "me", time: "2025年01月38日午前11時20分" },
    { text: "急だけどホラー映画好き？？", sender: "other", time: "2025年01月38日午後11時30分" },
    { text: "好きやでー友達とよく見にいく", sender: "me", time: "2025年01月39日午後09時20分" },
    { text: "え、嬉しい！何が好き？？", sender: "other", time: "2025年01月39日午後09時32分" },
    { text: "ノロイめっちゃ面白かった", sender: "me", time: "2025年01月30日午後08時45分" },
    { text: "めっちゃ好き！POVの頂点だよねあれは", sender: "other", time: "2025年01月30日午後08時50分" },
    { text: "ホラー好きなん？", sender: "me", time: "2025年01月31日午後06時42分" },
{ text: "うん！いんと君もそれで見つけたの", sender: "other", time: "2025年01月31日午後06時48分" },
{ text: "そーなんや！おすすめ教えてよ", sender: "me", time: "2025年01月32日午後09時27分" },
{ text: "え！いっぱいある！1番好きなのは、「サスペリア」って映画！", sender: "other", time: "2025年01月32日午後09時32分" },
{ text: "ヘー！今度見てみるわ", sender: "me", time: "2025年01月33日午後07時15分" },
{ text: "私のアイコンの女の子がそうなの", sender: "other", time: "2025年01月33日午後07時21分" },
{ text: "そーなんやー", sender: "me", time: "2025年01月34日午後10時03分" },
{ text: "今日の動画なんかめっちゃ怖かった😱", sender: "other", time: "2025年01月34日午後10時11分" },
{ text: "どう怖かった？", sender: "me", time: "2025年01月35日午後05時58分" },
{ text: "なんかカメラの写し方なのかな", sender: "other", time: "2025年01月35日午後06時06分" },
{ text: "あーこれこの前見た海外の人がやってたやつ真似してみたねん", sender: "me", time: "2025年01月36日午後08時44分" },
{ text: "そーなんだ！めっちゃ良い！", sender: "other", time: "2025年01月36日午後08時50分" },
{ text: "まじ！いっぱい使うわ", sender: "me", time: "2025年01月37日午後10時12分" },
{ text: "うん！", sender: "other", time: "2025年01月37日午後10時17分" },
{ text: "そーゆう感想ありがたい", sender: "me", time: "2025年01月38日午後07時09分" },
{ text: "いっぱい言ってくね", sender: "other", time: "2025年01月38日午後07時18分" },
{ text: "ホラー好き目線でやって欲しい企画ある？", sender: "me", time: "2025年01月39日午後09時53分" },
{ text: "ホラーでふざける系の動画かなー", sender: "other", time: "2025年01月39日午後10時00分" },
{ text: "例えば？", sender: "me", time: "2025年01月30日午後06時27分" },
{ text: "あの反復横跳びのやつめっちゃ面白かったw", sender: "other", time: "2025年01月30日午後06時33分" },
{ text: "あれいいんや笑", sender: "me", time: "2025年01月31日午後08時39分" },
{ text: "うんwああいうのも好き", sender: "other", time: "2025年01月31日午後08時49分" },
{ text: "じゃあなんか考えとくわ", sender: "me", time: "2025年01月32日午後05時55分" },
{ text: "やったー！楽しみにしとくね", sender: "other", time: "2025年01月32日午後06時01分" },
{ text: "今日も動画あげてくれてありがと〜疲れ吹き飛んだ", sender: "other", time: "2025年01月33日午後10時30分" },
{ text: "こちらこそ！楽しんでもらえて嬉しいわ", sender: "me", time: "2025年01月34日午後07時34分" },
{ text: "毎日投稿無理しないでね", sender: "other", time: "2025年01月34日午後07時42分" },
{ text: "えみちゃんがみてくれるんやったら俺も頑張るでー", sender: "me", time: "2025年01月35日午後09時05分" },
{ text: "めっちゃ嬉しい🥹", sender: "other", time: "2025年01月35日午後09時11分" },
{ text: "2000人達成おめでとー！！", sender: "other", time: "2025年01月36日午後06時24分" },
{ text: "ありがとう！絶対有名なるで〜", sender: "me", time: "2025年01月37日午後10時41分" },
{ text: "ほんといんと君見始めてから人生変わったの。毎日楽しい", sender: "other", time: "2025年01月37日午後10時46分" },
{ text: "そんなん言ってくれて嬉しいわ〜", sender: "me", time: "2025年01月38日午後07時28分" },
{ text: "絶対見続けるから、絶対有名なってね", sender: "other", time: "2025年01月38日午後07時34分" },
{ text: "任しといて。", sender: "me", time: "2025年01月39日午後08時56分" },
{ text: "うん！任しとく", sender: "other", time: "2025年01月39日午後09時04分" },
{ text: "怖い話の話し方めっちゃ上手で怖かった〜", sender: "other", time: "2025年01月30日午後06時58分" },
{ text: "ありがとう！初めてやったけどいけてた？", sender: "me", time: "2025年02月01日午後09時42分" },
{ text: "うん！才能あるよ", sender: "other", time: "2025年02月01日午後09時51分" },
{ text: "まじ、第二の池上目指そかな笑", sender: "me", time: "2025年02月02日午後06時28分" },
{ text: "いけるよw", sender: "other", time: "2025年02月02日午後06時34分" },
{ text: "怖い話とか結構見たりするん？", sender: "me", time: "2025年02月03日午後08時17分" },
{ text: "うん、結構見るよ〜ラジオ感覚で", sender: "other", time: "2025年02月03日午後08時26分" },
{ text: "え〜怖いやろ", sender: "me", time: "2025年02月04日午後10時05分" },
{ text: "怖いwでもそれがいいの", sender: "other", time: "2025年02月04日午後10時10分" },
{ text: "そーなんや笑", sender: "me", time: "2025年02月05日午後07時44分" },
{ text: "うんw", sender: "other", time: "2025年02月05日午後07時51分" },
{ text: "そーいえばサスペリア見てくれた？？", sender: "me", time: "2025年02月06日午後09時18分" },
{ text: "まだ見てないわーごめん", sender: "other", time: "2025年02月06日午後09時26分" },
{ text: "いや全然大丈夫！一応聞いとこうかなと思っただけなの", sender: "me", time: "2025年02月07日午後05時57分" },
{ text: "めっちゃ好きなんやなー", sender: "other", time: "2025年02月07日午後06時06分" },
{ text: "そう。でもニッチな映画で誰も見てないから誰かと感想共有したくて", sender: "me", time: "2025年02月08日午後10時21分" },
{ text: "なるほどね。じゃあ暇なとき真っ先にみるわ", sender: "other", time: "2025年02月08日午後10時29分" },
{ text: "嬉しい〜☺️", sender: "me", time: "2025年02月09日午後08時11分" },
{ text: "おはよ〜☀️今日忙しくて動画見れなそう(泣）", sender: "other", time: "2025年02月09日午前08時20分" },
{ text: "無理せんと頑張りや〜", sender: "me", time: "2025年02月10日午後09時34分" },
{ text: "おはよ〜☀️昨日の動画さっき見たよ！おふざけ動画めっちゃ嬉しい。笑いすぎて疲れ吹き飛んだ", sender: "other", time: "2025年02月11日午前06時48分" },
{ text: "言ってくれたからおふざけやってみたねん〜笑ってくれて良かった", sender: "me", time: "2025年02月12日午後07時22分" },
{ text: "めちゃくちゃ面白かったよ。どーやったら電波調べようって考えになるのw", sender: "other", time: "2025年02月12日午後07時30分" },
{ text: "寝てるときパッと思いついたねん笑", sender: "me", time: "2025年02月13日午後10時14分" },
{ text: "天才だねw", sender: "other", time: "2025年02月13日午後10時23分" },
{ text: "ハッピーバレンタイン！私からのチョコだよ〜🍫", sender: "other", time: "2025年02月14日午後08時11分" },
{ text: "おーありがとう！パクっ。今まで食べた食いもんの中で一番上手い", sender: "me", time: "2025年02月15日午後09時48分" },
{ text: "www", sender: "other", time: "2025年02月15日午後09時57分" },
{ text: "おはよ〜☀️今日も動画見れなさそう。大学辞めたいよ〜", sender: "other", time: "2025年02月16日午前07時40分" },
{ text: "めっちゃ忙しそうやなー。一緒に頑張ろな", sender: "me", time: "2025年02月17日午後10時08分" },
{ text: "嬉しいめっちゃ頑張れる！", sender: "other", time: "2025年02月17日午後10時15分" },
{ text: "お家やばいね😱", sender: "other", time: "2025年02月18日午後06時51分" },
{ text: "やばい。早く引っ越したいけどYoutuber魂で住み続けるよ", sender: "me", time: "2025年02月19日午後09時12分" },
{ text: "私有名な霊媒師さん知ってるから、やばそうだったら言ってね", sender: "other", time: "2025年02月19日午後09時21分" },
{ text: "まじ、めっちゃ心強いわそれ。", sender: "me", time: "2025年02月20日午後07時27分" },
{ text: "いつでも言ってね", sender: "other", time: "2025年02月20日午後07時33分" },
{ text: "何で知ってるん？", sender: "me", time: "2025年02月21日午後10時19分" },
{ text: "お母さんの友達なの", sender: "other", time: "2025年02月21日午後10時26分" },
{ text: "そーなんや〜！お母さんの友達霊媒師なんおもろいな笑", sender: "me", time: "2025年02月22日午後08時50分" },
{ text: "ねw", sender: "other", time: "2025年02月22日午後08時58分" },
{ text: "おはよ〜☀️今日も動画みれなそう。今日も１日頑張ろうね", sender: "other", time: "2025年02月23日午前06時42分" },
{ text: "大学忙しいんやなー", sender: "me", time: "2025年02月24日午後09時56分" },
{ text: "そーなの、今アプリ作ってて", sender: "other", time: "2025年02月24日午後10時03分" },
{ text: "え〜すごいやん！どんなアプリ？", sender: "me", time: "2025年02月25日午後07時13分" },
{ text: "５人1班でアプリ作って一番実際にリリースしてみるって授業で", sender: "other", time: "2025年02月25日午後07時21分" },
{ text: "めっちゃ面白そう", sender: "me", time: "2025年02月26日午後10時27分" },
{ text: "そー面白いけど私リーダーにされちゃって最悪なの", sender: "other", time: "2025年02月26日午後10時34分" },
{ text: "そーなんやそれは忙しそうやな", sender: "me", time: "2025年02月27日午後06時48分" },
{ text: "そうなの。でももうすぐ終わりそうだから頑張る！", sender: "other", time: "2025年02月27日午後06時57分" },
{ text: "頑張って！めっちゃ応援してる", sender: "me", time: "2025年02月28日午後09時33分" },
{ text: "嬉しい〜😭", sender: "other", time: "2025年02月28日午後09時41分" },
{ text: "おはよ〜！今日も頑張ろうね〜", sender: "other", time: "2025年03月01日午後07時28分" },
{ text: "おはよう！頑張ろ", sender: "me", time: "2025年03月01日午前07時28分" },
{ text: "え、びっくりした。こんな早く返してくれたの初めてかも。めっちゃ嬉しい泣きそう😭", sender: "other", time: "2025年03月01日午前07時36分" },
{ text: "確かに笑ごめんないつも遅くて", sender: "me", time: "2025年03月01日午後10時19分" },
{ text: "全然大丈夫だよ！返してくれるだけで幸せなの", sender: "other", time: "2025年03月03日午後10時28分" },
{ text: "やばい！めっちゃバズってるよ！！", sender: "other", time: "2025年03月04日午後08時50分", image: "/picture3.png" },
{ text: "マジで！やばい！", sender: "me", time: "2025年03月04日午後09時05分" },
{ text: "やっとだね！私もめちゃくちゃ嬉しい", sender: "other", time: "2025年03月04日午後08時50分" },
{ text: "おはよ〜！昨日嬉しすぎて寝れなかったﾈﾑｲ", sender: "other", time: "2025年03月05日午前08時50分" },
{ text: "おはよ〜。すごい忙しそうだね（汗）。無理せず頑張ってね！", sender: "other", time: "2025年03月08日午前08時02分" },
{ text: "おはよ〜。暇な時でも返してくれたら嬉しいなー。", sender: "other", time: "2025年03月15日午前07時34分" },
{ text: "", sender: "other", time: "2025年04月20日午前07時02分" , image: "/ristcut4.jpg"},
{ text: "", sender: "other", time: "2025年04月23日午前08時02分" , image: "/ristcut5.jpg"},
{ text: "", sender: "other", time: "2025年04月25日午前08時02分" , image: "/ristcut2.jpg"},
{ text: "", sender: "other", time: "2025年04月25日午前08時02分" , image: "/ristcut3.jpg"},
{ text: "", sender: "other", time: "2025年05月02日午前08時02分" , image: "/ristcut5.jpg"},
{ text: "", sender: "other", time: "2025年05月05日午前08時02分" , image: "/ristcut1.jpg"},
{ text: "", sender: "other", time: "2025年05月08日午前08時02分" , image: "/ristcut2.jpg"},
{ text: "", sender: "other", time: "2025年06月25日午前08時02分" , image: "/ristcut4.jpg"},
{ text: "", sender: "other", time: "2025年07月28日午前08時02分" , image: "/ristcut3.jpg"},
{ text: "", sender: "other", time: "2025年07月30日午前08時02分" , image: "/ristcut1.jpg"},
//{ text: "今日の動画面白すぎたw過去１かも", sender: "other", time: "午後09時25分" },
  ]);

  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("えみ");
  const [isMeView, setIsMeView] = useState(true);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const toggleName = () => {
    setDisplayName((prev) => (prev === "えみ" ? "いんと" : "えみ"));
    setIsMeView((prev) => !prev);
  };

  const getDisplaySender = (sender: string) => {
    if (!isMeView) {
      return sender === "me" ? "other" : "me";
    }
    return sender;
  };

  // 現在時刻を日本語形式で取得（固定）
  const getCurrentTime = () => "午後9時26分";

  // === メッセージ送信 ===
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasText = !!input.trim();
    const hasImage = !!selectedImage;

    if (!hasText && !hasImage) return; // 両方空なら送信しない

    const lastSender = messages[messages.length - 1]?.sender;
    const nextSender = lastSender === "me" ? "other" : "me";

    const newMessage = {
      text: hasText ? input : "",
      image: hasImage ? selectedImage : undefined,
      sender: nextSender,
      time: getCurrentTime(),
    };

    // 即時反映
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setSelectedImage(null);

    // Supabaseに送信
    const { error } = await supabase.from("messages").insert([
      {
        text: newMessage.text,
        sender: newMessage.sender,
        time: newMessage.time,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("挿入エラー:", error.message);
      alert("送信に失敗しました");
    }
  };

  // スクロールを常に最新に
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📡 Realtime購読（Broadcast方式）
  useEffect(() => {
    const changes = supabase
      .channel(`topic:messages`, { config: { private: true } })
      .on("broadcast", { event: "INSERT" }, (payload) => {
        console.log("📨 Broadcastイベント受信:", payload);
        const rec = payload.payload?.record ?? payload.record;
        if (!rec) return;

        const newMessage = {
          text: rec.text ?? "",
          image: rec.image ?? undefined,
          sender: rec.sender ?? "other",
          time: rec.time ?? "",
        };

        setMessages((curr) => {
          const exists = curr.some(
            (m) => m.text === newMessage.text && m.time === newMessage.time
          );
          return exists ? curr : [...curr, newMessage];
        });
      })
      .subscribe((status) => {
        console.log("🔗 チャンネル状態:", status);
      });

    return () => {
      supabase.removeChannel(changes);
    };
  }, []);

  // === 画像選択ハンドラ ===
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dmArea}>
        {/* 固定ヘッダー */}
        <div className={styles.fixedHeader}>
          <ArrowLeft size={20} className={styles.headerIconLeft} />
          <div
            className={styles.headerTitle}
            onClick={toggleName}
            style={{ cursor: "pointer" }}
          >
            {displayName}
          </div>
          <Info size={20} className={styles.headerIconRight} />
        </div>

        {/* スクロールエリア */}
        <div className={styles.scrollArea}>
          {/* プロフィール */}
          <div className={styles.profileSection}>
            <img src="/usericon.png" alt="えみ" className={styles.profileIcon} />
            <div className={styles.profileName}>えみ</div>
            <div className={styles.profileId}>Emiiiii0811さん</div>
            <div className={styles.profileBio}>好き：ホラー映画/いんとチャンネル</div>
            <div className={styles.profileJoin}>2022年8月入社・61人のフォロワー</div>
            <div className={styles.profileFollow}>
              あなたがフォローしている人は誰もフォローしていません
            </div>
          </div>

          <hr className={styles.divider} />

          {/* チャット本文 */}
          <div className={styles.chatArea}>
            {messages.map((m, i) => {
              const viewSender = getDisplaySender(m.sender);
              return (
                <div
                  key={i}
                  className={`${styles.message} ${
                    viewSender === "me" ? styles.right : styles.left
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="添付画像"
                      className={styles.messageImage}
                    />
                  )}
                  {m.text && <p className={styles.bubble}>{m.text}</p>}
                  {m.time && <span className={styles.time}>{m.time}</span>}
                </div>
              );
            })}
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        {/* 入力欄 */}
        <form onSubmit={sendMessage} className={styles.inputBar}>
          <label htmlFor="imageInput">
            <ImageIcon size={20} style={{ cursor: "pointer", marginRight: 8 }} />
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />

          <input
            type="text"
            placeholder="新しいメッセージを開始する"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <Send size={18} />
          </button>
        </form>

        {/* 画像プレビュー */}
        {selectedImage && (
          <div className={styles.previewWrapper}>
            <img src={selectedImage} alt="プレビュー" className={styles.previewImage} />
            <button
              className={styles.removePreview}
              onClick={() => setSelectedImage(null)}
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
