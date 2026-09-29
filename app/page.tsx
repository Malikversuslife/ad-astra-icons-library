"use client";
import { useMemo, useState } from "react";

type IconName = string;
type Item = { name: IconName; category: "Utility"|"Identity"|"Systems"|"Intelligence" };
const icons: Item[] = [
  {name:"Search",category:"Utility"},{name:"User",category:"Identity"},{name:"Cloud",category:"Systems"},{name:"AI Agent",category:"Intelligence"},
  {name:"Security",category:"Utility"},{name:"Upload",category:"Utility"},{name:"Message",category:"Identity"},{name:"Database",category:"Systems"},
  {name:"Settings",category:"Utility"},{name:"Location",category:"Utility"},{name:"Energy",category:"Systems"},{name:"Neural Network",category:"Intelligence"},
  {name:"Calendar",category:"Utility"},{name:"Camera",category:"Identity"},{name:"Wallet",category:"Utility"},{name:"Link",category:"Systems"},
  {name:"Heart",category:"Identity"},{name:"Star",category:"Utility"},{name:"Bell",category:"Utility"},{name:"Folder",category:"Systems"},
  {name:"Terminal",category:"Systems"},{name:"Globe",category:"Systems"},{name:"Chart",category:"Intelligence"},{name:"Layers",category:"Intelligence"},
  {name:"Arrow Up Right",category:"Utility"},{name:"Lock",category:"Utility"},{name:"Key",category:"Utility"},{name:"Send",category:"Utility"},
  {name:"Download",category:"Utility"},{name:"Trash",category:"Utility"},{name:"Edit",category:"Utility"},{name:"Play",category:"Identity"},
  {name:"Pause",category:"Identity"},{name:"Map",category:"Systems"},{name:"Compass",category:"Systems"},{name:"Wifi",category:"Systems"},
  {name:"Home",category:"Utility"},{name:"Menu",category:"Utility"},{name:"Filter",category:"Utility"},{name:"Eye",category:"Identity"},
  {name:"Plus",category:"Utility"},{name:"Minus",category:"Utility"},{name:"Check",category:"Utility"},{name:"Close",category:"Utility"},
  {name:"Share",category:"Systems"},{name:"Print",category:"Utility"},{name:"Bookmark",category:"Identity"},{name:"Clock",category:"Utility"},
  {name:"Mail",category:"Identity"},{name:"Phone",category:"Identity"},{name:"Video",category:"Identity"},{name:"Mic",category:"Identity"},
  {name:"Headphones",category:"Identity"},{name:"Image",category:"Identity"},{name:"File",category:"Systems"},{name:"Clipboard",category:"Systems"},
  {name:"Archive",category:"Systems"},{name:"Code",category:"Intelligence"},{name:"Brackets",category:"Intelligence"},{name:"Puzzle",category:"Intelligence"},
  {name:"Arrow Left",category:"Utility"},{name:"Arrow Right",category:"Utility"},{name:"Arrow Down",category:"Utility"},{name:"Refresh",category:"Utility"},
  {name:"Undo",category:"Utility"},{name:"Redo",category:"Utility"},{name:"Sliders",category:"Utility"},{name:"Grid",category:"Utility"},
  {name:"List",category:"Utility"},{name:"Sort",category:"Utility"},{name:"Info",category:"Utility"},{name:"Alert",category:"Utility"},
  {name:"Arrow Up",category:"Utility"},{name:"Chevrons",category:"Utility"},{name:"External Link",category:"Utility"},{name:"More",category:"Utility"},
  {name:"Help",category:"Utility"},{name:"Circle",category:"Utility"},{name:"Square",category:"Utility"},{name:"Triangle",category:"Utility"},
  {name:"Hexagon",category:"Utility"},{name:"Moon",category:"Identity"},{name:"Sun",category:"Identity"},{name:"Cloud Rain",category:"Systems"},
  {name:"Wind",category:"Systems"},{name:"Snow",category:"Systems"},{name:"Thermometer",category:"Systems"},{name:"Battery",category:"Systems"},
  {name:"Bluetooth",category:"Systems"},{name:"Monitor",category:"Systems"},{name:"Mobile",category:"Systems"},{name:"Tablet",category:"Systems"},
  {name:"Server",category:"Systems"},{name:"Hard Drive",category:"Systems"},{name:"CPU",category:"Intelligence"},{name:"Git Branch",category:"Intelligence"},
  {name:"Rocket",category:"Intelligence"},{name:"Flag",category:"Utility"},
  {name:"Shield Check",category:"Utility"},{name:"User Plus",category:"Identity"},{name:"Users",category:"Identity"},{name:"Contact",category:"Identity"},
  {name:"At Sign",category:"Identity"},{name:"Hashtag",category:"Identity"},{name:"Smile",category:"Identity"},{name:"Paperclip",category:"Utility"}
];
const categories = ["All","Utility","Identity","Systems","Intelligence"] as const;
const motionByName: Record<string, string> = {"Search":"scan","User":"breathe","Cloud":"drift","AI Agent":"pulse","Security":"guard","Upload":"rise","Message":"signal","Database":"cycle","Settings":"turn","Location":"ping","Energy":"charge","Neural Network":"synapse","Calendar":"cycle","Camera":"pulse","Wallet":"guard","Link":"scan","Heart":"breathe","Star":"pulse","Bell":"ping","Folder":"drift","Terminal":"scan","Globe":"turn","Chart":"rise","Layers":"drift","Arrow Up Right":"rise","Arrow Up":"rise","Lock":"guard","Key":"turn","Send":"rise","Download":"rise","Trash":"guard","Edit":"scan","Play":"pulse","Pause":"breathe","Map":"drift","Compass":"turn","Wifi":"signal","Home":"guard","Menu":"scan","Filter":"cycle","Eye":"pulse","Plus":"rise","Minus":"drift","Check":"guard","Close":"turn","Share":"signal","Print":"cycle","Bookmark":"breathe","Clock":"turn","Mail":"signal","Phone":"breathe","Video":"pulse","Mic":"pulse","Headphones":"breathe","Image":"drift","File":"cycle","Clipboard":"guard","Archive":"guard","Code":"scan","Brackets":"turn","Puzzle":"synapse"};

function Glyph({ name, large=false }: {name: IconName; large?: boolean}) {
 const s = large ? 174 : 66;
 const common = { fill:"none", stroke:"url(#metal)", strokeWidth:2.4, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
 const accent = { fill:"none", stroke:"url(#accent)", strokeWidth:2.3, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
 const paths: Record<IconName, React.ReactNode> = {
  Search:<><circle cx="45" cy="43" r="18" {...common}/><path d="m58 57 14 14" {...accent}/><circle cx="45" cy="43" r="26" stroke="#d9def0" strokeWidth=".7" fill="none"/></>,
  User:<><circle cx="45" cy="36" r="12" {...common}/><path d="M23 72c2-14 11-21 22-21s20 7 22 21" {...common}/><path d="M19 66c3-18 13-27 26-27s23 9 26 27" stroke="#ced5e8" strokeWidth=".8" fill="none"/></>,
  Cloud:<><path d="M25 68h41c11 0 16-7 16-15 0-9-7-16-16-16-2-13-19-18-28-7-13-3-22 7-20 19-8 2-11 8-9 13 2 4 6 6 16 6Z" {...common}/><path d="M30 59h36" {...accent}/></>,
  "AI Agent":<><path d="M29 31c6-10 26-10 32 0l7 12v20c-7 11-39 11-46 0V43l7-12Z" {...common}/><circle cx="36" cy="49" r="3" fill="#7c87ff"/><circle cx="54" cy="49" r="3" fill="#7c87ff"/><path d="M37 61h16" {...accent}/><path d="M45 20v8" {...accent}/></>,
  Security:<><path d="M45 18 70 28v18c0 17-11 27-25 34-14-7-25-17-25-34V28l25-10Z" {...common}/><path d="m34 49 8 8 16-18" {...accent}/></>,
  Upload:<><rect x="21" y="60" width="48" height="14" rx="5" {...common}/><path d="M45 58V25m0 0-12 12m12-12 12 12" {...accent}/></>,
  Message:<><path d="M20 26h50v34H43L29 72V60h-9V26Z" {...common}/><path d="M31 42h28m-28 8h19" {...accent}/></>,
  Database:<><ellipse cx="45" cy="27" rx="24" ry="10" {...common}/><path d="M21 27v32c0 13 48 13 48 0V27M21 43c0 13 48 13 48 0" {...common}/><path d="M33 27h24" {...accent}/></>,
  Settings:<><circle cx="45" cy="45" r="13" {...common}/><path d="M45 19v8m0 36v8M19 45h8m36 0h8M27 27l6 6m24 24 6 6m0-36-6 6M33 57l-6 6" {...common}/><circle cx="45" cy="45" r="25" stroke="#d0d8ec" strokeWidth=".8" fill="none"/></>,
  Location:<><path d="M45 77s21-19 21-35a21 21 0 1 0-42 0c0 16 21 35 21 35Z" {...common}/><circle cx="45" cy="42" r="7" {...accent}/></>,
  Energy:<><path d="m51 18-25 31h17l-4 23 25-33H47l4-21Z" {...common}/><path d="M30 76h30" {...accent}/></>,
  "Neural Network":<><circle cx="28" cy="31" r="6" {...common}/><circle cx="62" cy="28" r="6" {...common}/><circle cx="45" cy="49" r="7" {...accent}/><circle cx="27" cy="66" r="6" {...common}/><circle cx="65" cy="65" r="6" {...common}/><path d="m33 33 24-3M32 35l10 10m7 9 12 8m-20-8-10 8m15-29-1 9" {...common}/></>,
  Calendar:<><rect x="21" y="25" width="48" height="47" rx="6" {...common}/><path d="M21 39h48M33 19v12m24-12v12" {...common}/><path d="M33 51h9m6 0h9M33 61h9" {...accent}/></>,
  Camera:<><path d="M19 34h15l4-7h14l4 7h15v34H19V34Z" {...common}/><circle cx="45" cy="51" r="12" {...accent}/></>,
  Wallet:<><path d="M19 29c0-5 5-8 10-8h34c5 0 8 3 8 8v6H28c-5 0-9 3-9 9V29Z" {...common}/><path d="M19 44c0-5 4-9 9-9h48v30c0 5-4 8-9 8H28c-5 0-9-3-9-8V44Z" {...common}/><circle cx="61" cy="54" r="3" {...accent}/></>,
  Link:<><path d="M38 56 31 63a13 13 0 0 1-18-18l10-10a13 13 0 0 1 18 0" {...common}/><path d="m52 34 7-7a13 13 0 0 1 18 18L67 55a13 13 0 0 1-18 0" {...common}/><path d="m34 55 22-22" {...accent}/></>,
  Heart:<><path d="M45 74S19 59 19 39c0-17 21-21 26-7 5-14 26-10 26 7 0 20-26 35-26 35Z" {...common}/><path d="M30 43h10l5-9 5 18 4-9h7" {...accent}/></>,
  Star:<><path d="m45 17 8 18 20 2-15 13 4 20-17-10-17 10 4-20-15-13 20-2 8-18Z" {...common}/><circle cx="45" cy="45" r="8" {...accent}/></>,
  Bell:<><path d="M24 61h42l-6-8V39a15 15 0 0 0-30 0v14l-6 8Z" {...common}/><path d="M39 70c2 5 10 5 12 0" {...accent}/></>,
  Folder:<><path d="M17 31h23l6 7h27v29H17V31Z" {...common}/><path d="M17 38h56" {...accent}/></>,
  Terminal:<><rect x="17" y="23" width="56" height="44" rx="6" {...common}/><path d="m29 37 9 8-9 8m16 0h14" {...accent}/></>,
  Globe:<><circle cx="45" cy="45" r="27" {...common}/><path d="M18 45h54M45 18c11 12 11 42 0 54M45 18c-11 12-11 42 0 54" {...common}/><path d="M25 30h40" {...accent}/></>,
  Chart:<><path d="M21 70V20m0 50h52" {...common}/><path d="m28 59 13-14 10 7 14-22" {...accent}/><circle cx="65" cy="30" r="3" fill="#8f91ff"/></>,
  Layers:<><path d="m45 18 27 15-27 15-27-15 27-15Z" {...common}/><path d="m18 47 27 15 27-15M18 61l27 15 27-15" {...common}/><path d="m31 33 14 8 14-8" {...accent}/></>,
  "Arrow Up Right":<><path d="M23 67 67 23M35 23h32v32" {...common}/><path d="M24 45v22h22" {...accent}/></>,
  Lock:<><rect x="23" y="40" width="44" height="33" rx="6" {...common}/><path d="M31 40v-9a14 14 0 0 1 28 0v9" {...common}/><circle cx="45" cy="56" r="3" {...accent}/></>,
  Key:<><circle cx="31" cy="48" r="12" {...common}/><path d="m40 57 25-25m-8 8 7 7m-14 0 7 7" {...accent}/></>,
  Send:<><path d="m17 22 57 23-57 23 9-23-9-23Z" {...common}/><path d="M26 45h47" {...accent}/></>,
  Download:<><rect x="21" y="60" width="48" height="14" rx="5" {...common}/><path d="M45 22v34m0 0-12-12m12 12 12-12" {...accent}/></>,
  Trash:<><path d="M25 30h40l-3 44H28l-3-44ZM35 23h20m-24 7 2-7h24l2 7" {...common}/><path d="M38 42v20m14-20v20" {...accent}/></>,
  Edit:<><path d="m23 66 5-16 29-29 11 11-29 29-16 5Z" {...common}/><path d="m50 28 11 11M22 72h48" {...accent}/></>,
  Play:<><circle cx="45" cy="45" r="27" {...common}/><path d="m39 33 19 12-19 12V33Z" {...accent}/></>,
  Pause:<><circle cx="45" cy="45" r="27" {...common}/><path d="M36 33v24m18-24v24" {...accent}/></>,
  Map:<><path d="m18 26 20-7 18 7 18-7v46l-18 7-18-7-20 7V26Z" {...common}/><path d="M38 19v46m18-39v46" {...accent}/></>,
  Compass:<><circle cx="45" cy="45" r="27" {...common}/><path d="m57 33-7 17-17 7 7-17 17-7Z" {...accent}/><circle cx="45" cy="45" r="3" {...common}/></>,
  Wifi:<><path d="M19 35c15-15 37-15 52 0M26 43c11-11 27-11 38 0M34 52c6-6 16-6 22 0" {...common}/><circle cx="45" cy="63" r="4" fill="#8f91ff"/></>,
  Home:<><path d="m18 43 27-24 27 24v29H54V54H36v18H18V43Z" {...common}/><path d="M27 40h36" {...accent}/></>,
  Menu:<><path d="M22 30h46M22 45h46M22 60h46" {...common}/><circle cx="26" cy="30" r="2" fill="#8f91ff"/></>,
  Filter:<><path d="M18 25h54L52 48v20l-14-7V48L18 25Z" {...common}/><path d="M31 31h28" {...accent}/></>,
  Eye:<><path d="M18 45s10-18 27-18 27 18 27 18-10 18-27 18S18 45 18 45Z" {...common}/><circle cx="45" cy="45" r="8" {...accent}/></>,
  Plus:<><circle cx="45" cy="45" r="27" {...common}/><path d="M45 32v26m-13-13h26" {...accent}/></>,
  Minus:<><rect x="20" y="43.5" width="50" height="3" rx="1.5" fill="url(#metal)"/><rect x="30" y="44" width="30" height="2" rx="1" fill="url(#accent)"/></>,
  Check:<><circle cx="45" cy="45" r="27" {...common}/><path d="m31 46 9 9 19-20" {...accent}/></>,
  Close:<><circle cx="45" cy="45" r="27" {...common}/><path d="m35 35 20 20m0-20-20 20" {...accent}/></>,
  Share:<><circle cx="29" cy="45" r="6" {...common}/><circle cx="61" cy="27" r="6" {...common}/><circle cx="61" cy="63" r="6" {...common}/><path d="m34 42 21-12m-21 18 21 12" {...accent}/></>,
  Print:<><path d="M26 36V22h38v14M23 40h44v25H23V40Z" {...common}/><path d="M31 55h28v15H31V55Z" {...accent}/><circle cx="58" cy="45" r="2" fill="#8f91ff"/></>,
  Bookmark:<><path d="M27 20h36v54L45 62 27 74V20Z" {...common}/><path d="M35 29h20" {...accent}/></>,
  Clock:<><circle cx="45" cy="45" r="27" {...common}/><path d="M45 29v17l12 8" {...accent}/><circle cx="45" cy="45" r="3" {...common}/></>,
  Mail:<><rect x="18" y="26" width="54" height="38" rx="5" {...common}/><path d="m19 31 26 19 26-19" {...accent}/></>,
  Phone:<><path d="M29 20c5-3 8 5 10 11l-7 6c4 9 8 14 17 18l6-7c6 2 14 6 11 11-4 8-11 12-20 8-17-7-29-19-34-36-3-9 9-15 17-11Z" {...common}/><path d="M59 26c5 3 8 7 9 13" {...accent}/></>,
  Video:<><rect x="17" y="29" width="40" height="33" rx="5" {...common}/><path d="m57 40 17-10v31L57 51V40Z" {...accent}/></>,
  Mic:<><rect x="36" y="19" width="18" height="34" rx="9" {...common}/><path d="M28 44a17 17 0 0 0 34 0M45 61v12m-10 0h20" {...accent}/></>,
  Headphones:<><path d="M21 48v-5a24 24 0 0 1 48 0v5M21 48h12v19H21V48Zm36 0h12v19H57V48Z" {...common}/><path d="M57 68c-3 6-9 7-15 7" {...accent}/></>,
  Image:<><rect x="18" y="24" width="54" height="43" rx="5" {...common}/><circle cx="57" cy="37" r="5" {...accent}/><path d="m23 61 15-15 10 9 7-7 12 13" {...common}/></>,
  File:<><path d="M27 18h25l13 13v42H27V18Z" {...common}/><path d="M52 18v14h13M35 48h22m-22 9h16" {...accent}/></>,
  Clipboard:<><rect x="24" y="24" width="42" height="51" rx="5" {...common}/><rect x="35" y="18" width="20" height="12" rx="4" {...accent}/><path d="M34 44h22m-22 10h22" {...common}/></>,
  Archive:<><rect x="19" y="27" width="52" height="14" rx="4" {...common}/><path d="M23 41h44v31H23V41Z" {...common}/><path d="M36 54h18" {...accent}/></>,
  Code:<><path d="m33 28-15 17 15 17m24-34 15 17-15 17" {...common}/><path d="m50 23-10 44" {...accent}/></>,
  Brackets:<><path d="M36 22H25v46h11m18-46h11v46H54" {...common}/><path d="M45 29v32" {...accent}/></>,
  Puzzle:<><path d="M28 24h14c-3-10 13-10 10 0h14v15c10-3 10 13 0 10v16H52c3 10-13 10-10 0H28V49c-10 3-10-13 0-10V24Z" {...common}/><path d="M42 41h10v8h-10z" {...accent}/></>,
  "Arrow Left":<><path d="M68 45H22m0 0 15-15M22 45l15 15" {...common}/><path d="M30 45h25" {...accent}/></>,
  "Arrow Right":<><path d="M22 45h46m0 0-15-15m15 15-15 15" {...common}/><path d="M35 45h25" {...accent}/></>,
  "Arrow Down":<><path d="M45 22v46m0 0-15-15m15 15 15-15" {...common}/><path d="M45 35v25" {...accent}/></>,
  Refresh:<><path d="M68 37a25 25 0 1 0 2 17" {...common}/><path d="m68 24 1 14-14-1" {...accent}/></>,
  Undo:<><path d="M63 63c0-17-11-25-30-25H23" {...common}/><path d="m34 27-11 11 11 11" {...accent}/></>,
  Redo:<><path d="M27 63c0-17 11-25 30-25h10" {...common}/><path d="m56 27 11 11-11 11" {...accent}/></>,
  Sliders:<><path d="M22 29h46M22 45h46M22 61h46" {...common}/><circle cx="35" cy="29" r="5" {...accent}/><circle cx="56" cy="45" r="5" {...accent}/><circle cx="43" cy="61" r="5" {...accent}/></>,
  Grid:<><rect x="22" y="22" width="18" height="18" rx="3" {...common}/><rect x="50" y="22" width="18" height="18" rx="3" {...common}/><rect x="22" y="50" width="18" height="18" rx="3" {...common}/><rect x="50" y="50" width="18" height="18" rx="3" {...accent}/></>,
  List:<><path d="M34 28h34M34 45h34M34 62h34" {...common}/><circle cx="24" cy="28" r="3" {...accent}/><circle cx="24" cy="45" r="3" {...accent}/><circle cx="24" cy="62" r="3" {...accent}/></>,
  Sort:<><path d="M27 26h30M27 45h22M27 64h14" {...common}/><path d="m61 26 7 7-7 7m0 11 7 7-7 7" {...accent}/></>,
  Info:<><circle cx="45" cy="45" r="27" {...common}/><rect x="43.5" y="41" width="3" height="16" rx="1.5" fill="url(#accent)"/><circle cx="45" cy="33" r="2.3" fill="url(#accent)"/></>,
  Alert:<><path d="m45 18 29 52H16L45 18Z" {...common}/><rect x="43.5" y="37" width="3" height="17" rx="1.5" fill="url(#accent)"/><circle cx="45" cy="61" r="2.3" fill="url(#accent)"/></>,
  "Arrow Up":<><path d="M45 68V22m0 0-15 15m15-15 15 15" {...common}/><path d="M45 55V30" {...accent}/></>,
  Chevrons:<><path d="m28 25 20 20-20 20m14-40 20 20-20 20" {...common}/><path d="m42 25 20 20-20 20" {...accent}/></>,
  "External Link":<><path d="M39 27H23v43h43V54" {...common}/><path d="M48 24h19v19m0-19L40 51" {...accent}/></>,
  More:<><circle cx="27" cy="45" r="4" {...common}/><circle cx="45" cy="45" r="4" {...accent}/><circle cx="63" cy="45" r="4" {...common}/></>,
  Help:<><circle cx="45" cy="45" r="27" {...common}/><path d="M36 36c1-11 19-11 19 0 0 8-10 8-10 15" {...accent}/><circle cx="45" cy="61" r="2.3" fill="url(#accent)"/></>,
  Circle:<><circle cx="45" cy="45" r="27" {...common}/><circle cx="45" cy="45" r="18" {...accent}/></>,
  Square:<><rect x="19" y="19" width="52" height="52" rx="7" {...common}/><rect x="28" y="28" width="34" height="34" rx="4" {...accent}/></>,
  Triangle:<><path d="m45 17 29 54H16L45 17Z" {...common}/><path d="m45 29 18 34H27L45 29Z" {...accent}/></>,
  Hexagon:<><path d="m45 17 24 14v28L45 73 21 59V31l24-14Z" {...common}/><path d="m45 28 14 8v18L45 62 31 54V36l14-8Z" {...accent}/></>,
  Moon:<><path d="M58 19c-22 2-31 27-17 43 9 11 25 12 36 3-18 2-29-17-19-33 2-4 5-8 10-13Z" {...common}/><path d="M34 30c3-3 7-5 11-6" {...accent}/></>,
  Sun:<><circle cx="45" cy="45" r="14" {...common}/><path d="M45 18v8m0 38v8M18 45h8m38 0h8M26 26l6 6m31 31 6 6m0-43-6 6M32 58l-6 6" {...accent}/></>,
  "Cloud Rain":<><path d="M24 56h43c10 0 15-7 15-14 0-10-8-17-17-16-4-9-17-11-24-4-12-2-20 8-17 18-8 2-11 8-9 12 2 3 5 4 9 4Z" {...common}/><path d="m33 64-3 10m15-10-3 10m15-10-3 10" {...accent}/></>,
  Wind:<><path d="M19 34h34c9 0 10-13 1-13-5 0-7 4-7 7M19 47h47c10 0 10 14 0 14-5 0-7-4-7-7M19 60h22" {...common}/><path d="M25 47h28" {...accent}/></>,
  Snow:<><path d="M45 18v54M22 32l46 27M68 32 22 59" {...common}/><path d="m45 18-5 7m5-7 5 7m-28 7 8 1m-8-1 4 7m42-7-8 1m8-1-4 7M45 72l-5-7m5 7 5-7" {...accent}/></>,
  Thermometer:<><path d="M38 22a7 7 0 0 1 14 0v30a14 14 0 1 1-14 0V22Z" {...common}/><path d="M45 35v24" {...accent}/><circle cx="45" cy="62" r="5" fill="url(#accent)"/></>,
  Battery:<><rect x="17" y="31" width="54" height="28" rx="5" {...common}/><path d="M71 39h5v12h-5" {...common}/><path d="M25 39h29v12H25z" fill="url(#accent)"/></>,
  Bluetooth:<><path d="m39 20 19 17-19 16 19 17V20L35 41l23 17" {...common}/><path d="m29 29 29 32m0-32L29 61" {...accent}/></>,
  Monitor:<><rect x="18" y="22" width="54" height="37" rx="5" {...common}/><path d="M45 59v12m-15 0h30" {...accent}/></>,
  Mobile:<><rect x="29" y="17" width="32" height="56" rx="6" {...common}/><path d="M39 25h12" {...accent}/><circle cx="45" cy="65" r="2" fill="url(#accent)"/></>,
  Tablet:<><rect x="24" y="17" width="42" height="56" rx="6" {...common}/><path d="M40 65h10" {...accent}/></>,
  Server:<><rect x="19" y="22" width="52" height="18" rx="4" {...common}/><rect x="19" y="50" width="52" height="18" rx="4" {...common}/><path d="M29 31h27m-27 28h27" {...accent}/><circle cx="63" cy="31" r="2" fill="url(#accent)"/><circle cx="63" cy="59" r="2" fill="url(#accent)"/></>,
  "Hard Drive":<><rect x="18" y="25" width="54" height="40" rx="6" {...common}/><circle cx="45" cy="45" r="11" {...accent}/><circle cx="45" cy="45" r="3" {...common}/><path d="M56 57h8" {...accent}/></>,
  CPU:<><rect x="28" y="28" width="34" height="34" rx="4" {...common}/><path d="M36 36h18v18H36z" {...accent}/><path d="M35 18v10m10-10v10m10-10v10M35 62v10m10-10v10m10-10v10M18 35h10m-10 10h10m-10 10h10M62 35h10m-10 10h10m-10 10h10" {...common}/></>,
  "Git Branch":<><circle cx="30" cy="24" r="6" {...common}/><circle cx="30" cy="66" r="6" {...common}/><circle cx="60" cy="45" r="6" {...accent}/><path d="M30 30v30m0-15c0-9 8-12 24-6" {...common}/></>,
  Rocket:<><path d="M45 16c10 9 14 20 12 34L45 65 33 50c-2-14 2-25 12-34Z" {...common}/><circle cx="45" cy="37" r="5" {...accent}/><path d="m33 49-12 13 14-3m22-10 12 13-14-3M45 65v10" {...common}/><path d="M45 67v8" {...accent}/></>,
  Flag:<><path d="M25 72V20m0 3c13-8 24 8 39 0v28c-15 8-26-8-39 0" {...common}/><path d="M31 29c8-3 15 3 24 1" {...accent}/></>,
  "Shield Check":<><path d="M45 18 70 28v18c0 17-11 27-25 34-14-7-25-17-25-34V28l25-10Z" {...common}/><path d="m33 49 8 8 17-18" {...accent}/></>,
  "User Plus":<><circle cx="37" cy="35" r="11" {...common}/><path d="M18 70c2-14 10-21 19-21s17 7 19 21M66 31v18m-9-9h18" {...common}/><path d="M66 31v18m-9-9h18" {...accent}/></>,
  Users:<><circle cx="34" cy="35" r="10" {...common}/><circle cx="58" cy="38" r="8" {...common}/><path d="M15 70c2-14 10-21 19-21s17 7 19 21m1-15c10 0 15 6 16 15" {...accent}/></>,
  Contact:<><rect x="20" y="21" width="50" height="50" rx="7" {...common}/><circle cx="45" cy="38" r="9" {...accent}/><path d="M30 61c2-10 8-15 15-15s13 5 15 15" {...common}/></>,
  "At Sign":<><circle cx="45" cy="45" r="27" {...common}/><circle cx="45" cy="43" r="10" {...accent}/><path d="M55 43v10c0 6 11 6 11-2 0-15-9-25-21-25" {...common}/></>,
  Hashtag:<><path d="M34 20 30 70m27-50-4 50M20 36h50M20 54h50" {...common}/><path d="M30 54h27" {...accent}/></>,
  Smile:<><circle cx="45" cy="45" r="27" {...common}/><circle cx="35" cy="39" r="2.5" fill="url(#accent)"/><circle cx="55" cy="39" r="2.5" fill="url(#accent)"/><path d="M32 52c6 11 20 11 26 0" {...accent}/></>,
  Paperclip:<><path d="m59 31-22 25c-11 12-28-4-17-16l24-27c9-10 24 3 15 13L35 54c-5 5-12-3-7-8l21-24" {...common}/><path d="m59 31-22 25" {...accent}/></>
 };
 return <svg viewBox="0 0 90 90" width={s} height={s} aria-label={name} role="img"><defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f0f4ff"/><stop offset=".22" stopColor="#596177"/><stop offset=".5" stopColor="#e3e8f4"/><stop offset=".73" stopColor="#252c3d"/><stop offset="1" stopColor="#b1bbd2"/></linearGradient><linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#617cff"/><stop offset=".55" stopColor="#a28cff"/><stop offset="1" stopColor="#e1d2ff"/></linearGradient></defs>{paths[name]}</svg>
}

export default function Home(){
 const [active,setActive]=useState<IconName>("Search"); const [category,setCategory]=useState<(typeof categories)[number]>("All"); const [query,setQuery]=useState("");
 const [material,setMaterial]=useState("Chrome"); const [accent,setAccent]=useState("Violet"); const [scale,setScale]=useState(100); const [rotation,setRotation]=useState(0); const [notice,setNotice]=useState(""); const [detailOpen,setDetailOpen]=useState(false);
 const filtered=useMemo(()=>icons.filter(i=>(category==="All"||i.category===category)&&i.name.toLowerCase().includes(query.toLowerCase())),[category,query]);
 const selected=icons.find(i=>i.name===active)!;
 const selectedSvg=()=>Array.from(document.querySelectorAll<SVGSVGElement>("svg[aria-label]")).find(svg=>svg.getAttribute("aria-label")===active)?.outerHTML ?? "";
 const copyExport=async(kind:"SVG"|"React")=>{const svg=selectedSvg();const code=kind==="SVG"&&svg?svg:`export const ${active.replaceAll(" ","")} = () => <svg viewBox="0 0 90 90">…</svg>`; try{if(!navigator.clipboard) throw new Error("Clipboard unavailable"); await navigator.clipboard.writeText(code);setNotice(`${kind} copied`)}catch{const area=document.createElement("textarea");area.value=code;area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();document.execCommand("copy");area.remove();setNotice(`${kind} copied`)} window.setTimeout(()=>setNotice(""),1800)};
 const downloadSvg=()=>{const svg=selectedSvg();if(!svg){setNotice("SVG unavailable");return}const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml"}));const link=document.createElement("a");link.href=url;link.download=`ad-astra-${active.toLowerCase().replaceAll(" ","-")}.svg`;link.click();URL.revokeObjectURL(url);setNotice(`${active} downloaded`);window.setTimeout(()=>setNotice(""),1800)};
 return <main><header><div className="brand"><i/><span>AD ASTRA</span><em>ICON SYSTEM</em></div><div className="header-actions"><button className="quiet">Nocturne / 01 <b>·</b> {icons.length} / 500 objects</button><button className="export" onClick={downloadSvg}>Export SVG</button></div></header>
 <section className="intro"><div><p className="eyebrow">SCULPTURAL INTERFACE LANGUAGE</p><h1>Objects for the<br/>unseen frontier.</h1></div><p className="intro-copy">Each glyph is a small instrument: cut from graphite, edged in liquid metal, and held inside a quiet orbital field.</p></section>
 <section className="workspace"><aside><p className="rail-label">COLLECTION</p>{categories.map(c=><button key={c} className={category===c?"filter selected":"filter"} onClick={()=>setCategory(c)}><span>{c}</span><small>{c==="All"?icons.length:icons.filter(i=>i.category===c).length}</small></button>)}<div className="rail-bottom"><span className="signal"/>SYSTEM CALIBRATED</div></aside>
 <div className="gallery"><div className="gallery-bar"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search glyphs"/></div><span>{String(filtered.length).padStart(2,"0")} OBJECTS</span></div><div className="icon-grid">{filtered.map((icon,index)=><button key={icon.name} className={`${active===icon.name?"icon-card current":"icon-card"} motion-${motionByName[icon.name]}`} onClick={()=>setActive(icon.name)}><span className="index">{String(index+1).padStart(2,"0")}</span><Glyph name={icon.name}/><span className="icon-name">{icon.name}</span><span className="category">{icon.category}</span></button>)}</div></div>
 <aside className="inspector"><div className={`orbital material-${material.toLowerCase()} accent-${accent.toLowerCase()}`}><span/><span/><div className={`object-wrap motion-${motionByName[active]}`} style={{transform:`rotate(${rotation}deg) scale(${scale/100})`}}><Glyph name={active} large/></div></div><div className="inspect-title"><div><p className="eyebrow">SELECTED OBJECT</p><h2>{active}</h2></div><button aria-label="Open icon details" onClick={()=>setDetailOpen(true)}>···</button></div><p className="description">A responsive structural object with an articulated material surface and restrained spectral signal.</p><div className="properties"><div><span>FAMILY</span><b>{selected.category}</b></div><div><span>CONSTRUCTION</span><b>Spatial / 02</b></div></div><div className="controls"><div className="control-title"><span>MATERIAL</span><b>{material}</b></div><div className="segmented">{["Chrome","Graphite","Glass"].map(value=><button key={value} className={material===value?"active":""} onClick={()=>setMaterial(value)}>{value}</button>)}</div><div className="control-title"><span>ACCENT</span><b>{accent}</b></div><div className="swatches">{["Violet","Cobalt","Pearl"].map(value=><button key={value} aria-label={value} className={`${value.toLowerCase()} ${accent===value?"active":""}`} onClick={()=>setAccent(value)}/>)}</div><label className="range-label">SCALE <b>{scale}%</b><input type="range" min="75" max="125" value={scale} onChange={e=>setScale(Number(e.target.value))}/></label><label className="range-label">ROTATION <b>{rotation}°</b><input type="range" min="-25" max="25" value={rotation} onChange={e=>setRotation(Number(e.target.value))}/></label></div><div className="export-row"><button onClick={()=>copyExport("SVG")}>SVG</button><button onClick={()=>copyExport("React")}>REACT</button><button className="detail-button" onClick={()=>setDetailOpen(true)}>DETAILS</button></div>{notice&&<div className="toast" role="status">{notice}</div>}</aside></section>
 {detailOpen&&<div className="detail-backdrop" role="dialog" aria-modal="true" aria-label={`${active} details`} onClick={()=>setDetailOpen(false)}><section className="detail-panel" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setDetailOpen(false)} aria-label="Close details">×</button><div className={`detail-hero motion-${motionByName[active]}`}><Glyph name={active} large/></div><p className="eyebrow">OBJECT SPECIFICATION / {selected.category.toUpperCase()}</p><h2>{active}</h2><p>Designed for high-clarity system surfaces. Preserve a clear field around the silhouette and use the motion state only when it carries meaning.</p><div className="detail-specs"><span>DEFAULT MOTION <b>{motionByName[active]}</b></span><span>GRID <b>24 × 24</b></span><span>EXPORT <b>SVG / React</b></span></div><div className="detail-actions"><button className="primary" onClick={()=>copyExport("SVG")}>{notice==="SVG copied"?"SVG copied":"Copy SVG"}</button><button className="primary" onClick={()=>copyExport("React")}>{notice==="React copied"?"React copied":"Copy React"}</button></div></section></div>}
 <footer><span>AD ASTRA / OBJECT LANGUAGE STUDY</span><span>DESIGNED BY MALIK LAWAL</span><span>© 2026</span></footer></main>
}
