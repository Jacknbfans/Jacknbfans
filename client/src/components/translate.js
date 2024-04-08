
function translate(key, language = 'en-us') {
  const translations = {
    'en-us': {
      'welcome': 'Welcome to our site!'
    },
    'zh-cn': {
      'welcome': '欢迎访问我们的网站！'
    },
    'ja-jp': {
      'welcome': '当サイトへようこそ！'
    },
    'vi-vn': {
      'welcome': 'Chào mừng đến với trang web của chúng tôi!'
    },
    'pt-pt': {
      'welcome': 'Bem vindo ao nosso site!'
    }
    ,
    'hi-in': {
      'welcome': 'हमारी साइट पर आपका स्वागत है!'
    }
  };
 
  const translation = translations[language][key];
  return translation || `${key} (No translation for ${language})`;
}
 
// 使用示例
console.log(translate('welcome')); // 输出: Welcome to our site!
console.log(translate('welcome', 'fr')); // 输出: Bienvenue sur notre site!
console.log(translate('welcome', 'es')); // 输出: Bienvenido a nuestro sitio!
console.log(translate('hello')); // 输出: hello (No translation for en)