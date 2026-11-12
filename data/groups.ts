/**
 * Categories in display order, each with its chants in display order, given by
 * chant number with the slug in a comment. A chant can be in more than one
 * category. The id is the URL slug in /list/<id>. Sangha sets lists set
 * numbers instead of chant numbers, in the same way.
 */
export const groups: { id: string; title: string; chants: string[] }[] = [
  { id: 'sangha-sets', title: 'Sangha sets', chants: [
    "0160", // u-pannanda-paritta-preliminaries
    "0147", // wat-marp-jan-morning-chanting
    "0151", // karuna-morning-chanting
    "0130", // lbv-evening-puja
    "0128", // abhayagiri-evening-chanting
    "0125", // amaravati-evening-chanting
    "0141", // mahamevnawa-main-puja
    "0129", // abhayagiri-funeral-chanting
    "0127", // amaravati-funeral-chanting
    "0126", // amaravati-twelve-parittas
    "0146", // aungsi-sayadaw-dhammacakkappavattana-sutta
    "0150", // cloud-mountain-refuges-and-eight-precepts
    "0152", // narayan-liebenson-blessings
  ] },
  { id: 'reverence', title: 'Reverence', chants: [
    "0001", // vandana
    "0002", // sarana-gamana-patha
    "0003", // dedication-of-offerings
    "0004", // preliminary-homage
    "0005", // homage-to-the-buddha
    "0006", // homage-to-the-dhamma
    "0007", // homage-to-the-sangha
    "0008", // salutation-to-the-triple-gem
    "0009", // closing-homage
    "0010", // recollection-of-the-buddha
    "0011", // supreme-praise-of-the-buddha
    "0012", // recollection-of-the-dhamma
    "0013", // supreme-praise-of-the-dhamma
    "0014", // recollection-of-the-sangha
    "0015", // supreme-praise-of-the-sangha
    "0016", // sambuddhe
    "0017", // nama-kara-siddhi-gatha
    "0018", // namo-kara-atthaka
    "0019", // buddha-dhamma-sangha-guna
    "0020", // atanatiya-paritta-short
    "0021", // salutation-to-the-three-main-objects-of-venerations
    "0022", // salutation-to-the-bodhi-tree
    "0023", // offering-of-lights
    "0024", // offering-of-incense
    "0025", // offering-of-flowers
    "0138", // offering-of-flowers-to-the-triple-gem
    "0135", // offering-of-water
    "0136", // offering-of-medicine
    "0132", // buddha-guna-vandana
    "0133", // dhamma-guna-vandana
    "0134", // sangha-guna-vandana
    "0137", // vajja-pakasana
    "0026", // ten-paramis
    "0148", // buddham-vande
  ] },
  { id: 'reflections', title: 'Reflections', chants: [
    "0028", // reflection-on-the-four-requisites
    "0029", // five-subjects-for-frequent-recollection
    "0030", // ten-subjects-for-frequent-recollection
    "0031", // caturappamanna-obhasana
    "0032", // recollection-after-using-the-requisites
    "0033", // reflection-on-the-off-putting-qualities-of-the-requisites
    "0034", // mettapharana
    "0035", // reflection-on-the-unconditioned
    "0036", // reflection-on-the-thirty-two-parts
    "0037", // sabba-patti-dana-gatha
    "0038", // uddissanadhitthana-gatha
    "0039", // sabbe-satta-sada-hontu
    "0040", // ti-loka-vijaya-raja-patti-dana-gatha
    "0041", // the-teaching-on-striving-according-to-dhamma
    "0042", // dedication-of-merit-to-the-devas-and-others
    "0043", // pasanna-hontu-sabbe-pi
    "0044", // verses-on-friends
    "0045", // reflection-on-impermanence
    "0046", // the-guardian-meditations
    "0047", // yan-dani-me-katam-punnam
    "0048", // metta-bhavana
  ] },
  { id: 'parittas', title: 'Parittas', chants: [
    "0049", // invitation-for-paritta-chanting
    "0153", // invitation-to-the-devas-royal-ceremonies
    "0154", // invitation-to-the-devas-shorter-parittas
    "0155", // invitation-to-the-devas-longer-parittas
    "0050", // invitation-to-the-devas
    "0156", // invitation-to-the-devas-closing
    "0157", // invitation-to-the-devas-closing-at-the-monastery
    "0159", // paritta-parikamma
    "0001", // vandana
    "0158", // vandana-short
    "0002", // sarana-gamana-patha
    "0016", // sambuddhe
    "0017", // nama-kara-siddhi-gatha
    "0018", // namo-kara-atthaka
    "0051", // mangala-sutta
    "0052", // ratana-sutta
    "0053", // karaniya-metta-sutta
    "0131", // karaniya-metta-sutta-short
    "0054", // khandha-paritta
    "0055", // chaddanta-paritta
    "0056", // mora-paritta
    "0057", // vattaka-paritta
    "0019", // buddha-dhamma-sangha-guna
    "0058", // aranne-rukkha-mule-va
    "0020", // atanatiya-paritta-short
    "0059", // sacca-kiriya-gatha
    "0060", // yankinci-ratanam-loke
    "0061", // sakkatva-buddharatanam
    "0062", // angulimala-paritta
    "0063", // bojjhanga-paritta
    "0064", // abhaya-paritta
    "0065", // devata-uyyojana-gatha
    "0066", // jaya-mangala-attha-gatha
    "0067", // jaya-paritta
    "0068", // so-attha-laddho
    "0069", // sa-attha-laddha
    "0070", // te-attha-laddha-sukhita
    "0071", // bhavatu-sabba-mangalam
    "0072", // maha-karuniko-natho-ti-adika-gatha
    "0073", // atanatiya-paritta-long
    "0074", // pabbatopama-gatha
    "0075", // bhara-sutta-gatha
    "0076", // khemakhema-sarana-gamana-paridipika-gatha
    "0077", // bhadd-eka-ratta-gatha
    "0078", // ti-lakkhan-adi-gatha
    "0079", // dhamma-garav-adi-gatha
    "0080", // pathama-buddha-bhasita-gatha
    "0081", // pacchima-ovada-gatha
    "0082", // ye-dhamma-hetuppabhava
    "0083", // nakkhattayakkha
    "0084", // verses-on-respect
    "0085", // blessing-and-protection
  ] },
  { id: 'suttas', title: 'Suttas', chants: [
    "0142", // dhammacakkappavattana-sutta-introduction
    "0145", // dhammacakka-amun
    "0086", // dhammacakkappavattana-sutta
    "0143", // anatta-lakkhana-sutta-introduction
    "0087", // anatta-lakkhana-sutta
    "0144", // aditta-pariyaya-sutta-introduction
    "0088", // aditta-pariyaya-sutta
    "0089", // anapanassati-sutta
    "0090", // dhaj-agga-sutta
    "0091", // girimananda-sutta
    "0051", // mangala-sutta
    "0052", // ratana-sutta
    "0053", // karaniya-metta-sutta
  ] },
  { id: 'funeral', title: 'Funeral chants', chants: [
    "0115", // dhamma-sangani-matika
    "0116", // dhammasangani
    "0117", // vibhanga
    "0118", // dhatukatha
    "0119", // puggalapannatti
    "0120", // kathavatthu
    "0121", // yamaka
    "0122", // patthana-matika-patha
    "0123", // vipassana-bhumi-patha
    "0124", // pamsukula-for-the-dead
    "0140", // pamsukula-for-the-dead-short
    "0139", // pamsukula-for-the-living
  ] },
  { id: 'joy-and-ceremony', title: 'Joy and ceremony', chants: [
    "0092", // transference-of-merit-to-devas
    "0093", // blessing-to-the-world
    "0094", // transference-of-merits-to-departed-ones
    "0095", // the-aspirations
    "0096", // pattanumodana
    "0097", // method-of-confessing-light-offences
    "0098", // formula-for-same-base-offences
    "0099", // eight-precepts
    "0149", // eight-precepts-short
    "0100", // five-precepts
    "0101", // yatha-vari-vaha-pura
    "0102", // sabba-roga-vinimutto
    "0103", // bhojana-dananumodana
    "0104", // aggappasada-sutta-gatha
    "0105", // adasi-me-adi-gatha
    "0106", // kala-dana-sutta-gatha
    "0107", // ratanattay-anubhav-adi-gatha
    "0108", // culla-mangala-cakka-vala
    "0109", // maha-mangala-cakka-vala
    "0110", // vihara-dana-gatha
    "0111", // sangaha-vatthu-gatha
    "0112", // adiya-sutta-gatha
    "0113", // ariya-dhana-gatha
    "0114", // devat-adissa-dakkhina-numodana-gatha
    "0037", // sabba-patti-dana-gatha
    "0038", // uddissanadhitthana-gatha
    "0039", // sabbe-satta-sada-hontu
    "0040", // ti-loka-vijaya-raja-patti-dana-gatha
    "0042", // dedication-of-merit-to-the-devas-and-others
    "0043", // pasanna-hontu-sabbe-pi
    "0047", // yan-dani-me-katam-punnam
  ] },
  { id: 'other', title: 'Other chants', chants: [] },
];
