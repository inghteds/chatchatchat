"use client";
import { useEffect, useState, useRef } from "react"; 
import { Send, ArrowLeft, Info } from "lucide-react"; // ←とiマークを追加
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
      image: "/picture1.JPG", // ← ここで画像を指定！
    },
    { text: "嬉しい〜☺️", sender: "other", time: "2024年09月03日午前9時32分" },
    { text: "100万人行くまでぜったい応援し続けるね", sender: "other", time: "2024年09月03日午前9時40分" },
    { text: "まだ1000人しかおらんけど絶対1000倍にするから着いてきてな！", sender: "me", time: "2024年09月03日午前10時05分" },
    { text: "あと100万人行っても応援してや笑", sender: "me", time: "2024年09月03日午前10時05分" },
    { text: "あ、ごめんwそういうつもりじゃなかったのw", sender: "other", time: "2024年09月03日午前10時07分" },
    { text: "死ぬまで応援する！", sender: "other", time: "2024年09月03日午前10時07分" },
    { text: "電車の話面白すぎるwご飯吹き出しちゃった", sender: "other", time: "2024年09月04日午後09時30分" },
    { text: "良かったぁー。友達全然笑ってくれへんかったからめっちゃ心配やったねん。おもろいよな笑", sender: "me", time: "2024年09月05日午前12時02分" },
    { text: "あれ笑わない友達すごいw絶対耐えれない😂", sender: "other", time: "2024年09月05日午後12時10分" },
    { text: "今日も動画あげてくれてありがとう〜。疲れ吹き飛んだ🌬️", sender: "other", time: "2024年09月05日午後09時10分" },
    { text: "頑張りすぎんと休みやー", sender: "me", time: "2024年09月05日午後10時10分" },
    { text: "ありがとう！優しい😭", sender: "other", time: "2024年09月05日午後10時12分" },
    { text: "何の仕事してるん？", sender: "me", time: "2024年09月05日午前12時23分" },
    { text: "大学生！🏫", sender: "other", time: "2024年09月05日午前12時25分" },
    { text: "ヘー！何やってるん？", sender: "me", time: "2024年09月06日午後09時54分" },
    { text: "IT系〜！", sender: "other", time: "2024年09月06日午後09時57分" },
    { text: "すご！天才やん", sender: "me", time: "2024年09月07日午後9時08分" },
    { text: "全然だよw", sender: "other", time: "2024年09月07日午後9時10分" },
    { text: "おはよー☀️", sender: "other", time: "2024年09月08日午前9時05分" },
    { text: "おはよー！", sender: "me", time: "2024年09月08日午前11時20分" },
    { text: "急だけどホラー映画好き？？", sender: "other", time: "2024年09月08日午後11時30分" },
    { text: "好きやでー友達とよく見にいく", sender: "me", time: "2024年09月09日午後09時20分" },
    { text: "え、嬉しい！何が好き？？", sender: "other", time: "2024年09月09日午後09時32分" },
    { text: "ノロイめっちゃ面白かった", sender: "me", time: "2024年09月10日午後08時45分" },
    { text: "めっちゃ好き！POVの頂点だよねあれは", sender: "other", time: "2024年09月10日午後08時50分" },
    { text: "", sender: "me", time: "2024年09月11日午後06時42分" },
{ text: "", sender: "other", time: "2024年09月11日午後06時48分" },
{ text: "", sender: "me", time: "2024年09月12日午後09時27分" },
{ text: "", sender: "other", time: "2024年09月12日午後09時32分" },
{ text: "", sender: "me", time: "2024年09月13日午後07時15分" },
{ text: "", sender: "other", time: "2024年09月13日午後07時21分" },
{ text: "", sender: "me", time: "2024年09月14日午後10時03分" },
{ text: "", sender: "other", time: "2024年09月14日午後10時11分" },
{ text: "", sender: "me", time: "2024年09月15日午後05時58分" },
{ text: "", sender: "other", time: "2024年09月15日午後06時06分" },
{ text: "", sender: "me", time: "2024年09月16日午後08時44分" },
{ text: "", sender: "other", time: "2024年09月16日午後08時50分" },
{ text: "", sender: "me", time: "2024年09月17日午後10時12分" },
{ text: "", sender: "other", time: "2024年09月17日午後10時17分" },
{ text: "", sender: "me", time: "2024年09月18日午後07時09分" },
{ text: "", sender: "other", time: "2024年09月18日午後07時18分" },
{ text: "", sender: "me", time: "2024年09月19日午後09時53分" },
{ text: "", sender: "other", time: "2024年09月19日午後10時00分" },
{ text: "", sender: "me", time: "2024年09月20日午後06時27分" },
{ text: "", sender: "other", time: "2024年09月20日午後06時33分" },
{ text: "", sender: "me", time: "2024年09月21日午後08時39分" },
{ text: "", sender: "other", time: "2024年09月21日午後08時49分" },
{ text: "", sender: "me", time: "2024年09月22日午後05時55分" },
{ text: "", sender: "other", time: "2024年09月22日午後06時01分" },
{ text: "", sender: "me", time: "2024年09月23日午後10時22分" },
{ text: "", sender: "other", time: "2024年09月23日午後10時30分" },
{ text: "", sender: "me", time: "2024年09月24日午後07時34分" },
{ text: "", sender: "other", time: "2024年09月24日午後07時42分" },
{ text: "", sender: "me", time: "2024年09月25日午後09時05分" },
{ text: "", sender: "other", time: "2024年09月25日午後09時11分" },
{ text: "", sender: "me", time: "2024年09月26日午後06時18分" },
{ text: "", sender: "other", time: "2024年09月26日午後06時24分" },
{ text: "", sender: "me", time: "2024年09月27日午後10時41分" },
{ text: "", sender: "other", time: "2024年09月27日午後10時46分" },
{ text: "", sender: "me", time: "2024年09月28日午後07時28分" },
{ text: "", sender: "other", time: "2024年09月28日午後07時34分" },
{ text: "", sender: "me", time: "2024年09月29日午後08時56分" },
{ text: "", sender: "other", time: "2024年09月29日午後09時04分" },
{ text: "", sender: "me", time: "2024年09月30日午後06時50分" },
{ text: "", sender: "other", time: "2024年09月30日午後06時58分" },
{ text: "", sender: "me", time: "2024年10月01日午後09時42分" },
{ text: "", sender: "other", time: "2024年10月01日午後09時51分" },
{ text: "", sender: "me", time: "2024年10月02日午後06時28分" },
{ text: "", sender: "other", time: "2024年10月02日午後06時34分" },
{ text: "", sender: "me", time: "2024年10月03日午後08時17分" },
{ text: "", sender: "other", time: "2024年10月03日午後08時26分" },
{ text: "", sender: "me", time: "2024年10月04日午後10時05分" },
{ text: "", sender: "other", time: "2024年10月04日午後10時10分" },
{ text: "", sender: "me", time: "2024年10月05日午後07時44分" },
{ text: "", sender: "other", time: "2024年10月05日午後07時51分" },
{ text: "", sender: "me", time: "2024年10月06日午後09時18分" },
{ text: "", sender: "other", time: "2024年10月06日午後09時26分" },
{ text: "", sender: "me", time: "2024年10月07日午後05時57分" },
{ text: "", sender: "other", time: "2024年10月07日午後06時06分" },
{ text: "", sender: "me", time: "2024年10月08日午後10時21分" },
{ text: "", sender: "other", time: "2024年10月08日午後10時29分" },
{ text: "", sender: "me", time: "2024年10月09日午後08時11分" },
{ text: "", sender: "other", time: "2024年10月09日午後08時20分" },
{ text: "", sender: "me", time: "2024年10月10日午後09時34分" },
{ text: "", sender: "other", time: "2024年10月10日午後09時43分" },
{ text: "", sender: "me", time: "2024年10月11日午後06時39分" },
{ text: "", sender: "other", time: "2024年10月11日午後06時48分" },
{ text: "", sender: "me", time: "2024年10月12日午後07時22分" },
{ text: "", sender: "other", time: "2024年10月12日午後07時30分" },
{ text: "", sender: "me", time: "2024年10月13日午後10時14分" },
{ text: "", sender: "other", time: "2024年10月13日午後10時23分" },
{ text: "", sender: "me", time: "2024年10月14日午後08時05分" },
{ text: "", sender: "other", time: "2024年10月14日午後08時11分" },
{ text: "", sender: "me", time: "2024年10月15日午後09時48分" },
{ text: "", sender: "other", time: "2024年10月15日午後09時57分" },
{ text: "", sender: "me", time: "2024年10月16日午後07時31分" },
{ text: "", sender: "other", time: "2024年10月16日午後07時40分" },
{ text: "", sender: "me", time: "2024年10月17日午後10時08分" },
{ text: "", sender: "other", time: "2024年10月17日午後10時15分" },
{ text: "", sender: "me", time: "2024年10月18日午後06時44分" },
{ text: "", sender: "other", time: "2024年10月18日午後06時51分" },
{ text: "", sender: "me", time: "2024年10月19日午後09時12分" },
{ text: "", sender: "other", time: "2024年10月19日午後09時21分" },
{ text: "", sender: "me", time: "2024年10月20日午後07時27分" },
{ text: "", sender: "other", time: "2024年10月20日午後07時33分" },
{ text: "", sender: "me", time: "2024年10月21日午後10時19分" },
{ text: "", sender: "other", time: "2024年10月21日午後10時26分" },
{ text: "", sender: "me", time: "2024年10月22日午後08時50分" },
{ text: "", sender: "other", time: "2024年10月22日午後08時58分" },
{ text: "", sender: "me", time: "2024年10月23日午後06時36分" },
{ text: "", sender: "other", time: "2024年10月23日午後06時42分" },
{ text: "", sender: "me", time: "2024年10月24日午後09時56分" },
{ text: "", sender: "other", time: "2024年10月24日午後10時03分" },
{ text: "", sender: "me", time: "2024年10月25日午後07時13分" },
{ text: "", sender: "other", time: "2024年10月25日午後07時21分" },
{ text: "", sender: "me", time: "2024年10月26日午後10時27分" },
{ text: "", sender: "other", time: "2024年10月26日午後10時34分" },
{ text: "", sender: "me", time: "2024年10月27日午後06時48分" },
{ text: "", sender: "other", time: "2024年10月27日午後06時57分" },
{ text: "", sender: "me", time: "2024年10月28日午後09時33分" },
{ text: "", sender: "other", time: "2024年10月28日午後09時41分" },
{ text: "", sender: "me", time: "2024年10月29日午後08時09分" },
{ text: "", sender: "other", time: "2024年10月29日午後08時16分" },
{ text: "", sender: "me", time: "2024年10月30日午後10時04分" },
{ text: "", sender: "other", time: "2024年10月30日午後10時10分" },
{ text: "", sender: "me", time: "2024年10月31日午後07時26分" },
{ text: "", sender: "other", time: "2024年10月31日午後07時33分" },
{ text: "", sender: "me", time: "2024年11月01日午後09時11分" },
{ text: "", sender: "other", time: "2024年11月01日午後09時18分" },
{ text: "", sender: "me", time: "2024年11月02日午後06時43分" },
{ text: "", sender: "other", time: "2024年11月02日午後06時51分" },
{ text: "", sender: "me", time: "2024年11月03日午後10時27分" },
{ text: "", sender: "other", time: "2024年11月03日午後10時35分" },
{ text: "", sender: "me", time: "2024年11月04日午後07時29分" },
{ text: "", sender: "other", time: "2024年11月04日午後07時37分" },
{ text: "", sender: "me", time: "2024年11月05日午後09時52分" },
{ text: "", sender: "other", time: "2024年11月05日午後10時00分" },
{ text: "", sender: "me", time: "2024年11月06日午後06時24分" },
{ text: "", sender: "other", time: "2024年11月06日午後06時33分" },
{ text: "", sender: "me", time: "2024年11月07日午後08時46分" },
{ text: "", sender: "other", time: "2024年11月07日午後08時52分" },
{ text: "", sender: "me", time: "2024年11月08日午後10時15分" },
{ text: "", sender: "other", time: "2024年11月08日午後10時22分" },
{ text: "", sender: "me", time: "2024年11月09日午後07時18分" },
{ text: "", sender: "other", time: "2024年11月09日午後07時27分" },
{ text: "", sender: "me", time: "2024年11月10日午後09時05分" },
{ text: "", sender: "other", time: "2024年11月10日午後09時14分" },
{ text: "", sender: "me", time: "2024年11月11日午後05時56分" },
{ text: "", sender: "other", time: "2024年11月11日午後06時03分" },
{ text: "", sender: "me", time: "2024年11月12日午後10時23分" },
{ text: "", sender: "other", time: "2024年11月12日午後10時30分" },
{ text: "", sender: "me", time: "2024年11月13日午後08時10分" },
{ text: "", sender: "other", time: "2024年11月13日午後08時18分" },
{ text: "", sender: "me", time: "2024年11月14日午後09時44分" },
{ text: "", sender: "other", time: "2024年11月14日午後09時51分" },
{ text: "", sender: "me", time: "2024年11月15日午後06時40分" },
{ text: "", sender: "other", time: "2024年11月15日午後06時46分" },
{ text: "", sender: "me", time: "2024年11月16日午後07時59分" },
{ text: "", sender: "other", time: "2024年11月16日午後08時06分" },
{ text: "", sender: "me", time: "2024年11月17日午後10時19分" },
{ text: "", sender: "other", time: "2024年11月17日午後10時28分" },
{ text: "", sender: "me", time: "2024年11月18日午後07時27分" },
{ text: "", sender: "other", time: "2024年11月18日午後07時34分" },
{ text: "", sender: "me", time: "2024年11月19日午後09時38分" },
{ text: "", sender: "other", time: "2024年11月19日午後09時44分" },
{ text: "", sender: "me", time: "2024年11月20日午後06時31分" },
{ text: "", sender: "other", time: "2024年11月20日午後06時40分" },
{ text: "", sender: "me", time: "2024年11月21日午後08時13分" },
{ text: "", sender: "other", time: "2024年11月21日午後08時21分" },
{ text: "", sender: "me", time: "2024年11月22日午後10時09分" },
{ text: "", sender: "other", time: "2024年11月22日午後10時16分" },
{ text: "", sender: "me", time: "2024年11月23日午後07時22分" },
{ text: "", sender: "other", time: "2024年11月23日午後07時28分" },
{ text: "", sender: "me", time: "2024年11月24日午後09時17分" },
{ text: "", sender: "other", time: "2024年11月24日午後09時25分" },
{ text: "", sender: "me", time: "2024年11月25日午後06時45分" },
{ text: "", sender: "other", time: "2024年11月25日午後06時54分" },
{ text: "", sender: "me", time: "2024年11月26日午後08時59分" },
{ text: "", sender: "other", time: "2024年11月26日午後09時08分" },
{ text: "", sender: "me", time: "2024年11月27日午後10時24分" },
{ text: "", sender: "other", time: "2024年11月27日午後10時33分" },
{ text: "", sender: "me", time: "2024年11月28日午後07時31分" },
{ text: "", sender: "other", time: "2024年11月28日午後07時38分" },
{ text: "", sender: "me", time: "2024年11月29日午後09時42分" },
{ text: "", sender: "other", time: "2024年11月29日午後09時49分" },
{ text: "", sender: "me", time: "2024年11月30日午後08時18分" },
{ text: "", sender: "other", time: "2024年11月30日午後08時26分" },
{ text: "", sender: "me", time: "2024年12月01日午後07時46分" },
{ text: "", sender: "other", time: "2024年12月01日午後07時53分" },
{ text: "", sender: "me", time: "2024年12月02日午後09時28分" },
{ text: "", sender: "other", time: "2024年12月02日午後09時37分" },
{ text: "", sender: "me", time: "2024年12月03日午後06時19分" },
{ text: "", sender: "other", time: "2024年12月03日午後06時28分" },
{ text: "", sender: "me", time: "2024年12月04日午後08時55分" },
{ text: "", sender: "other", time: "2024年12月04日午後09時02分" },
{ text: "", sender: "me", time: "2024年12月05日午後10時10分" },
{ text: "", sender: "other", time: "2024年12月05日午後10時18分" },
{ text: "", sender: "me", time: "2024年12月06日午後07時23分" },
{ text: "", sender: "other", time: "2024年12月06日午後07時32分" },
{ text: "", sender: "me", time: "2024年12月07日午後09時39分" },
{ text: "", sender: "other", time: "2024年12月07日午後09時46分" },
{ text: "", sender: "me", time: "2024年12月08日午後05時57分" },
{ text: "", sender: "other", time: "2024年12月08日午後06時06分" },
{ text: "", sender: "me", time: "2024年12月09日午後10時21分" },
{ text: "", sender: "other", time: "2024年12月09日午後10時30分" },
{ text: "", sender: "me", time: "2024年12月10日午後08時12分" },
{ text: "", sender: "other", time: "2024年12月10日午後08時18分" },
{ text: "", sender: "me", time: "2024年12月11日午後09時48分" },
{ text: "", sender: "other", time: "2024年12月11日午後09時57分" },
{ text: "", sender: "me", time: "2024年12月12日午後06時44分" },
{ text: "", sender: "other", time: "2024年12月12日午後06時52分" },
{ text: "", sender: "me", time: "2024年12月13日午後07時59分" },
{ text: "", sender: "other", time: "2024年12月13日午後08時06分" },
{ text: "", sender: "me", time: "2024年12月14日午後10時17分" },
{ text: "", sender: "other", time: "2024年12月14日午後10時24分" },
{ text: "", sender: "me", time: "2024年12月15日午後07時25分" },
{ text: "", sender: "other", time: "2024年12月15日午後07時32分" },
{ text: "", sender: "me", time: "2024年12月16日午後09時33分" },
{ text: "", sender: "other", time: "2024年12月16日午後09時41分" },
{ text: "", sender: "me", time: "2024年12月17日午後08時10分" },
{ text: "", sender: "other", time: "2024年12月17日午後08時17分" },
{ text: "", sender: "me", time: "2024年12月18日午後10時09分" },
{ text: "", sender: "other", time: "2024年12月18日午後10時18分" },
{ text: "", sender: "me", time: "2024年12月19日午後06時37分" },
{ text: "", sender: "other", time: "2024年12月19日午後06時45分" },
{ text: "", sender: "me", time: "2024年12月20日午後08時58分" },
{ text: "", sender: "other", time: "2024年12月20日午後09時07分" },
{ text: "", sender: "me", time: "2024年12月21日午後10時26分" },
{ text: "", sender: "other", time: "2024年12月21日午後10時34分" },
{ text: "", sender: "me", time: "2024年12月22日午後07時30分" },
{ text: "", sender: "other", time: "2024年12月22日午後07時37分" },
{ text: "", sender: "me", time: "2024年12月23日午後09時46分" },
{ text: "", sender: "other", time: "2024年12月23日午後09時55分" },
{ text: "", sender: "me", time: "2024年12月24日午後06時23分" },
{ text: "", sender: "other", time: "2024年12月24日午後06時29分" },
{ text: "", sender: "me", time: "2024年12月25日午後08時42分" },
{ text: "", sender: "other", time: "2024年12月25日午後08時51分" },
{ text: "", sender: "me", time: "2024年12月26日午後10時11分" },
{ text: "", sender: "other", time: "2024年12月26日午後10時17分" },
{ text: "", sender: "me", time: "2024年12月27日午後07時12分" },
{ text: "", sender: "other", time: "2024年12月27日午後07時21分" },
{ text: "", sender: "me", time: "2024年12月28日午後09時34分" },
{ text: "", sender: "other", time: "2024年12月28日午後09時43分" },
{ text: "", sender: "me", time: "2024年12月29日午後06時51分" },
{ text: "", sender: "other", time: "2024年12月29日午後06時59分" },
{ text: "", sender: "me", time: "2024年12月30日午後08時25分" },
{ text: "", sender: "other", time: "2024年12月30日午後08時32分" },
{ text: "", sender: "me", time: "2024年12月31日午後10時04分" },
{ text: "", sender: "other", time: "2024年12月31日午後10時13分" },
{ text: "", sender: "me", time: "2025年01月01日午後09時18分" },
{ text: "", sender: "other", time: "2025年01月01日午後09時27分" },
{ text: "", sender: "me", time: "2025年01月02日午後06時44分" },
{ text: "", sender: "other", time: "2025年01月02日午後06時52分" },
{ text: "", sender: "me", time: "2025年01月03日午後10時11分" },
{ text: "", sender: "other", time: "2025年01月03日午後10時19分" },
{ text: "", sender: "me", time: "2025年01月04日午後07時09分" },
{ text: "", sender: "other", time: "2025年01月04日午後07時17分" },
{ text: "", sender: "me", time: "2025年01月05日午後09時35分" },
{ text: "", sender: "other", time: "2025年01月05日午後09時44分" },
{ text: "", sender: "me", time: "2025年01月06日午後08時23分" },
{ text: "", sender: "other", time: "2025年01月06日午後08時32分" },
{ text: "", sender: "me", time: "2025年01月07日午後10時02分" },
{ text: "", sender: "other", time: "2025年01月07日午後10時09分" },
{ text: "", sender: "me", time: "2025年01月08日午後06時36分" },
{ text: "", sender: "other", time: "2025年01月08日午後06時44分" },
{ text: "", sender: "me", time: "2025年01月09日午後09時51分" },
{ text: "", sender: "other", time: "2025年01月09日午後09時58分" },
{ text: "", sender: "me", time: "2025年01月10日午後07時12分" },
{ text: "", sender: "other", time: "2025年01月10日午後07時19分" },
{ text: "", sender: "me", time: "2025年01月11日午後10時27分" },
{ text: "", sender: "other", time: "2025年01月11日午後10時34分" },
{ text: "", sender: "me", time: "2025年01月12日午後08時41分" },
{ text: "", sender: "other", time: "2025年01月12日午後08時47分" },
{ text: "", sender: "me", time: "2025年01月13日午後05時59分" },
{ text: "", sender: "other", time: "2025年01月13日午後06時07分" },
{ text: "", sender: "me", time: "2025年01月14日午後09時38分" },
{ text: "", sender: "other", time: "2025年01月14日午後09時46分" },
{ text: "", sender: "me", time: "2025年01月15日午後06時52分" },
{ text: "", sender: "other", time: "2025年01月15日午後07時01分" },
{ text: "", sender: "me", time: "2025年01月16日午後08時29分" },
{ text: "", sender: "other", time: "2025年01月16日午後08時38分" },
{ text: "", sender: "me", time: "2025年01月17日午後10時18分" },
{ text: "", sender: "other", time: "2025年01月17日午後10時27分" },
{ text: "", sender: "me", time: "2025年01月18日午後07時16分" },
{ text: "", sender: "other", time: "2025年01月18日午後07時23分" },
{ text: "", sender: "me", time: "2025年01月19日午後09時54分" },
{ text: "", sender: "other", time: "2025年01月19日午後10時02分" },
{ text: "", sender: "me", time: "2025年01月20日午後06時25分" },
{ text: "", sender: "other", time: "2025年01月20日午後06時33分" },
{ text: "", sender: "me", time: "2025年01月21日午後08時46分" },
{ text: "", sender: "other", time: "2025年01月21日午後08時54分" },
{ text: "", sender: "me", time: "2025年01月22日午後10時14分" },
{ text: "", sender: "other", time: "2025年01月22日午後10時22分" },
{ text: "", sender: "me", time: "2025年01月23日午後07時33分" },
{ text: "", sender: "other", time: "2025年01月23日午後07時42分" },
{ text: "", sender: "me", time: "2025年01月24日午後09時05分" },
{ text: "", sender: "other", time: "2025年01月24日午後09時14分" },
{ text: "", sender: "me", time: "2025年01月25日午後06時48分" },
{ text: "", sender: "other", time: "2025年01月25日午後06時55分" },
{ text: "", sender: "me", time: "2025年01月26日午後10時11分" },
{ text: "", sender: "other", time: "2025年01月26日午後10時19分" },
{ text: "", sender: "me", time: "2025年01月27日午後07時26分" },
{ text: "", sender: "other", time: "2025年01月27日午後07時33分" },
{ text: "", sender: "me", time: "2025年01月28日午後09時43分" },
{ text: "", sender: "other", time: "2025年01月28日午後09時52分" },
{ text: "", sender: "me", time: "2025年01月29日午後06時21分" },
{ text: "", sender: "other", time: "2025年01月29日午後06時30分" },
{ text: "", sender: "me", time: "2025年01月30日午後08時58分" },
{ text: "", sender: "other", time: "2025年01月30日午後09時07分" },
{ text: "", sender: "me", time: "2025年01月31日午後10時25分" },
{ text: "", sender: "other", time: "2025年01月31日午後10時32分" },
{ text: "", sender: "me", time: "2025年02月01日午後09時13分" },
{ text: "", sender: "other", time: "2025年02月01日午後09時20分" },
{ text: "", sender: "me", time: "2025年02月02日午後06時39分" },
{ text: "", sender: "other", time: "2025年02月02日午後06時46分" },
{ text: "", sender: "me", time: "2025年02月03日午後10時17分" },
{ text: "", sender: "other", time: "2025年02月03日午後10時26分" },
{ text: "", sender: "me", time: "2025年02月04日午後07時21分" },
{ text: "", sender: "other", time: "2025年02月04日午後07時30分" },
{ text: "", sender: "me", time: "2025年02月05日午後09時54分" },
{ text: "", sender: "other", time: "2025年02月05日午後10時02分" },
{ text: "", sender: "me", time: "2025年02月06日午後06時48分" },
{ text: "", sender: "other", time: "2025年02月06日午後06時55分" },
{ text: "", sender: "me", time: "2025年02月07日午後08時31分" },
{ text: "", sender: "other", time: "2025年02月07日午後08時37分" },
{ text: "", sender: "me", time: "2025年02月08日午後10時25分" },
{ text: "", sender: "other", time: "2025年02月08日午後10時33分" },
{ text: "", sender: "me", time: "2025年02月09日午後07時15分" },
{ text: "", sender: "other", time: "2025年02月09日午後07時23分" },
{ text: "", sender: "me", time: "2025年02月10日午後09時41分" },
{ text: "", sender: "other", time: "2025年02月10日午後09時49分" },
{ text: "", sender: "me", time: "2025年02月11日午後06時23分" },
{ text: "", sender: "other", time: "2025年02月11日午後06時32分" },
{ text: "", sender: "me", time: "2025年02月12日午後08時59分" },
{ text: "", sender: "other", time: "2025年02月12日午後09時06分" },
{ text: "", sender: "me", time: "2025年02月13日午後10時14分" },
{ text: "", sender: "other", time: "2025年02月13日午後10時22分" },
{ text: "", sender: "me", time: "2025年02月14日午後07時44分" },
{ text: "", sender: "other", time: "2025年02月14日午後07時51分" },
{ text: "", sender: "me", time: "2025年02月15日午後09時16分" },
{ text: "", sender: "other", time: "2025年02月15日午後09時23分" },
{ text: "", sender: "me", time: "2025年02月16日午後06時41分" },
{ text: "", sender: "other", time: "2025年02月16日午後06時48分" },
{ text: "", sender: "me", time: "2025年02月17日午後10時07分" },
{ text: "", sender: "other", time: "2025年02月17日午後10時16分" },
{ text: "", sender: "me", time: "2025年02月18日午後08時18分" },
{ text: "", sender: "other", time: "2025年02月18日午後08時25分" },
{ text: "", sender: "me", time: "2025年02月19日午後09時57分" },
{ text: "", sender: "other", time: "2025年02月19日午後10時05分" },
{ text: "", sender: "me", time: "2025年02月20日午後07時29分" },
{ text: "", sender: "other", time: "2025年02月20日午後07時38分" },
{ text: "", sender: "me", time: "2025年02月21日午後10時22分" },
{ text: "", sender: "other", time: "2025年02月21日午後10時31分" },
{ text: "", sender: "me", time: "2025年02月22日午後06時35分" },
{ text: "", sender: "other", time: "2025年02月22日午後06時42分" },
{ text: "", sender: "me", time: "2025年02月23日午後09時13分" },
{ text: "", sender: "other", time: "2025年02月23日午後09時21分" },
{ text: "", sender: "me", time: "2025年02月24日午後07時03分" },
{ text: "", sender: "other", time: "2025年02月24日午後07時10分" },
{ text: "", sender: "me", time: "2025年02月25日午後09時38分" },
{ text: "", sender: "other", time: "2025年02月25日午後09時46分" },
{ text: "", sender: "me", time: "2025年02月26日午後06時55分" },
{ text: "", sender: "other", time: "2025年02月26日午後07時04分" },
{ text: "", sender: "me", time: "2025年02月27日午後08時43分" },
{ text: "", sender: "other", time: "2025年02月27日午後08時51分" },
{ text: "", sender: "me", time: "2025年02月28日午後10時15分" },
{ text: "", sender: "other", time: "2025年02月28日午後10時23分" },
{ text: "", sender: "me", time: "2025年03月01日午後09時06分" },
{ text: "", sender: "other", time: "2025年03月01日午後09時14分" },
{ text: "", sender: "me", time: "2025年03月02日午後07時28分" },
{ text: "", sender: "other", time: "2025年03月02日午後07時36分" },
{ text: "", sender: "me", time: "2025年03月03日午後10時19分" },
{ text: "", sender: "other", time: "2025年03月03日午後10時28分" },
{ text: "", sender: "me", time: "2025年03月04日午後08時42分" },
{ text: "", sender: "other", time: "2025年03月04日午後08時50分" },
{ text: "おはよ〜！昨日嬉しすぎて寝れなかったﾈﾑｲ", sender: "other", time: "2025年03月05日午前08時50分" },
{ text: "おはよ〜。すごい忙しそうだね（汗）。無理せず頑張ってね！", sender: "other", time: "2025年03月08日午前08時02分" },
{ text: "おはよ〜。暇な時でも返してくれたら嬉しいなー。", sender: "other", time: "2025年03月15日午前07時34分" },
{ text: "おはよ〜!", sender: "other", time: "2025年07月20日午前07時02分" , image: "/rist.png"},
{ text: "おはよ〜。", sender: "other", time: "2025年07月23日午前08時02分" , image: "/rist.png"},
{ text: "今日の動画面白すぎたw過去１かも", sender: "other", time: "2025年11月8日午後09時25分" },







  ]);
  const [input, setInput] = useState("");
  const [displayName, setDisplayName] = useState("えみ");
  const [isMeView, setIsMeView] = useState(true);

  const toggleName = () => {
    setDisplayName((prev) => (prev === "えみ" ? "いんと" : "えみ"));
    setIsMeView((prev) => !prev); // ← me / other の左右を反転
  };

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const getDisplaySender = (sender: string) => {
    if (!isMeView) {
      return sender === "me" ? "other" : "me";
    }
    return sender;
  };

// 現在時刻を日本語形式で取得（＋6時間）
// 現在時刻を日本語形式で取得（常に午後9時26分）
const getCurrentTime = () => {
  return "午後9時26分";
};



  // === フォーム送信でメッセージ送信 ===
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); // ← formのデフォルト動作を防ぐ
    if (!input.trim()) return;

      // 前回のsenderを見て、交互に切り替え
  const lastSender = messages[messages.length - 1]?.sender;
  const nextSender = lastSender === "me" ? "other" : "me";

    const newMessage = {
      text: input,
      sender: nextSender,
      time: getCurrentTime(),
    };

    // 画面上に即時反映
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Supabaseに挿入
    const { error } = await supabase.from("messages").insert([
      {
        text: input,
        sender: nextSender,
        time: getCurrentTime(),
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("挿入エラー:", error.message);
      alert("送信に失敗しました");
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

// 📡 Realtime購読（Broadcast方式＋ログ出力）
useEffect(() => {
    const changes = supabase
      .channel(`topic:messages`, { config: { private: true } })
      .on(
        "broadcast",
        { event: "INSERT" },
        (payload) => {
          console.log("📨 Broadcastイベント受信:", payload);

          const rec = payload.payload?.record ?? payload.record;
          if (!rec) {
            console.warn("⚠️ payloadにrecordが含まれていません:", payload);
            return;
          }

          // 新しいメッセージ生成
          const newMessage = {
            text: rec.text ?? "",
            sender: rec.sender ?? "other",
            time: rec.time ?? "",
            image: rec.image ?? undefined,
          };

          console.log("🆕 受信メッセージ:", newMessage);

          // 重複防止
          setMessages((curr) => {
            const exists = curr.some(
              (m) => m.text === newMessage.text && m.time === newMessage.time
            );
            if (exists) {
              console.log("⚙️ 重複メッセージのためスキップ:", newMessage.text);
              return curr;
            }
            console.log("✅ 新メッセージを追加:", newMessage.text);
            return [...curr, newMessage];
          });
        }
      )
      .subscribe((status) => {
        console.log("🔗 チャンネル状態:", status);
      });

}, [supabase]);



  return (
    <div className={styles.pageWrapper}>
      <div className={styles.dmArea}>
        {/* 固定ヘッダー */}
        <div className={styles.fixedHeader}>
          <ArrowLeft size={20} className={styles.headerIconLeft} />
            <div
            className={styles.headerTitle}
            onClick={toggleName}
            style={{ cursor: "pointer" }} // ←マウスカーソル変更でわかりやすく
          >
            {displayName}
          </div>
          <Info size={20} className={styles.headerIconRight} />
        </div>

        {/* スクロールエリア */}
        <div className={styles.scrollArea}>
          {/* プロフィール */}
          <div className={styles.profileSection}>
            <img
              src="/usericon.png"
              alt="えみ"
              className={styles.profileIcon}
            />
            <div className={styles.profileName}>えみ</div>
            <div className={styles.profileId}>Emiiiii0811さん</div>
            <div className={styles.profileBio}>
              好き：ホラー映画/いんとチャンネル
            </div>
            <div className={styles.profileJoin}>
              2022年8月入社・61人のフォロワー
            </div>
            <div className={styles.profileFollow}>
              あなたがフォローしている人は誰もフォローしていません
            </div>
          </div>

          <hr className={styles.divider} />

          {/* チャット本文 */}
          <div className={styles.chatArea}>
            {messages.map((m, i) => {
              // ★追加：me/otherを視点で反転
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
                  <p className={styles.bubble}>{m.text}</p>
                  {m.time && <span className={styles.time}>{m.time}</span>}
                </div>
              );
            })}
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        {/* 入力欄 */}
        <form onSubmit={sendMessage} className={styles.inputBar}>
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
      </div>
    </div>
  );
}