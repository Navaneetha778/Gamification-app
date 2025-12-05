import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";

interface Question {
  q: string;
  a: string;
}

interface Lesson {
  title: string;
  content: string[];
  questions: Question[];
}

const lessons: Lesson[] = [
  {
    title: "Lesson 1: Introduction to Copyright",
    content: [
      "1. Copyright protects original works like books, music, and art.",
      "2. Ideas alone are not protected, only expression is.",
      "3. You automatically get copyright when you create something.",
      "4. Registration helps in legal disputes.",
      "5. Copyright lasts for the life of the author plus 60 years.",
      "6. Using someone else’s work without permission is illegal.",
      "7. You can license your work to others.",
      "8. Fair use allows limited use for education or news.",
      "9. Always give credit to the creator.",
      "10. Digital creations are also protected.",
      "11. Copying without permission is called infringement.",
      "12. Plagiarism is giving false credit to yourself.",
      "13. Copyright encourages creativity.",
      "14. Sharing without permission can cause problems.",
      "15. You can sell your copyright rights.",
      "16. Teaching materials have special rules.",
      "17. Copyright applies worldwide but rules differ.",
      "18. Enforcement may involve courts.",
      "19. Respecting copyright is good practice.",
      "20. Copyright makes creators feel valued.",
    ],
    questions: [
      { q: "What does copyright protect?", a: "original works" },
      { q: "How long does copyright last?", a: "60 years" },
      { q: "What is copying without permission called?", a: "infringement" },
      { q: "Is registration required to get copyright?", a: "no" },
    ],
  },
  {
    title: "Lesson 2: Patents",
    content: [
      "1. Patents protect new inventions.",
      "2. They give the inventor exclusive rights to sell the invention.",
      "3. Patents must be registered.",
      "4. They usually last 20 years.",
      "5. Inventions must be new and useful.",
      "6. Patents prevent others from copying your invention.",
      "7. You can license patents to others.",
      "8. Patents encourage innovation.",
      "9. Patents are territorial, valid in certain countries only.",
      "10. A patent application requires detailed drawings.",
      "11. Public disclosure can affect patent rights.",
      "12. You can sue for infringement if someone copies your invention.",
      "13. Patents are different from trademarks.",
      "14. Software inventions may need special rules.",
      "15. Research and development is often patented.",
      "16. Patents can be bought and sold.",
      "17. Patents help inventors earn money.",
      "18. Patents must be renewed in some countries.",
      "19. Patent law encourages creativity.",
      "20. Respect others’ patents to avoid legal issues.",
    ],
    questions: [
      { q: "What do patents protect?", a: "inventions" },
      { q: "How long does a patent usually last?", a: "20 years" },
      { q: "Are patents registered or automatic?", a: "registered" },
      { q: "Do patents encourage innovation?", a: "yes" },
    ],
  },
  {
    title: "Lesson 3: Trademarks",
    content: [
      "1. Trademarks protect logos, names, and brands.",
      "2. They help customers recognize products.",
      "3. You can register trademarks legally.",
      "4. Trademarks prevent others from using similar marks.",
      "5. They can last indefinitely if renewed.",
      "6. Famous logos are protected worldwide.",
      "7. A trademark distinguishes products from competitors.",
      "8. Trademarks are symbols of trust.",
      "9. Unregistered marks may have limited protection.",
      "10. Using someone else’s trademark is illegal.",
      "11. Trademarks can be words, logos, or slogans.",
      "12. You can license your trademark to others.",
      "13. Brand reputation is linked to trademarks.",
      "14. Trademarks help marketing and recognition.",
      "15. Counterfeiting harms trademarks.",
      "16. Logos and packaging can be trademarked.",
      "17. Registration provides proof of ownership.",
      "18. Trademarks can be renewed every 10 years.",
      "19. Protecting trademarks encourages fair business.",
      "20. Respect others’ trademarks.",
    ],
    questions: [
      { q: "What does a trademark protect?", a: "logo" },
      { q: "How long can trademarks last?", a: "indefinitely" },
      { q: "What does counterfeiting harm?", a: "trademarks" },
      { q: "Are trademarks proof of ownership?", a: "yes" },
    ],
  },
  {
  title: "Lesson 4: Industrial Designs",
  content: [
    "1. Industrial design protects the visual appearance of products.",
    "2. It includes shape, pattern, and color of an article.",
    "3. The design must be new and original.",
    "4. Registration is required to get legal protection.",
    "5. Designs add value and attractiveness to products.",
    "6. A registered design gives the owner exclusive rights to use it.",
    "7. The usual duration of design protection is 10 years.",
    "8. It can be renewed for another 5 years in most countries.",
    "9. Industrial design does not protect how a product works — only how it looks.",
    "10. It helps in brand differentiation and marketing.",
    "11. Counterfeit products often copy designs illegally.",
    "12. Industrial design is different from patents and trademarks.",
    "13. Designs can be licensed or sold for commercial gain.",
    "14. Unauthorized copying is called design infringement.",
    "15. Simple geometric shapes are usually not protected.",
    "16. Designs must appeal to the eye and not be functional.",
    "17. Registration provides a legal remedy in case of infringement.",
    "18. Fashion, furniture, and automobile industries use design protection widely.",
    "19. Protecting designs promotes creativity and fair competition.",
    "20. Always check that your design is not similar to an existing one before registration."
  ],
  questions: [
    { q: "What does industrial design protect?", a: "appearance" },
    { q: "How long does design protection usually last?", a: "10 years" },
    { q: "What does design protection not cover?", a: "function" },
    { q: "What is unauthorized copying of design called?", a: "infringement" },
  ],
},
{
  title: "Lesson 5: Geographical Indications",
  content: [
    "1. Geographical Indication (GI) identifies goods from a specific location.",
    "2. It shows that a product has qualities linked to that region.",
    "3. Examples include Darjeeling Tea and Kanchipuram Silk.",
    "4. GIs are used for agricultural, natural, or manufactured goods.",
    "5. GI protection ensures authenticity.",
    "6. Only authorized users can use the GI name.",
    "7. GI helps rural communities and traditional industries.",
    "8. It prevents misuse of famous regional names.",
    "9. GIs are registered under the GI Act.",
    "10. Registration gives exclusive rights to producers.",
    "11. The GI mark is a collective right, not individual.",
    "12. Protection usually lasts 10 years and is renewable.",
    "13. Consumers trust products with genuine GI tags.",
    "14. GIs promote export and tourism.",
    "15. GI misuse can cause loss of reputation.",
    "16. GI registration requires geographical proof and history.",
    "17. GIs do not transfer ownership like trademarks.",
    "18. GI protection supports cultural heritage.",
    "19. India maintains a GI registry in Chennai.",
    "20. GIs encourage sustainable rural development."
  ],
  questions: [
    { q: "What does GI identify?", a: "location" },
    { q: "Give one example of a GI product.", a: "darjeeling tea" },
    { q: "How long does GI protection last?", a: "10 years" },
    { q: "Where is India's GI registry located?", a: "chennai" },
  ],
},
{
  title: "Lesson 6: Trade Secrets",
  content: [
    "1. Trade secrets protect confidential business information.",
    "2. Examples include formulas, processes, or customer lists.",
    "3. They are protected without registration.",
    "4. The secret must provide a competitive advantage.",
    "5. The owner must keep it confidential.",
    "6. Sharing under Non-Disclosure Agreements (NDAs) ensures protection.",
    "7. If leaked, protection may be lost.",
    "8. Theft of trade secrets is a criminal offence in many countries.",
    "9. Coca-Cola recipe is a famous trade secret example.",
    "10. Trade secrets never expire if kept confidential.",
    "11. Employees must maintain confidentiality after leaving a company.",
    "12. Trade secrets differ from patents since they are not public.",
    "13. Public disclosure removes trade secret protection.",
    "14. Companies implement internal policies to safeguard them.",
    "15. Trade secret misappropriation can lead to lawsuits.",
    "16. NDAs and contracts help legal enforcement.",
    "17. Trade secrets are cost-effective to maintain.",
    "18. Unlike patents, they give indefinite protection.",
    "19. Trade secrets encourage innovation in industries.",
    "20. Always limit access to sensitive information."
  ],
  questions: [
    { q: "Do trade secrets require registration?", a: "no" },
    { q: "Give an example of a trade secret.", a: "coca-cola" },
    { q: "What agreement protects shared secrets?", a: "nda" },
    { q: "What happens if a trade secret is leaked?", a: "protection lost" },
  ],
},
{
  title: "Lesson 7: Intellectual Property Rights (IPR)",
  content: [
    "1. IPR protects creations of the human mind.",
    "2. It includes copyright, patents, trademarks, and designs.",
    "3. IPR gives creators exclusive control over their work.",
    "4. It encourages innovation and creativity.",
    "5. IPR laws exist globally with different rules.",
    "6. Registration helps prove ownership.",
    "7. IPR infringement can lead to fines or imprisonment.",
    "8. Educational use may be allowed under fair use.",
    "9. IPR promotes fair competition.",
    "10. IPR boosts economic growth.",
    "11. IPR also protects indigenous knowledge.",
    "12. World Intellectual Property Organization (WIPO) governs global IPR.",
    "13. Digital content is covered under IPR too.",
    "14. IPR creates commercial value from creativity.",
    "15. IPR disputes are solved through courts or arbitration.",
    "16. Strong IPR systems attract investors.",
    "17. IPR has moral and economic rights.",
    "18. Piracy and counterfeiting violate IPR.",
    "19. IPR awareness is important for students and creators.",
    "20. Respecting IPR promotes innovation culture."
  ],
  questions: [
    { q: "What does IPR protect?", a: "creations" },
    { q: "Name one global IPR body.", a: "wipo" },
    { q: "What is illegal copying of work called?", a: "piracy" },
    { q: "Does IPR promote innovation?", a: "yes" },
  ],
},
{
  title: "Lesson 8: Plagiarism Awareness",
  content: [
    "1. Plagiarism means using someone else’s work without credit.",
    "2. It’s a form of intellectual theft.",
    "3. Copying text, ideas, or code without permission is plagiarism.",
    "4. Proper citation avoids plagiarism.",
    "5. Universities treat plagiarism as serious misconduct.",
    "6. Tools like Turnitin detect copied content.",
    "7. Paraphrasing requires giving credit too.",
    "8. Self-plagiarism means reusing your old work.",
    "9. Always quote sources properly.",
    "10. Plagiarism harms academic honesty.",
    "11. Plagiarism can cause loss of reputation.",
    "12. It violates copyright law.",
    "13. Taking inspiration is fine, but copying is not.",
    "14. Teachers use plagiarism checkers in assignments.",
    "15. Ethical writing encourages original thought.",
    "16. Students must learn referencing formats like APA or MLA.",
    "17. Plagiarism can lead to legal consequences.",
    "18. Using AI content without attribution may be plagiarism.",
    "19. Always give credit to the original creator.",
    "20. Avoiding plagiarism builds trust and respect."
  ],
  questions: [
    { q: "What is plagiarism?", a: "using others work" },
    { q: "Name one plagiarism detection tool.", a: "turnitin" },
    { q: "Is self-plagiarism allowed?", a: "no" },
    { q: "Does plagiarism harm academic honesty?", a: "yes" },
  ],
},
{
  title: "Lesson 9: Industrial Property",
  content: [
    "1. Industrial property includes patents, trademarks, and designs.",
    "2. It protects industrial and commercial creations.",
    "3. It promotes innovation and fair competition.",
    "4. Patents protect inventions.",
    "5. Trademarks protect logos, words, and symbols.",
    "6. Industrial designs protect product appearance.",
    "7. Registration gives legal ownership rights.",
    "8. It encourages investment in new ideas.",
    "9. Industrial property is essential for businesses.",
    "10. It prevents copying by competitors.",
    "11. Governments issue patents and trademarks.",
    "12. Industrial property increases product value.",
    "13. Companies use IP for brand recognition.",
    "14. Industrial property helps startups grow.",
    "15. It promotes global trade.",
    "16. Industrial property is regulated by WIPO.",
    "17. Industrial property rights last for limited periods.",
    "18. It strengthens consumer trust.",
    "19. Protecting IP supports economic growth.",
    "20. Respecting industrial property fosters innovation."
  ],
  questions: [
    { q: "What does industrial property include?", a: "patents trademarks designs" },
    { q: "Which organization regulates IP globally?", a: "wipo" },
    { q: "What protects the appearance of a product?", a: "industrial design" },
    { q: "Does industrial property help businesses?", a: "yes" },
  ],
},
{
  title: "Lesson 10: Fair Use",
  content: [
    "1. Fair use allows limited use of copyrighted works.",
    "2. It applies to education, research, and news reporting.",
    "3. Using short quotes can be fair use.",
    "4. Not all copying is fair use.",
    "5. Commercial use is usually not fair use.",
    "6. Fair use helps balance rights between creators and users.",
    "7. Always credit the source, even under fair use.",
    "8. Educational institutions rely on fair use rules.",
    "9. Criticism, review, or parody may qualify as fair use.",
    "10. Using large portions is not fair use.",
    "11. Courts decide based on purpose and amount used.",
    "12. Fair use promotes learning and creativity.",
    "13. It prevents copyright from blocking education.",
    "14. Fair use is different from public domain.",
    "15. It encourages responsible content use.",
    "16. Parody and satire can be fair use examples.",
    "17. Copying for personal study is often allowed.",
    "18. Fair use does not remove the need for credit.",
    "19. Teachers must understand fair use limits.",
    "20. Fair use supports creativity while respecting creators."
  ],
  questions: [
    { q: "What does fair use allow?", a: "limited use" },
    { q: "Is fair use for education and research?", a: "yes" },
    { q: "Does commercial use qualify as fair use?", a: "no" },
    { q: "Should you give credit under fair use?", a: "yes" },
  ],
},
{
  title: "Lesson 11: Digital Rights",
  content: [
    "1. Digital rights protect online content and creators.",
    "2. It includes text, images, software, and videos.",
    "3. Unauthorized downloads are violations.",
    "4. Creators own rights to their digital content.",
    "5. Digital rights prevent piracy and misuse.",
    "6. Digital Millennium Copyright Act (DMCA) enforces these rights.",
    "7. Sharing content online requires permission.",
    "8. Respecting digital ownership encourages creativity.",
    "9. Social media posts are protected too.",
    "10. Reusing online content without credit is infringement.",
    "11. Watermarks help protect digital works.",
    "12. Copyright applies equally to digital creations.",
    "13. Educational use must follow fair use principles.",
    "14. Software licensing protects code.",
    "15. Piracy harms content creators financially.",
    "16. Reporting copyright violations is encouraged.",
    "17. Digital rights awareness builds ethical behavior.",
    "18. Platforms must follow copyright guidelines.",
    "19. Secure digital storage prevents theft.",
    "20. Respecting digital rights promotes safe online use."
  ],
  questions: [
    { q: "What law protects digital rights?", a: "dmca" },
    { q: "Is unauthorized downloading allowed?", a: "no" },
    { q: "Are social media posts protected?", a: "yes" },
    { q: "Should digital works be credited?", a: "yes" },
  ],
},
{
  title: "Lesson 12: Moral Rights",
  content: [
    "1. Moral rights protect the creator’s personal connection to their work.",
    "2. They ensure the creator is properly credited.",
    "3. The right to object to misuse is a moral right.",
    "4. These rights exist even after selling the work.",
    "5. They cannot usually be transferred or waived.",
    "6. Moral rights safeguard integrity and reputation.",
    "7. Attribution and integrity are the two main moral rights.",
    "8. Violating them can harm an author’s honor.",
    "9. Moral rights exist under copyright law.",
    "10. They last as long as the copyright exists.",
    "11. They are recognized worldwide under the Berne Convention.",
    "12. Artists, authors, and musicians have strong moral rights.",
    "13. Modifying artwork without consent can violate moral rights.",
    "14. Credit must always be given to the true creator.",
    "15. These rights encourage ethical creativity.",
    "16. Educational materials also include moral rights.",
    "17. They build respect between creators and users.",
    "18. Protecting moral rights ensures cultural trust.",
    "19. Infringement can lead to legal action.",
    "20. Respecting moral rights encourages fairness and honesty."
  ],
  questions: [
    { q: "What do moral rights protect?", a: "creator connection" },
    { q: "Can moral rights be sold?", a: "no" },
    { q: "What are two types of moral rights?", a: "attribution integrity" },
    { q: "Which convention recognizes moral rights globally?", a: "berne convention" },
  ],
},
{
  title: "Lesson 13: Open Innovation",
  content: [
    "1. Open innovation means sharing ideas across organizations.",
    "2. It promotes collaboration and faster progress.",
    "3. Companies use open innovation to solve challenges.",
    "4. It combines internal and external knowledge.",
    "5. Universities and industries often collaborate this way.",
    "6. Innovation contests encourage new ideas.",
    "7. Protecting shared ideas is still important.",
    "8. Non-disclosure agreements maintain security.",
    "9. Open innovation saves research costs.",
    "10. It accelerates product development.",
    "11. Licensing and patents support open innovation.",
    "12. Sharing must respect intellectual property rights.",
    "13. It encourages teamwork and creativity.",
    "14. Open-source projects are a form of open innovation.",
    "15. Global collaboration brings new perspectives.",
    "16. Companies like NASA and Google use open innovation.",
    "17. Open innovation builds strong networks.",
    "18. It encourages students to solve real-world problems.",
    "19. It creates a culture of trust and cooperation.",
    "20. Open innovation makes learning practical and fun."
  ],
  questions: [
    { q: "What does open innovation promote?", a: "collaboration" },
    { q: "Give one example of open innovation organization.", a: "nasa" },
    { q: "Are NDAs used in open innovation?", a: "yes" },
    { q: "Is open-source part of open innovation?", a: "yes" },
  ],
},
{
  title: "Lesson 14: Creative Commons (CC)",
  content: [
    "1. Creative Commons offers flexible licenses for sharing work.",
    "2. It allows creators to control how others use their content.",
    "3. CC licenses include symbols like BY, SA, NC, and ND.",
    "4. BY means attribution must be given.",
    "5. SA means Share-Alike, users must share under the same terms.",
    "6. NC means Non-Commercial use only.",
    "7. ND means No Derivatives — no modification allowed.",
    "8. CC makes it easy to share educational content.",
    "9. Websites like Flickr and Wikipedia use CC.",
    "10. CC promotes legal sharing and collaboration.",
    "11. Teachers can use CC materials freely with credit.",
    "12. CC licenses are free and globally recognized.",
    "13. They help creators maintain control over usage.",
    "14. Different combinations create six main license types.",
    "15. CC helps reduce copyright conflicts.",
    "16. Proper credit is mandatory in all CC licenses.",
    "17. CC encourages open learning environments.",
    "18. Students can use CC media safely.",
    "19. CC makes creativity accessible to everyone.",
    "20. Using CC responsibly teaches respect for IP."
  ],
  questions: [
    { q: "What does CC stand for?", a: "creative commons" },
    { q: "What does 'BY' mean in CC license?", a: "attribution" },
    { q: "Is ND license modifiable?", a: "no" },
    { q: "Name a platform using CC.", a: "wikipedia" },
  ],
},
// --- Lesson 15: Copyright Infringement ---
{
  title: "Lesson 15: Copyright Infringement",
  content: [
    "1. Copyright infringement means using someone’s work without permission.",
    "2. Copying songs, movies, or books illegally is infringement.",
    "3. Uploading copyrighted content online is not allowed.",
    "4. Plagiarism is another form of infringement.",
    "5. It harms the creator’s income and reputation.",
    "6. Schools teach students to avoid plagiarism.",
    "7. Piracy websites are examples of infringement.",
    "8. Using copyrighted music in videos without rights is illegal.",
    "9. Infringement may lead to legal punishment.",
    "10. Downloading cracked software is infringement.",
    "11. Permission or license is needed for fair use.",
    "12. Reporting infringement supports creators.",
    "13. Respecting copyright promotes creativity.",
    "14. Even partial copying can be infringement.",
    "15. AI-generated work must also respect copyright laws.",
    "16. Businesses must monitor employee content use.",
    "17. YouTube automatically flags infringed videos.",
    "18. Ignorance is not an excuse for breaking copyright law.",
    "19. Prevention is better than facing penalties.",
    "20. Always give credit and seek permission before use."
  ],
  questions: [
    { q: "What is copyright infringement?", a: "using work without permission" },
    { q: "Is piracy a type of infringement?", a: "yes" },
    { q: "Can partial copying be infringement?", a: "yes" },
    { q: "Should you seek permission before using?", a: "yes" },
  ],
},

// --- Lesson 16: IP in Entertainment ---
{
  title: "Lesson 16: IP in Entertainment",
  content: [
    "1. Intellectual property is vital in movies, music, and games.",
    "2. Scriptwriters own copyright for their stories.",
    "3. Musicians hold rights to their songs.",
    "4. Film producers register copyrights for movies.",
    "5. Trademarks protect movie logos and brands.",
    "6. Game developers protect code and designs.",
    "7. Licensing deals generate revenue for studios.",
    "8. Merchandise uses IP rights legally.",
    "9. Music streaming platforms pay royalties.",
    "10. Unauthorized remixing is infringement.",
    "11. IP ensures fair earnings for creators.",
    "12. It encourages creative industries to grow.",
    "13. Animation studios rely on strong IP protection.",
    "14. Global markets need copyright enforcement.",
    "15. Piracy damages entertainment businesses.",
    "16. IP contracts define ownership clearly.",
    "17. Collaboration needs proper licensing.",
    "18. Royalty management tools track usage.",
    "19. Respecting IP supports artists worldwide.",
    "20. IP awareness builds a fair entertainment ecosystem."
  ],
  questions: [
    { q: "Who owns the copyright for songs?", a: "musicians" },
    { q: "What protects movie logos?", a: "trademark" },
    { q: "Does piracy harm entertainment?", a: "yes" },
    { q: "What ensures fair creator earnings?", a: "ip" },
  ],
},

// --- Lesson 17: Industrial Designs ---
{
  title: "Lesson 17: Industrial Designs",
  content: [
    "1. Industrial design protects the visual look of a product.",
    "2. It covers shape, color, and pattern.",
    "3. Designers register their designs legally.",
    "4. Registration prevents copying of appearance.",
    "5. It does not cover technical features.",
    "6. Good design increases product value.",
    "7. Car and phone companies register designs.",
    "8. Furniture and fashion rely on design rights.",
    "9. Registered designs last 10–25 years.",
    "10. It helps consumers identify genuine products.",
    "11. It encourages artistic creativity.",
    "12. Design piracy leads to financial loss.",
    "13. Governments maintain design registries.",
    "14. Design owners can license their works.",
    "15. Industrial design is part of IP law.",
    "16. It encourages competition and innovation.",
    "17. Unauthorized copying violates rights.",
    "18. Design rights can be renewed.",
    "19. Legal action can stop counterfeiters.",
    "20. Protecting design builds brand trust."
  ],
  questions: [
    { q: "What does industrial design protect?", a: "appearance" },
    { q: "Are colors and shapes part of design?", a: "yes" },
    { q: "Does it protect technical function?", a: "no" },
    { q: "Can design rights be renewed?", a: "yes" },
  ],
},

// --- Lesson 18: IP in Technology ---
{
  title: "Lesson 18: IP in Technology",
  content: [
    "1. Technology companies depend heavily on IP rights.",
    "2. Software is protected by copyright.",
    "3. Inventions are protected by patents.",
    "4. Trademarks protect product names and logos.",
    "5. Confidential data is protected by trade secrets.",
    "6. Licensing allows legal sharing of software.",
    "7. Piracy damages software industries.",
    "8. Open-source software uses flexible licensing.",
    "9. Patents encourage innovation in tech.",
    "10. Tech giants file thousands of patents yearly.",
    "11. IP helps startups secure funding.",
    "12. Respecting code ownership builds trust.",
    "13. IP protects both hardware and software designs.",
    "14. It creates a fair competitive market.",
    "15. Non-disclosure agreements protect inventions.",
    "16. Cloud data is covered by privacy laws.",
    "17. Digital signatures verify authorship.",
    "18. Cybercrime threatens IP security.",
    "19. IP awareness is vital in tech education.",
    "20. Protecting IP drives technological progress."
  ],
  questions: [
    { q: "What protects software?", a: "copyright" },
    { q: "What protects inventions?", a: "patent" },
    { q: "What protects logos?", a: "trademark" },
    { q: "Are NDAs used for invention protection?", a: "yes" },
  ],
},

// --- Lesson 19: IP Enforcement ---
{
  title: "Lesson 19: IP Enforcement",
  content: [
    "1. IP enforcement means protecting rights legally.",
    "2. Governments create IP enforcement agencies.",
    "3. Police can act against counterfeit goods.",
    "4. Courts can issue injunctions to stop misuse.",
    "5. Customs seize fake products at borders.",
    "6. Online platforms remove infringing material.",
    "7. IP owners must report violations quickly.",
    "8. Legal penalties discourage infringement.",
    "9. Businesses should monitor IP use.",
    "10. Technology helps detect digital theft.",
    "11. IP lawyers handle infringement cases.",
    "12. Licensing contracts simplify enforcement.",
    "13. Global cooperation improves enforcement.",
    "14. IP databases track registered works.",
    "15. Training programs build awareness.",
    "16. Enforcement protects innovation incentives.",
    "17. It ensures fair market competition.",
    "18. Strong laws attract foreign investment.",
    "19. Public awareness reduces violations.",
    "20. Enforcement keeps creative industries strong."
  ],
  questions: [
    { q: "What does IP enforcement mean?", a: "protecting rights legally" },
    { q: "Who handles IP cases?", a: "ip lawyers" },
    { q: "Can customs seize fake goods?", a: "yes" },
    { q: "Does enforcement support innovation?", a: "yes" },
  ],
},

// --- Lesson 20: Review & Summary ---
{
  title: "Lesson 20: Review & Summary",
  content: [
    "1. Intellectual Property (IP) includes patents, copyrights, and trademarks.",
    "2. It protects ideas and creations.",
    "3. Copyright covers books, music, and films.",
    "4. Patents protect inventions.",
    "5. Trademarks protect symbols and brands.",
    "6. Designs protect appearance.",
    "7. Fair use allows limited use for education.",
    "8. Moral rights preserve author’s honor.",
    "9. Digital rights secure online works.",
    "10. Open innovation encourages sharing ideas.",
    "11. Creative Commons enables safe content use.",
    "12. Infringement violates IP laws.",
    "13. Enforcement ensures protection.",
    "14. IP is key in entertainment and technology.",
    "15. Registration grants ownership.",
    "16. Global treaties support IP protection.",
    "17. Respecting IP builds creativity and fairness.",
    "18. Students must learn IP ethics.",
    "19. Innovation thrives where IP is protected.",
    "20. IP rights power the knowledge economy."
  ],
  questions: [
    { q: "What does IP protect?", a: "ideas and creations" },
    { q: "What protects inventions?", a: "patent" },
    { q: "What protects brands?", a: "trademark" },
    { q: "Why is IP important?", a: "encourages creativity" },
  ],
},
];
export default function LessonsScreen() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [showFinalScore, setShowFinalScore] = useState(false);

  const lesson = lessons[currentLesson];

  const handleChange = (text: string, index: number) => {
    const updated = [...answers];
    updated[index] = text;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    let correct = 0;
    let wrong = 0;

    lesson.questions.forEach((item, i) => {
      if (answers[i]?.trim().toLowerCase() === item.a.toLowerCase()) correct++;
      else wrong++;
    });

    const newTotal = totalScore + correct;
    setTotalScore(newTotal);
    setScore({ correct, wrong });
    setSubmitted(true);

    Alert.alert("Results", `✅ Correct: ${correct}\n❌ Wrong: ${wrong}`);
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      resetQuiz();
    } else {
      // ✅ If this was the last lesson → show final score
      setShowFinalScore(true);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setAnswers(["", "", "", ""]);
    setSubmitted(false);
    setScore({ correct: 0, wrong: 0 });
  };

  // ✅ Final Score Screen
  if (showFinalScore) {
    const totalQuestions = lessons.reduce((sum, l) => sum + l.questions.length, 0);
    return (
      <View style={styles.finalContainer}>
        <Text style={styles.finalTitle}>🎯 Course Completed!</Text>
        <Text style={styles.finalScore}>
          Your Total Score: {totalScore} / {totalQuestions}
        </Text>
        <Text style={styles.finalMsg}>
          Great job! You’ve completed all 20 lessons successfully. 👏
        </Text>

        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: "#4fa1f0", marginTop: 20 }]}
          onPress={() => {
            setShowFinalScore(false);
            setCurrentLesson(0);
            setTotalScore(0);
            resetQuiz();
          }}
        >
          <Text style={styles.btnText}>Restart Course</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        {lesson.title}
      </Animatable.Text>

      <ScrollView style={styles.scroll}>
        {lesson.content.map((point, i) => (
          <Animatable.Text
            key={i}
            animation="fadeInUp"
            delay={i * 40}
            style={styles.point}
          >
            {point}
          </Animatable.Text>
        ))}

        <View style={styles.quizSection}>
          <Text style={styles.quizTitle}>🧠 Quiz Time</Text>
          {lesson.questions.map((q, i) => (
            <View key={i} style={styles.qBox}>
              <Text style={styles.qText}>{q.q}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                value={answers[i]}
                editable={!submitted}
                onChangeText={(text) => handleChange(text, i)}
              />
              {submitted && (
                <Text
                  style={{
                    marginTop: 5,
                    color:
                      answers[i]?.trim().toLowerCase() === q.a.toLowerCase()
                        ? "green"
                        : "red",
                  }}
                >
                  {answers[i]?.trim().toLowerCase() === q.a.toLowerCase()
                    ? "✅ Correct"
                    : `❌ Correct: ${q.a}`}
                </Text>
              )}
            </View>
          ))}

          {!submitted ? (
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Answers</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.scoreText}>
              ✅ Correct: {score.correct} | ❌ Wrong: {score.wrong}
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.navButtons}>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: "#aaa" }]}
          onPress={prevLesson}
          disabled={currentLesson === 0}
        >
          <Text style={styles.btnText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, { backgroundColor: "#4fa1f0" }]}
          onPress={nextLesson}
        >
          <Text style={styles.btnText}>
            {currentLesson === lessons.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 16 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  scroll: { flex: 1 },
  point: { fontSize: 15, marginVertical: 4, color: "#222" },
  quizSection: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  quizTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#003366" },
  qBox: { marginBottom: 15 },
  qText: { fontSize: 16, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#f9f9f9",
    marginTop: 5,
  },
  submitBtn: {
    backgroundColor: "#4fa1f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "#fff", fontWeight: "700" },
  scoreText: { fontSize: 18, textAlign: "center", marginTop: 10, fontWeight: "700" },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  navBtn: {
    width: "48%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },

  // ✅ Final Score styles
  finalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    padding: 20,
  },
  finalTitle: { fontSize: 26, fontWeight: "800", color: "#004080", marginBottom: 20 },
  finalScore: { fontSize: 22, fontWeight: "700", color: "#0080ff" },
  finalMsg: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#333",
    lineHeight: 22,
  },
});
