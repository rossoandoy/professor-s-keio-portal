/**
 * Publication by topic data (from Publication by topic.docx).
 * Papers with multiple topic labels appear under each topic.
 */

export type TopicId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface Topic {
  id: TopicId;
  nameEn: string;
  nameJa: string;
  subtopics?: { labelEn: string; labelJa: string }[];
}

export interface PublicationByTopic {
  authors: string;
  year: number;
  title: string;
  journal: string;
  detail: string;
  topicIds: TopicId[];
  subtopic?: string;
  doi?: string;
  scholar_url?: string;
  /** URL-safe id for detail page; assigned if missing */
  slug?: string;
  abstract?: string;
  pdf_url?: string;
  preprint_url?: string;
  citation_count?: number;
  citation_source?: string;
  selected?: boolean;
}

export const topics: Topic[] = [
  {
    id: "A",
    nameEn: "International trade, FDI and Globalization",
    nameJa: "国際貿易・FDI・グローバル化",
  },
  {
    id: "B",
    nameEn: "Trade, Space and economic geography",
    nameJa: "貿易・空間・経済地理",
    subtopics: [
      { labelEn: "Economic geography with firm heterogeneity", labelJa: "企業異質性と経済地理" },
    ],
  },
  {
    id: "C",
    nameEn: "Trade, Energy and Environment",
    nameJa: "貿易・エネルギー・環境",
    subtopics: [
      { labelEn: "Environment and trade", labelJa: "環境と貿易" },
      { labelEn: "Pollution Haven", labelJa: "汚染の楽園" },
      { labelEn: "Energy", labelJa: "エネルギー" },
    ],
  },
  {
    id: "D",
    nameEn: "Regional Economy and public policy",
    nameJa: "地域経済と公共政策",
    subtopics: [
      { labelEn: "Regional banking market", labelJa: "地域金融市場" },
      { labelEn: "Industrial cluster policies", labelJa: "産業クラスター政策" },
      { labelEn: "Regional economy", labelJa: "地域経済" },
    ],
  },
  {
    id: "E",
    nameEn: "Natural Disaster and Regional Economy",
    nameJa: "自然災害と地域経済",
    subtopics: [
      { labelEn: "Noto Earthquake", labelJa: "能登半島地震" },
      { labelEn: "Fire insurance", labelJa: "火災保険" },
      { labelEn: "Disaster and social capital", labelJa: "災害とソーシャルキャピタル" },
      { labelEn: "Great Kanto Earthquake", labelJa: "関東大震災" },
      { labelEn: "Spanish flu", labelJa: "スペインかぜ" },
      { labelEn: "Technology destruction", labelJa: "技術破壊" },
      { labelEn: "Covid-19", labelJa: "COVID-19" },
      { labelEn: "Great East Japan Earthquake", labelJa: "東日本大震災" },
      { labelEn: "Kobe Earthquake", labelJa: "阪神・淡路大震災" },
      { labelEn: "Ise-bay typhoon", labelJa: "伊勢湾台風" },
      { labelEn: "Vaccination", labelJa: "ワクチン接種" },
    ],
  },
  {
    id: "F",
    nameEn: "Digital Economy",
    nameJa: "デジタル経済",
    subtopics: [
      { labelEn: "Telework", labelJa: "テレワーク" },
    ],
  },
  {
    id: "G",
    nameEn: "Quantitative History in Japan",
    nameJa: "日本における計量経済史",
    subtopics: [
      { labelEn: "Regional banking market", labelJa: "地域金融市場" },
      { labelEn: "Spanish flu", labelJa: "スペインかぜ" },
      { labelEn: "Great Kanto Earthquake", labelJa: "関東大震災" },
      { labelEn: "Ise-bay typhoon", labelJa: "伊勢湾台風" },
      { labelEn: "Gravity model and history", labelJa: "重力モデルと歴史" },
    ],
  },
];

export const publicationsByTopic: PublicationByTopic[] = [
  {
    authors: "Okubo, T. and Noy, I.",
    year: 2026,
    title: "Bonding social capital, disaster experience, and post-disaster giving in Japan",
    journal: "Disasters",
    detail: "50(2), e70045",
    topicIds: ["E"],
    subtopic: "Noto Earthquake"
  },
  {
    authors: "Okubo, T. and Sasahara, A.",
    year: 2025,
    title: "Quality trade and transportation costs",
    journal: "Economics Letters",
    detail: "112705",
    topicIds: ["A"],
    subtopic: "Trade costs"
  },
  {
    authors: "Hoffmann, M, Okazaki, T. and Okubo, T.",
    year: 2025,
    title: "Branch Banking and Regional Financial Markets: Evidence from Prewar Japan",
    journal: "Financial History Review",
    detail: "32(3), pp.279-318",
    topicIds: ["D", "G"],
    subtopic: "Regional banking market"
  },
  {
    authors: "Ishikawa, J. and Okubo, T.",
    year: 2025,
    title: "Cross-border Technology Licensing with R&D Opportunity and Government Intervention",
    journal: "Journal of the Japanese and International Economies",
    detail: "76, 101364",
    topicIds: ["A"],
    subtopic: "International trade"
  },
  {
    authors: "Okazaki, T., Okubo, T. and Strobl, E.",
    year: 2025,
    title: "Large Fires and the Rise of Fire Insurance in Early Twentieth Century Japan",
    journal: "Journal of Economic History",
    detail: "85(3), 701-729",
    topicIds: ["E"],
    subtopic: "Fire insurance",
    selected: true, doi: "10.1017/S0022050724000158"
  },
  {
    authors: "Okubo, T. and Noy, I",
    year: 2025,
    title: "Vaccination decisions and social capital in Japan",
    journal: "SSM Population Health",
    detail: "30. 101769",
    topicIds: ["E"],
    subtopic: "Disaster and social capital"
  },
  {
    authors: "Ito K., Endoh M., Jinji N., Matsuura T., Okubo T., Sasahara A.",
    year: 2025,
    title: "Margins, concentration, and the performance of firms in international trade: Evidence from Japanese customs data",
    journal: "Journal of the Japanese and International Economies",
    detail: "75, 101340",
    topicIds: ["A"],
    subtopic: "International trade and Japanese firms"
  },
  {
    authors: "Okubo, T.",
    year: 2024,
    title: "Work from Home and Time Allocation: Evidence from Time-use Data in Japan",
    journal: "Journal of Labor Research",
    detail: "45(4) , 598-630",
    topicIds: ["F"],
    subtopic: "Telework"
  },
  {
    authors: "Forslid, R. and Okubo, T.",
    year: 2024,
    title: "Premature Agglomeration? Two phases of development with spatial sorting",
    journal: "Manchester School",
    detail: "92(6), 636-662",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okazaki, T, Okubo, T and Strobl, E.",
    year: 2024,
    title: "The Bright and Dark Sides of a Central Bank’s Financial Support to Local Banks after a Natural Disaster: Evidence from the Great Kanto Earthquake, 1923 Japan",
    journal: "Journal of Money, Credit, and Banking",
    detail: "56(6), 1439-1477",
    topicIds: ["E"],
    subtopic: "Great Kanto Earthquake",
    selected: true,
    doi: "10.1111/jmcb.13141"
  },
  {
    authors: "Okubo, T.",
    year: 2023,
    title: "Non-Routine Tasks and ICT Tools in Telework",
    journal: "Labour",
    detail: "38(2), p177-202",
    topicIds: ["F"],
    subtopic: "Telework"
  },
  {
    authors: "Baldwin, R. and Okubo, T.",
    year: 2023,
    title: "Are Software Automation and Teleworkers Substitutes? Preliminary Evidence from Japan",
    journal: "The World Economy",
    detail: "47(4), 1531-1556",
    topicIds: ["F"],
    subtopic: "Telework"
  },
  {
    authors: "Noy, I., Okubo, T., & Strobl, E.",
    year: 2023,
    title: "The Japanese Textile Sector and the Influenza Pandemic of 1918-1920",
    journal: "Journal of Regional Science",
    detail: "63(5), 1192-1227",
    topicIds: ["E", "G"],
    subtopic: "Spanish flu"
  },
  {
    authors: "Forslid, R and Okubo, T",
    year: 2023,
    title: "Trade, Location, and Multi-product Firms",
    journal: "Regional Science and Urban Economics",
    detail: "100, 103891",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity",
    selected: true, doi: "10.1016/j.regsciurbeco.2023.103891"
  },
  {
    authors: "Mohan, P. Okubo, T and Strobl, E.",
    year: 2023,
    title: "Natural Disasters and Industrial Production Efficiency: Evidence from Pre-war Japan",
    journal: "Regional Studies",
    detail: "57(10), 2054-2072",
    topicIds: ["E"],
    subtopic: "Technology destruction"
  },
  {
    authors: "Okubo, T., & Watabe, Y.",
    year: 2023,
    title: "Networked FDI and third-country intra-firm trade. International Review of Economics & Finance",
    journal: "",
    detail: "83, 591-606",
    topicIds: ["A"],
    subtopic: "Networked FDI"
  },
  {
    authors: "Okubo, T.",
    year: 2022,
    title: "Traveling and eating out during the COVID-19 pandemic: The Go To campaign policies in Japan",
    journal: "Japan and the World Economy",
    detail: "64, 101157",
    topicIds: ["E"],
    subtopic: "Covid-19"
  },
  {
    authors: "Noy, I, Okubo, T., Strobl, E. and Tveit, T.",
    year: 2022,
    title: "The Fiscal Costs of Earthquakes in Japan",
    journal: "International Tax and Public Finance",
    detail: "30(5), 1225-1250",
    topicIds: ["E"],
    subtopic: "Disaster and government spending"
  },
  {
    authors: "Okubo, T.",
    year: 2022,
    title: "Telework in the Spread of COVID-19",
    journal: "Information Economics and Policy",
    detail: "60, 100987",
    topicIds: ["F"],
    subtopic: "Telework"
  },
  {
    authors: "Schmidt-Petri, C., C. Schröder, T. Okubo, D.Graeber, and T. Rieger",
    year: 2022,
    title: "Social Norms and Preventive Behaviors in Japan and Germany During the COVID-19 Pandemic",
    journal: "Frontiers in Public Health (section Public Health Policy)",
    detail: "10, 842177",
    topicIds: ["E"],
    subtopic: "Covid-19 and Social Norm"
  },
  {
    authors: "Kato, H. and T. Okubo",
    year: 2022,
    title: "The Resilience of FDI to Natural Disasters through Industrial Linkages",
    journal: "Environmental and Resource Economics",
    detail: "82(1), p.177-225",
    topicIds: ["A", "E"],
    subtopic: "Disaster and FDI"
  },
  {
    authors: "Hoffmann, M and T. Okubo",
    year: 2022,
    title: "`By a Silken Thread': regional banking integration and credit reallocation during Japan's Lost Decade",
    journal: "Journal of International Economics",
    detail: "137, 103579",
    topicIds: ["D", "G"],
    subtopic: "Regional banking market",
    selected: true, doi: "10.1016/j.jinteco.2022.103579"
  },
  {
    authors: "Okubo, T, T. Okazaki and E. Tomiura",
    year: 2022,
    title: "Industrial cluster policy and transaction networks: Evidence from firm-level data in Japan",
    journal: "Canadian Journal of Economics",
    detail: "55(4), 1990-2035",
    topicIds: ["D"],
    subtopic: "Industrial cluster policies",
    selected: true, doi: "10.1111/caje.12575"
  },
  {
    authors: "Felbermayr, G., & Okubo, T.",
    year: 2022,
    title: "Individual preferences on trade liberalization: evidence from a Japanese household survey. Review of World Economics",
    journal: "",
    detail: "158, pp.305-330",
    topicIds: ["A"],
    subtopic: "Globalization and public preference"
  },
  {
    authors: "Okubo, T. A. Inoue, and K. Sekijima",
    year: 2021,
    title: "Who got vaccinated for COVID-19? Evidence from Japan",
    journal: "Vaccines",
    detail: "vol.9, 1505",
    topicIds: ["E"],
    subtopic: "Vaccination"
  },
  {
    authors: "Cole, M. A., Elliott, R. R., Okubo, T., & Zhang, L.",
    year: 2021,
    title: "Importing, Outsourcing and Pollution Offshoring",
    journal: "Energy Economics",
    detail: "103, 105562",
    topicIds: ["C"],
    subtopic: "Pollution Haven"
  },
  {
    authors: "Okubo, T.",
    year: 2021,
    title: "Public Preferences on Immigration in Japan",
    journal: "Japan and the World Economy",
    detail: "58, 101073",
    topicIds: ["A"],
    subtopic: "Globalization and public preference"
  },
  {
    authors: "Forslid, R., & Okubo, T.",
    year: 2021,
    title: "Agglomeration of low-productive entrepreneurs to large regions: a simple model. Spatial Economic Analysis",
    journal: "",
    detail: "16 (4), p. 471-486",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T., & Strobl, E.",
    year: 2021,
    title: "Natural Disasters, Firm Survival and Growth: Evidence from the Ise Bay Typhoon, Japan",
    journal: "Journal of Regional Science",
    detail: "61(5), p.944-970",
    topicIds: ["E", "G"],
    subtopic: "Ise-bay typhoon"
  },
  {
    authors: "Okubo, T, A.Inoue, & K. Sekijima.",
    year: 2021,
    title: "Teleworker performance in the COVID-19 era in Japan",
    journal: "Asian Economic Papers",
    detail: "20(2) pp.175-192",
    topicIds: ["F"],
    subtopic: "Telework"
  },
  {
    authors: "Okubo, T., Narita, D., Rehdanz, K., & Schroeder, C.",
    year: 2020,
    title: "Preferences for nuclear power in post-Fukushima Japan: Evidence from a large nationwide household survey. Energies",
    journal: "",
    detail: "13(11), 2938",
    topicIds: ["E", "G"],
    subtopic: "Great East Japan Earthquake"
  },
  {
    authors: "Okubo, T., & Tomiura, E.",
    year: 2019,
    title: "Regional Variations in Exporters' Productivity Premium: Theory and Evidence",
    journal: "Review of International Economics",
    detail: "27(3) pp. 803-821",
    topicIds: ["A", "D"],
    subtopic: "Regional economy and globalization"
  },
  {
    authors: "Baldwin, R., & Okubo, T.",
    year: 2019,
    title: "GVC journeys: Industrialisation and Deindustrialisation in the Age of the Second Unbundling",
    journal: "Journal of the Japanese and International Economies",
    detail: "52, pp. 53-67",
    topicIds: ["A"],
    subtopic: "Global Value Chain"
  },
  {
    authors: "Okazaki, T. Okubo, T and Strobl, E",
    year: 2019,
    title: "Creative Destruction of Industries: Yokohama City in the Great Kanto Earthquake, 1923",
    journal: "Journal of Economic History",
    detail: "79(1) pp.1-31. Lead article",
    topicIds: ["E", "G"],
    subtopic: "Great Kanto Earthquake",
    selected: true, doi: "10.1017/S0022050718000697"
  },
  {
    authors: "Cole, M. A., Elliott, R. J., Okubo, T., and Strobl, E.",
    year: 2019,
    title: "Natural Disasters and Spatial Heterogeneity in Damages: The Birth, Life and Death of Manufacturing Plants",
    journal: "Journal of Economic Geography",
    detail: "19(2) pp.373-408",
    topicIds: ["E"],
    subtopic: "Kobe Earthquake"
  },
  {
    authors: "Felbermayr, G., Kimura, F., Okubo, T., and Steininger, M.",
    year: 2019,
    title: "Quantifying the EU-Japan Economic Partnership Agreement. Journal of the Japanese and International Economies. 51",
    journal: "",
    detail: "pp.110-128",
    topicIds: ["A"],
    subtopic: "Free Trade Agreement"
  },
  {
    authors: "Forslid,R., Okubo, T., and Ulltveit-Moe K-H",
    year: 2018,
    title: "Why are firms that export cleaner? International trade, abatement and environmental emissions",
    journal: "Journal of Environmental Economics and Management",
    detail: "91, pp.166-183",
    topicIds: ["C"],
    subtopic: "Environment and trade",
    selected: true, doi: "10.1016/j.jeem.2018.06.002"
  },
  {
    authors: "Kato, H and Okubo, T",
    year: 2018,
    title: "Market Size in Globalization",
    journal: "Journal of International Economics",
    detail: "111, 34-60",
    topicIds: ["A"],
    subtopic: "Trade",
    selected: true, doi: "10.1016/j.jinteco.2018.01.005"
  },
  {
    authors: "Forslid, F, Okubo, T. and Sanctuary, M.",
    year: 2017,
    title: "Trade Liberalization, Transboundary Pollution, and Market Size",
    journal: "Journal of the Association of Environmental and Resource Economists",
    detail: "vol. 4 (3), Part 1, 927-957",
    topicIds: ["C"],
    subtopic: "Environment and trade"
  },
  {
    authors: "Hayakawa, K. Ito, T and Okubo, T.",
    year: 2017,
    title: "On the Stability of Intra-industry Trade",
    journal: "Journal of the Japanese and International Economies. 45",
    detail: "1-12. (lead article)",
    topicIds: ["A"],
    subtopic: "Intra-industry trade"
  },
  {
    authors: "Ishikawa, J and Okubo, T.",
    year: 2017,
    title: "Greenhouse-Gas Emission Controls and Firm Locations in North-South Trade",
    journal: "Environmental and Resource Economics",
    detail: "67(4) , 637-660.(lead article)",
    topicIds: ["C"],
    subtopic: "Environment and economic geography"
  },
  {
    authors: "Rehdanz, K, Schröder, C, Narita, D and Okubo, T.",
    year: 2017,
    title: "Public Preferences for Alternative Electricity Mixes in Post-Fukushima Japan",
    journal: "Energy Economics",
    detail: "65, pp. 262-270",
    topicIds: ["E", "C"],
    subtopic: "Great East Japan Earthquake and energy"
  },
  {
    authors: "Cole, M. A., Elliott, R. J., Okubo, T., and Strobl, E.",
    year: 2017,
    title: "Pre-Disaster Planning and Post-Disaster Aid: Examining the impact on plants of the Great East Japan Earthquake",
    journal: "International Journal of Disaster Risk Reduction",
    detail: "21, pp.291-302",
    topicIds: ["E"],
    subtopic: "Great East Japan Earthquake"
  },
  {
    authors: "Ishikawa, J and Okubo, T",
    year: 2016,
    title: "Greenhouse-gas Emission Controls and International Carbon Leakage through Trade Liberalization",
    journal: "International Economy vol. 19",
    detail: "pp.1-22",
    topicIds: ["C"],
    subtopic: "Environment and economic geography"
  },
  {
    authors: "Ito, T and Okubo, T",
    year: 2016,
    title: "Product Quality and Intra-industry Trade",
    journal: "Singapore Economic Review 61(4)",
    detail: "",
    topicIds: ["A"],
    subtopic: "Intra-industry trade"
  },
  {
    authors: "Elliott, R.J.R and Okubo, T",
    year: 2016,
    title: "Ecological Modernization in Japan: The Role of Interest rate Subsidies and Voluntary Pollution Control Agreements",
    journal: "Asian Economic Papers 15(3): pp.66-88",
    detail: "",
    topicIds: ["C"],
    subtopic: "Environment and pollution controls"
  },
  {
    authors: "Okubo, T and Tomiura, E",
    year: 2016,
    title: "Multi-plant Operation and Corporate Headquarters Separation: Evidence from Japanese Plant-level Panel Data",
    journal: "Japan and World Economy 39: pp.12-22",
    detail: "",
    topicIds: ["D"],
    subtopic: "Regional economy and geography"
  },
  {
    authors: "Ito, T and Okubo, T",
    year: 2016,
    title: "The Impact of the Euro on the Quality of Trade: Evidence from the European Union",
    journal: "The Manchester School 84(4): pp.506-527",
    detail: "",
    topicIds: ["A"],
    subtopic: "Intra-industry trade"
  },
  {
    authors: "Forslid, R and Okubo, T.",
    year: 2016,
    title: "Big is Beautiful when Exporting",
    journal: "Review of International Economics 24(2): pp. 330-343",
    detail: "",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T., Watabe, Y. and Furuyama, K.",
    year: 2016,
    title: "Export of Recyclable Materials: Evidence from Japan",
    journal: "Asian Economic Papers 15(1): pp.134-148",
    detail: "",
    topicIds: ["A"],
    subtopic: "Recycle trade"
  },
  {
    authors: "Rehdanz, K, Welsch, H, Narita, D and Okubo, T.",
    year: 2015,
    title: "Well-being Effects of a Major Natural Disaster: The Case of Fukushima",
    journal: "Journal of Economic Behavior & Organization",
    detail: "116, pp.500-517",
    topicIds: ["E"],
    subtopic: "Great East Japan Earthquake"
  },
  {
    authors: "Schröder, C, Rehdanz, K, Narita, D and Okubo, T.",
    year: 2015,
    title: "The Decline in Average Family Size and its Implications for the Average Benefits of Within‐household Sharing",
    journal: "Oxford Economic Papers 67(3): pp.760-780",
    detail: "",
    topicIds: ["C"],
    subtopic: "Energy"
  },
  {
    authors: "Kondo, K and Okubo, T",
    year: 2015,
    title: "Interregional Labour Migration and Real Wage Disparities: Evidence from Japan",
    journal: "Papers in Regional Science.94(1): pp.67-87",
    detail: "",
    topicIds: ["B"],
    subtopic: "Economic geography and labor mobility"
  },
  {
    authors: "Forslid, R and Okubo, T",
    year: 2015,
    title: "Which Firms are Left in the Periphery? Spatial Sorting of Heterogeneous Firms with Scale Economies in Transportation",
    journal: "Journal of Regional Science",
    detail: "55(1): pp.51-65",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T. Picard, P.M and Thisse, J-F",
    year: 2014,
    title: "On the Impact of Competition on Trade and Firm Location",
    journal: "Journal of Regional Science",
    detail: "54(5): pp. 731-754.  (lead article)",
    topicIds: ["B"],
    subtopic: "Economic geography"
  },
  {
    authors: "Cole, M.A., Elliott, R.J.R., and Okubo, T.",
    year: 2014,
    title: "International Environmental Outsourcing",
    journal: "Review of World Economics (Weltwirtschaftliches Archiv)",
    detail: "150, pp.639-664 (lead article)",
    topicIds: ["C"],
    subtopic: "Pollution Haven"
  },
  {
    authors: "Baldwin, R.E. and Okubo, T.",
    year: 2014,
    title: "Tax Competition with Heterogeneous Firms",
    journal: "Spatial Economic Analysis, 9(3)",
    detail: "pp.309-326. Note: This article is chosen in editor’s (Bernard Fingleton) article collection of the 10th volume of Spatial Economic Analysis.　(http://explore.tandfonline.com/page/pgas/rsea-10-years)",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Baldwin, R.E. and Okubo, T",
    year: 2014,
    title: "Networked FDI: Sales and sourcing patterns of Japanese foreign affiliates",
    journal: "The World Economy",
    detail: "37(8), pp.1051-1080",
    topicIds: ["A"],
    subtopic: "Networked FDI"
  },
  {
    authors: "Okubo, T and Tomiura, E",
    year: 2014,
    title: "Skew Productivity Distributions and Agglomeration: Evidence from plant-level data",
    journal: "Regional Studies",
    detail: "48(9), pp.1514-1528",
    topicIds: ["D"],
    subtopic: "Regional economy"
  },
  {
    authors: "Forslid, R and Okubo, T",
    year: 2014,
    title: "Spatial Sorting with Heterogeneous Firms and Heterogeneous Sectors",
    journal: "Regional Science and Urban Economics",
    detail: "46(3), pp.42-56",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T, Kimura, F and Teshima, N",
    year: 2014,
    title: "Asian Fragmentation in the Global Financial Crisis",
    journal: "International Review of Economics and Finance",
    detail: "31, pp.114-127",
    topicIds: ["A"],
    subtopic: "Fragmentation and Supply Chain"
  },
  {
    authors: "Baldwin, R.E. and Okubo, T",
    year: 2014,
    title: "International Trade, Offshoring and Heterogeneous Firms",
    journal: "Review of International Economics",
    detail: "22(1), pp.59-72",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Cole, M.A., Elliott, R.J.R, Okubo, T and Zhou, Y",
    year: 2013,
    title: "The Carbon Dioxide Emissions of Firms: A Spatial Analysis",
    journal: "Journal of Environmental Economics and Management",
    detail: "65(2), pp.290-309",
    topicIds: ["C"],
    subtopic: "Pollution Haven"
  },
  {
    authors: "Okubo, T",
    year: 2013,
    title: "Energy-saving Regulations and Commodity Prices",
    journal: "Environmental Economics and Policy Studies 15(1)",
    detail: "pp.93-132",
    topicIds: ["C"],
    subtopic: "Energy"
  },
  {
    authors: "Picard, P.M. and Okubo, T",
    year: 2012,
    title: "Firms Locations under Demand Heterogeneity",
    journal: "Regional Science and Urban Economics 42(6)",
    detail: "pp.961-974",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Ito, T and Okubo, T",
    year: 2012,
    title: "New Aspects of Intra-industry Trade in EU Countries",
    journal: "The World Economy 35(9)",
    detail: "pp.1126-1138",
    topicIds: ["A"],
    subtopic: "Intra-industry trade"
  },
  {
    authors: "Forslid, R and Okubo, T",
    year: 2012,
    title: "On the Development Strategy of Countries of Intermediate Size-An Analysis of Heterogeneous Firms in a Multi-region Framework",
    journal: "European Economic Review 56",
    detail: "pp.747-756",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T",
    year: 2012,
    title: "Anti-agglomeration Subsidies with Heterogeneous Firms",
    journal: "Journal of Regional Science 52(2)",
    detail: "pp.285-299",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Artis, M.J. and Okubo, T.",
    year: 2012,
    title: "Business cycle, currency and trade, revisited",
    journal: "Pacific Economic Review 17(1)",
    detail: "pp.160-180",
    topicIds: ["A"],
    subtopic: "Globalization and business cycle"
  },
  {
    authors: "Okubo, T and Tomiura, E.",
    year: 2012,
    title: "Industrial Relocation Policy, Productivity and Heterogeneous Plants: Evidence from Japan",
    journal: "Regional Science and Urban Economics 42(1)",
    detail: "pp. 230-239",
    topicIds: ["B", "D"],
    subtopic: "Industrial cluster policy and economic geography"
  },
  {
    authors: "Fukao, K and Okubo, T.",
    year: 2011,
    title: "Why Has the Border Effect in the Japanese Machinery Sectors Declined? The role of business networks in East Asian-machinery trade",
    journal: "Journal of Economic Integration 26(4)",
    detail: "pp.651-671",
    topicIds: ["A"],
    subtopic: "Gravity model"
  },
  {
    authors: "Okubo, T",
    year: 2011,
    title: "Ricardian Comparative Advantage and Geographical Concentration. Review of Development Economics 15(4)",
    journal: "",
    detail: "pp.620-637",
    topicIds: ["B"],
    subtopic: "Economic geography"
  },
  {
    authors: "Ishikawa, J and Okubo, T.",
    year: 2011,
    title: "Environmental Product Standards in North-South Trade",
    journal: "Review of Development Economics",
    detail: "15(3), pp.458-473",
    topicIds: ["C"],
    subtopic: "Environment and economic geography"
  },
  {
    authors: "Artis, M.J. and Okubo, T.",
    year: 2011,
    title: "Does international trade really lead to business cycle synchronization? A panel data approach. The Manchester School. 79(2)",
    journal: "",
    detail: "pp.318-332",
    topicIds: ["D"],
    subtopic: "Regional business cycle"
  },
  {
    authors: "Artis, M. J., and Okubo, T.",
    year: 2011,
    title: "The Intranational Business Cycle in Japan. Oxford Economic Papers.63(1)",
    journal: "",
    detail: "pp.111-133",
    topicIds: ["D"],
    subtopic: "Regional business cycle"
  },
  {
    authors: "Ishikawa, J and Okubo, T.",
    year: 2010,
    title: "Environmental and Trade Policies for Oligopolistic Industry in the Presence of Consumption",
    journal: "International Economy",
    detail: "14. pp.58-77",
    topicIds: ["C"],
    subtopic: "Environment and Trade"
  },
  {
    authors: "Okubo, T. Picard, P.M and Thisse, J-F",
    year: 2010,
    title: "The spatial selection of heterogeneous firms",
    journal: "Journal of International Economics 82(2)",
    detail: "pp.230-237",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity",
    selected: true, doi: "10.1016/j.jinteco.2009.10.005"
  },
  {
    authors: "Cole, M.A., Elliott, R.J.R., and Okubo, T.",
    year: 2010,
    title: "Trade, Environmental Regulations and Industrial Mobility: An Industry-level Study in Japan",
    journal: "Ecological Economics",
    detail: "69 (10), pp.1995-2002",
    topicIds: ["C"],
    subtopic: "Pollution Haven"
  },
  {
    authors: "Artis, M. J., and Okubo, T.",
    year: 2010,
    title: "The UK Intranational Business Cycle. Journal of Forecasting. 29 (1)",
    journal: "",
    detail: "pp71-93",
    topicIds: ["D"],
    subtopic: "Regional business cycle"
  },
  {
    authors: "Baldwin, R.E., and Okubo, T.",
    year: 2009,
    title: "Tax Reform",
    journal: "Delocation and Heterogeneous Firms. Scandinavian Journal of Economics 111(4)",
    detail: "pp.741-764",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Okubo, T",
    year: 2009,
    title: "Trade Liberalisation and Agglomeration with Firm Heterogeneity -Forward and Backward Linkages. Regional Science and Urban Economics 39 (5)",
    journal: "",
    detail: "pp.530-541",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity"
  },
  {
    authors: "Artis, M. J, and Okubo, T.",
    year: 2009,
    title: "Globalisation and Business Cycle Transmission.  North American Journal of Economics and Finance. 20(2)",
    journal: "",
    detail: "pp.91-99",
    topicIds: ["A"],
    subtopic: "Globalization and Business cycle"
  },
  {
    authors: "Okubo, T.",
    year: 2009,
    title: "Firm Heterogeneity and Ricardian Comparative advantage within and across sectors. Economic Theory  38 (3)",
    journal: "",
    detail: "pp.533-559",
    topicIds: ["A"],
    subtopic: "International trade with firm heterogeneity"
  },
  {
    authors: "Okubo, T.",
    year: 2008,
    title: "Shake Hands or Shake Apart? International Relationship of Japan with Global Blocs. Economie Internationale",
    journal: "",
    detail: "113, pp.35-64",
    topicIds: ["A", "G"],
    subtopic: "Gravity model and history"
  },
  {
    authors: "Okubo, T.",
    year: 2007,
    title: "Intra-industry Trade",
    journal: "Reconsidered: The Role of Technology Transfer and Foreign Direct Investment. The World Economy",
    detail: "vol. 30 issue 12, pp.1855-1876",
    topicIds: ["A"],
    subtopic: "Intra-industry trade"
  },
  {
    authors: "Okubo, T",
    year: 2007,
    title: "Trade Bloc Formation in Interwar Japan-A Gravity Model Analysis. Journal of the Japanese and International Economies",
    journal: "",
    detail: "21, pp.214-236",
    topicIds: ["A", "G"],
    subtopic: "Gravity model and history"
  },
  {
    authors: "Baldwin, R.E., and Okubo, T.",
    year: 2006,
    title: "Heterogeneous firms",
    journal: "agglomeration and economic geography: spatial selection and sorting. Journal of Economic Geography",
    detail: "6, pp.323-346",
    topicIds: ["B"],
    subtopic: "Economic geography with firm heterogeneity",
    doi: "10.1093/jeg/lbi017"
  },
  {
    authors: "Okubo, T.",
    year: 2004,
    title: "Border Effect in the Japanese Market – A Gravity Model Analysis. Journal of the Japanese and International Economies 18",
    journal: "",
    detail: "2004, pp.1-11 (lead article)",
    topicIds: ["A"],
    subtopic: "Gravity model"
  },
  {
    authors: "Fukao, K, Okubo, T and Stern, R.M.",
    year: 2003,
    title: "Econometric Analysis of Trade Diversion under NAFTA” North American Journal of Economics and Finance 14",
    journal: "",
    detail: "2003, pp.3-24 (lead article)",
    topicIds: ["A"],
    subtopic: "Free Trade Agreement"
  }
];
/** URL slug for research theme pages (topic id -> slug). */
export const topicIdToSlug: Record<TopicId, string> = {
  A: "international-trade-fdi-globalization",
  B: "trade-space-economic-geography",
  C: "trade-energy-environment",
  D: "regional-economy-public-policy",
  E: "natural-disaster-regional-economy",
  F: "digital-economy",
  G: "quantitative-history-japan",
};

const slugToTopicId: Record<string, TopicId> = Object.fromEntries(
  (Object.entries(topicIdToSlug) as [TopicId, string][]).map(([id, slug]) => [slug, id])
) as Record<string, TopicId>;

export function getTopicBySlug(slug: string): Topic | undefined {
  const id = slugToTopicId[slug];
  return id ? topics.find((t) => t.id === id) : undefined;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureSlugs(): void {
  const used = new Set<string>();
  publicationsByTopic.forEach((p) => {
    if (p.slug) {
      used.add(p.slug);
      return;
    }
    let base = slugify(p.title) + "-" + p.year;
    let s = base;
    let n = 0;
    while (used.has(s)) {
      n++;
      s = base + "-" + n;
    }
    used.add(s);
    p.slug = s;
  });
}
ensureSlugs();

/** All publications (single source of truth). */
export function getAllPublications(): PublicationByTopic[] {
  return publicationsByTopic;
}

/** Get publication by slug for detail page. */
export function getPublicationBySlug(slug: string): PublicationByTopic | undefined {
  return publicationsByTopic.find((p) => p.slug === slug);
}

/** Get publications that belong to a given topic (including multi-topic papers). */
export function getPublicationsForTopic(topicId: TopicId): PublicationByTopic[] {
  return publicationsByTopic.filter((p) => p.topicIds.includes(topicId));
}

/** Get selected publications (for top-page section). Uses selected flag or first N by year, sorted year desc. */
export function getSelectedPublications(): PublicationByTopic[] {
  const withFlag = publicationsByTopic.filter((p) => p.selected);
  const list = withFlag.length > 0 ? withFlag : [...publicationsByTopic].slice(0, 10);
  return [...list].sort((a, b) => b.year - a.year);
}
