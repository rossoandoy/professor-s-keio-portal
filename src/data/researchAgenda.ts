export interface ResearchAgendaSection {
  id: string;
  titleEn: string;
  titleJa: string;
  bodyEn: string;
  bodyJa: string;
}

export const researchAgendaSections: ResearchAgendaSection[] = [
  {
    id: "motivation",
    titleEn: "Intellectual Motivation",
    titleJa: "知的動機",
    bodyEn:
      "How do firms, trade, and geography shape each other in an increasingly interconnected yet shock-prone world? My research is motivated by the fundamental tension between the benefits of economic integration — agglomeration, specialization, global value chains — and the vulnerabilities that integration creates when shocks hit: natural disasters, pandemics, policy disruptions, and digital transformation. I seek to understand the micro-level mechanisms through which these forces interact, using both rigorous theory and firm-level empirical evidence.",
    bodyJa:
      "相互接続が進む一方でショックにさらされやすい世界において、企業・貿易・地理はどのように相互形成し合うのか。私の研究は、経済統合の便益（集積、特化、グローバルバリューチェーン）と、ショック発生時に統合がもたらす脆弱性（自然災害、パンデミック、政策変動、デジタル変革）との根本的な緊張関係を出発点としています。厳密な理論と企業レベルの実証データの双方を用いて、これらの力が相互作用するミクロレベルのメカニズムの解明を目指しています。",
  },
  {
    id: "theory",
    titleEn: "Theoretical Contributions",
    titleJa: "理論的貢献",
    bodyEn:
      "My theoretical work extends the new economic geography and heterogeneous-firm trade literature. Key contributions include: (1) introducing spatial sorting of heterogeneous firms, demonstrating how more productive firms select into larger regions (JIE 2010); (2) developing models where multi-product firms and trade costs jointly determine industrial location (RSUE 2023); and (3) integrating market size effects with firm heterogeneity to explain FDI and trade patterns under globalization (JIE 2018). These models generate predictions that I test with micro-level data from Japan and other economies.",
    bodyJa:
      "理論的研究は、新経済地理学と異質的企業の貿易理論の拡張に取り組んでいます。主な貢献は、(1) 異質的企業の空間的選別を導入し、より生産的な企業が大きな地域に集まることを示したこと（JIE 2010）、(2) 多品目企業と貿易費用が共同で産業立地を決定するモデルの構築（RSUE 2023）、(3) 市場規模効果と企業異質性を統合し、グローバル化の下でのFDI・貿易パターンを説明するモデル（JIE 2018）です。これらのモデルから得られる予測を、日本を含む各国のミクロデータで検証しています。",
  },
  {
    id: "empirical",
    titleEn: "Empirical Strategy",
    titleJa: "実証戦略",
    bodyEn:
      "My empirical research exploits historical and contemporary micro-level datasets from Japan. I use natural disasters — the Great Kanto Earthquake of 1923, the Ise Bay Typhoon, the Kobe and Great East Japan Earthquakes, and the Noto Peninsula Earthquake — as quasi-natural experiments to identify causal mechanisms in firm behavior, industrial dynamics, and financial markets (JEH 2019, JMCB 2024). I also analyze the COVID-19 pandemic and digitalization as modern shocks, using large-scale household and firm surveys to study telework adoption and its consequences (Labour 2023, JLR 2024). This combination of historical depth and contemporary breadth is a distinctive feature of my research.",
    bodyJa:
      "実証研究では、日本の歴史的・現代的なミクロレベルデータを活用しています。1923年の関東大震災、伊勢湾台風、阪神・淡路大震災、東日本大震災、能登半島地震などの自然災害を疑似自然実験として、企業行動・産業動態・金融市場における因果メカニズムの特定に用いています（JEH 2019, JMCB 2024）。また、COVID-19パンデミックとデジタル化を現代的ショックとして分析し、大規模な家計・企業調査データを用いてテレワークの普及とその影響を研究しています（Labour 2023, JLR 2024）。歴史的深さと現代的広がりの組み合わせが、私の研究の特徴です。",
  },
  {
    id: "policy",
    titleEn: "Policy Implications",
    titleJa: "政策的含意",
    bodyEn:
      "My research directly informs policy on regional development, trade, disaster preparedness, and digital transformation. I have served on government committees for the Cabinet Office, Ministry of Internal Affairs (telework policy), and Ministry of Economy, Trade and Industry (trade white papers). Through RIETI and NIRA, my work on telework has contributed to national discussions on work-style reform. The empirical evidence from disaster studies provides insights for building economic resilience, while the trade and geography research informs industrial cluster and regional development policies.",
    bodyJa:
      "研究成果は、地域開発、通商、防災、デジタル変革に関する政策に直接貢献しています。内閣府、総務省（テレワーク政策）、経済産業省（通商白書）の政府委員会で委員を務めてきました。RIETIやNIRAを通じたテレワーク研究は、働き方改革に関する国民的議論に寄与しています。災害研究からの実証的知見は経済レジリエンス構築への示唆を提供し、貿易・地理の研究は産業クラスター・地域開発政策に情報を提供しています。",
  },
];
