const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'messages');
const texts = {
  en: "👋 Hello, I’m Andrés Bonilla. I am currently studying Business Administration, I’m an entrepreneur, I develop software for others, and I create content for social media under the name Andev Bonilla. At 13, I started programming as a hobby; then I worked as a freelancer for a while, and at 16 I founded my first tech company, Fansive. Since then, I’ve carried out numerous projects and even worked in a warehouse, all while studying on a scholarship at Universidad de los Andes. I always strive to learn more and grow both personally and professionally.",
  es: "👋 Hola, soy Andrés Bonilla. Actualmente estudio Administración de Empresas, soy emprendedor, desarrollo software para otros y creo contenido para redes sociales con el nombre de Andev Bonilla. A los 13 años comencé a programar como hobby; luego trabajé un tiempo como freelancer y a los 16 fundé mi primera empresa tecnológica, Fansive. Desde entonces, he realizado numerosos proyectos e incluso he trabajado en una bodega, todo mientras estudio becado en la Universidad de los Andes. Siempre busco aprender más y crecer tanto personal como profesionalmente.",
  fr: "👋 Bonjour, je suis Andrés Bonilla. J'étudie actuellement l'administration des affaires, je suis un entrepreneur, je développe des logiciels pour d'autres et je crée du contenu pour les réseaux sociaux sous le nom d'Andev Bonilla. À 13 ans, j'ai commencé à programmer comme passe-temps ; puis j'ai travaillé quelque temps comme freelance, et à 16 ans, j'ai fondé ma première entreprise technologique, Fansive. Depuis, j'ai réalisé de nombreux projets et même travaillé dans un entrepôt, tout en étudiant avec une bourse à l'Universidad de los Andes. Je m'efforce toujours d'en apprendre davantage et de grandir tant sur le plan personnel que professionnel.",
  de: "👋 Hallo, ich bin Andrés Bonilla. Ich studiere derzeit Betriebswirtschaft, bin Unternehmer, entwickle Software für andere und erstelle Inhalte für soziale Netzwerke unter dem Namen Andev Bonilla. Mit 13 Jahren habe ich als Hobby mit dem Programmieren begonnen; dann habe ich eine Zeit lang als Freiberufler gearbeitet und mit 16 Jahren mein erstes Technologieunternehmen, Fansive, gegründet. Seitdem habe ich zahlreiche Projekte durchgeführt und sogar in einem Lagerhaus gearbeitet, während ich mit einem Stipendium an der Universidad de los Andes studierte. Ich bemühe mich immer, mehr zu lernen und mich sowohl persönlich als auch beruflich weiterzuentwickeln.",
  pt: "👋 Olá, eu sou Andrés Bonilla. Atualmente estudo Administração de Empresas, sou empreendedor, desenvolvo software para terceiros e crio conteúdo para as redes sociais sob o nome Andev Bonilla. Aos 13 anos, comecei a programar como hobby; depois trabalhei um tempo como freelancer e aos 16 fundei a minha primeira empresa de tecnologia, Fansive. Desde então, realizei vários projetos e até trabalhei num armazém, tudo enquanto estudava com uma bolsa na Universidad de los Andes. Procuro sempre aprender mais e crescer a nível pessoal e profissional.",
  hi: "👋 नमस्ते, मैं एंड्रेस बोनिला हूँ। मैं वर्तमान में व्यवसाय प्रशासन की पढ़ाई कर रहा हूँ, मैं एक उद्यमी हूँ, मैं दूसरों के लिए सॉफ्टवेयर विकसित करता हूँ, और मैं Andev Bonilla के नाम से सोशल मीडिया के लिए सामग्री बनाता हूँ। 13 साल की उम्र में, मैंने एक शौक के रूप में प्रोग्रामिंग शुरू की; फिर मैंने कुछ समय के लिए एक फ्रीलांसर के रूप में काम किया, और 16 साल की उम्र में मैंने अपनी पहली तकनीकी कंपनी, फैंसिव की स्थापना की। तब से, मैंने कई परियोजनाओं को अंजाम दिया है और यहाँ तक कि एक गोदाम में भी काम किया है, और यह सब करते हुए मैं यूनिवर्सिडाड डी लॉस एंडीज़ (Universidad de los Andes) में छात्रवृत्ति पर पढ़ाई कर रहा हूँ। मैं हमेशा अधिक सीखने और व्यक्तिगत और पेशेवर दोनों रूप से बढ़ने का प्रयास करता हूँ।",
  ja: "👋 こんにちは、Andrés Bonillaです。私は現在、経営学を学んでおり、起業家であり、他の人のためにソフトウェアを開発し、Andev Bonillaという名前でソーシャルメディア向けのコンテンツを作成しています。13歳で趣味としてプログラミングを始め、その後フリーランスとしてしばらく働き、16歳で最初のテクノロジー企業であるFansiveを設立しました。それ以来、多数のプロジェクトを実行し、倉庫で働いたこともあります。しかも、アンデス大学（Universidad de los Andes）で奨学金を得て勉強しながらです。私は常に、より多くのことを学び、個人的にも職業的にも成長するよう努めています。",
  zh: "👋 你好，我是 Andrés Bonilla。目前我正在学习企业管理，我是一名创业者，为他人开发软件，并以 Andev Bonilla 的名义为社交媒体创作内容。13 岁时，我将编程作为爱好开始了学习；随后我做了一段时间的自由职业者，并在 16 岁创办了我的第一家科技公司 Fansive。自那时起，我完成了多个项目，甚至还在仓库工作过，而这一切都是在安第斯大学（Universidad de los Andes）拿着奖学金学习期间完成的。我总是努力学习更多知识，并不断追求个人和职业的成长。",
  ru: "👋 Здравствуйте, я Андрес Бонилья (Andrés Bonilla). В настоящее время я изучаю бизнес-администрирование, я предприниматель, разрабатываю программное обеспечение для других и создаю контент для социальных сетей под именем Andev Bonilla. В 13 лет я начал программировать как хобби; затем я некоторое время работал фрилансером, а в 16 лет основал свою первую технологическую компанию Fansive. С тех пор я реализовал множество проектов и даже работал на складе, и все это во время учебы по стипендии в Университете Анд (Universidad de los Andes). Я всегда стремлюсь узнавать больше и расти как лично, так и профессионально."
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
files.forEach(file => {
  const lang = file.replace('.json', '');
  if(texts[lang]){
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if(data.About){
      data.About.text = texts[lang];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`Updated ${file}`);
    }
  }
});
