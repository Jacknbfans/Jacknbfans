let txt01 = "ABCDEFGHIGKLMNOPQRSTUVWXYZ"; 
console.log("string length is: " + txt01.length);
console.log("string fisrt index is: " + txt01.indexOf("ABCD"));
console.log("string last index is: " + txt01.lastIndexOf("ABCD"));

let txt02 = "ABCDEFGHIJKLABCDEFGH";
console.log("string special first index is: " + txt02.indexOf("ABCD",5));
console.log("string special last index is: " + txt02.lastIndexOf("ABCD",10));

let txt03 = "a,b,c,aaa,bbb,aaa";
console.log("string include special value is: " + txt03.includes("aaa"));

let txt04 = "Apple, Banana, Mango";
console.log("string picker is: " + txt04.slice(7));
console.log("string picker to target is: " + txt04.slice(7,13));
console.log("string end start count is: " + txt04.slice(7,-3));
console.log("string substring picker is: " + txt04.substring(7));
console.log("string substring picker to target is: " + txt04.substring(7,10));
console.log("string replace special value is: " + txt04.replace("Banana","Orange"));
console.log("string reqular replace is: " + txt04.replace(/BAnana/i,"Orange"));

let txt05 = "Apple, Banana, Mango, Banana";
console.log("string reqular replace all is: " + txt05.replace(/Banana/g,"Orange"));
console.log("string touppercase is: " + txt05.toUpperCase());
console.log("stirng tolowercase is: " + txt05.toLowerCase());

let txt06 = "Apple";
let txt07 = "Banana";
let txt08 = "Mango";
console.log("string concat is: " + txt06.concat(" ",txt07," ",txt08));
console.log("string special location is: " + txt06.charAt(1));
console.log("string special index unicode is: " + txt06.charCodeAt(1));

let txt09 = "a,b,c";
console.log("string split is: " + txt09.split(","));