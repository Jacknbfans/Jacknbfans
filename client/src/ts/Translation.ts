interface Translation {
    greeting: string;
    farewell: string;
  }
   
  function getTranslation<K extends keyof Translation>(key: K, lang: "en" | "es"): Translation[K] {
    const translations = {
      en: {
        greeting: "Hello",
        farewell: "Goodbye"
      },
      es: {
        greeting: "Hola",
        farewell: "Adiós"
      }
    };
   
    return translations[lang][key];
  }
   
  // 使用示例
  console.log(getTranslation("greeting", "en")); // 输出: Hello
  console.log(getTranslation("farewell", "es")); // 输出: Adiós