
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const FAQSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
    { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
    { code: 'tn', name: 'Setswana', flag: '🇿🇦' },
    { code: 'nso', name: 'Sepedi', flag: '🇿🇦' },
    { code: 'ts', name: 'Xitsonga', flag: '🇿🇦' },
    { code: 've', name: 'Tshivenda', flag: '🇿🇦' }
  ];

  const translations = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about Divine Mobile",
      faqs: [
        {
          question: "How does the cashback system work?",
          answer: "Earn 2.5% cashback on every airtime purchase with our OneCard system. Rewards are automatically credited to your account and can be used for future purchases or withdrawn."
        },
        {
          question: "Which networks are supported?",
          answer: "We support all major South African networks including MTN, Vodacom, Cell C, Telkom Mobile, and Rain Mobile. Get the best deals across all networks in one platform."
        },
        {
          question: "How quickly is airtime delivered?",
          answer: "Our AI-powered system processes airtime purchases in under 30 seconds. Most transactions are completed instantly with real-time confirmation."
        },
        {
          question: "Is it safe to use Divine Mobile?",
          answer: "Yes, absolutely. We use bank-level encryption and are PCI DSS compliant. All transactions are secured with the latest security protocols to protect your data and money."
        },
        {
          question: "Can I become a vendor?",
          answer: "Yes! Join our vendor network to increase your revenue by up to 40%. The registration process takes 24 hours and includes full training and support."
        },
        {
          question: "What is the USSD code?",
          answer: "You can access Divine Mobile services by dialing *120*888# from any mobile phone. This works on all networks without needing the app or internet connection."
        }
      ]
    },
    af: {
      title: "Gereelde Gevra Vrae",
      subtitle: "Alles wat jy moet weet oor Divine Mobile",
      faqs: [
        {
          question: "Hoe werk die terugbetaling sisteem?",
          answer: "Verdien 2.5% terugbetaling op elke lugtyd aankoop met ons OneCard sisteem. Belonings word outomaties aan jou rekening gekrediteer en kan gebruik word vir toekomstige aankope of onttrek."
        },
        {
          question: "Watter netwerke word ondersteun?",
          answer: "Ons ondersteun alle groot Suid-Afrikaanse netwerke insluitend MTN, Vodacom, Cell C, Telkom Mobile, en Rain Mobile. Kry die beste deals oor alle netwerke in een platform."
        },
        {
          question: "Hoe vinnig word lugtyd gelewer?",
          answer: "Ons KI-aangedrewe sisteem verwerk lugtyd aankope in minder as 30 sekondes. Meeste transaksies word onmiddellik voltooi met intydse bevestiging."
        },
        {
          question: "Is dit veilig om Divine Mobile te gebruik?",
          answer: "Ja, absoluut. Ons gebruik bank-vlak enkripsie en is PCI DSS voldoend. Alle transaksies word beveilig met die nuutste sekuriteit protokolle om jou data en geld te beskerm."
        },
        {
          question: "Kan ek 'n verkoper word?",
          answer: "Ja! Sluit aan by ons verkoper netwerk om jou inkomste met tot 40% te verhoog. Die registrasie proses neem 24 uur en sluit volledige opleiding en ondersteuning in."
        },
        {
          question: "Wat is die USSD kode?",
          answer: "Jy kan Divine Mobile dienste toegang kry deur *120*888# te skakel vanaf enige selfoon. Dit werk op alle netwerke sonder die app of internet verbinding nodig."
        }
      ]
    },
    zu: {
      title: "Imibuzo Evamile",
      subtitle: "Konke okudingayo ukuze wazi nge-Divine Mobile",
      faqs: [
        {
          question: "Iyasebenza kanjani indlela yokubuyisela imali?",
          answer: "Thola i-2.5% yokubuyisela imali kuyo yonke ukuthenga i-airtime ngesistimu yethu ye-OneCard. Imiklomelo igoqelwa ngokuzenzakalela ku-akhawunti yakho futhi ingasetshenziswa ekuthengeni kwesikhathi esizayo noma ikhishwe."
        },
        {
          question: "Yimaphi amanethiwekhi asekelwayo?",
          answer: "Sisekela wonke amanethiwekhi amakhulu aseNingizimu Afrika kufaka phakathi i-MTN, Vodacom, Cell C, Telkom Mobile, ne-Rain Mobile. Thola amathuba amahle kuwo wonke amanethiwekhi kuphlatifomo eyodwa."
        },
        {
          question: "Ilethwa ngokushesha kangakanani i-airtime?",
          answer: "Isistimu yethu eqhutshwa yi-AI icubungula ukuthenga i-airtime ngaphansi kwamasekhondi angama-30. Ukuthenga okuningi kuqedwa ngokushesha ngokuqinisekiswa kwesikhathi sangempela."
        },
        {
          question: "Ingabe kuvumelekile ukusebenzisa i-Divine Mobile?",
          answer: "Yebo, ngokuphelele. Sisebenzisa ukubethela kwezinga lebhange futhi sihambisana ne-PCI DSS. Yonke imisebenzi ivikelwe ngezinqubo zokuphepha zakamuva ukuvikela idatha nemali yakho."
        },
        {
          question: "Ngingaba umdayisi?",
          answer: "Yebo! Joyina inethiwekhi yethu yabathengisi ukuze ukhuphule imali yakho ukuya ku-40%. Uhlelo lokubhalisa luthatha amahora angama-24 futhi lufaka ukuqeqeshwa okugcwele nokwesekwa."
        },
        {
          question: "Yini ikhodi ye-USSD?",
          answer: "Ungafinyelela izinsizakalo ze-Divine Mobile ngokudayela *120*888# kunanoma yimuphi umakhalekhukhwini. Lokhu kusebenza kuwo wonke amanethiwekhi ngaphandle kokudinga i-app noma ukuxhumana kwe-intanethi."
        }
      ]
    },
    xh: {
      title: "Imibuzo Ebuzwa Qho",
      subtitle: "Yonke into oyifunayo ukuze wazi nge-Divine Mobile",
      faqs: [
        {
          question: "Iyasebenza njani inkqubo yokubuyisa imali?",
          answer: "Fumana i-2.5% yokubuyisa imali kuyo yonke ukuthenga i-airtime ngenkqubo yethu ye-OneCard. Amabhaso afakwa kwi-akhawunti yakho ngokuzenzekelayo futhi angasetyenziswa ekuthengeni kwexesha elizayo okanye akhutshwe."
        },
        {
          question: "Yeyiphi iinethiwekhi ezixhaswayo?",
          answer: "Sixhasa zonke iinethiwekhi ezinkulu zaseMzantsi Afrika kubandakanya i-MTN, Vodacom, Cell C, Telkom Mobile, ne-Rain Mobile. Fumana ezona thuba zintle kuzo zonke iinethiwekhi kwiqonga elinye."
        },
        {
          question: "Ihanjiswa ngokukhawuleza kangakanani i-airtime?",
          answer: "Inkqubo yethu eqhutshwa yi-AI icubungula ukuthenga i-airtime ngaphantsi kwemizuzwana engama-30. Uninzi lwemali ethengwayo lugqitywa ngokukhawuleza ngokuqinisekiswa kwexesha langempela."
        },
        {
          question: "Ngaba ikhuselekile ukusebenzisa i-Divine Mobile?",
          answer: "Ewe, ngokupheleleyo. Sisebenzisa ukufihla kwenqanaba lebhanki kwaye sihambelana ne-PCI DSS. Yonke imali ethengwayo ikhuselwe ngeenkqubo zokhuseleko zamanye ukukhusela idatha nemali yakho."
        },
        {
          question: "Ndingaba ngumthengisi?",
          answer: "Ewe! Joyina inethiwekhi yethu yabathengisi ukuze wandise ingeniso yakho ukuya ku-40%. Inkqubo yokubhalisa ithatha iiyure ezingama-24 kwaye ibandakanya uqeqesho olupheleleyo nenkxaso."
        },
        {
          question: "Yintoni ikhowudi ye-USSD?",
          answer: "Ungakwazi ukufikelela kwiinkonzo ze-Divine Mobile ngokufowuna *120*888# kuyo nayiphi na ifowuni. Oku kusebenza kuzo zonke iinethiwekhi ngaphandle kwesidingo se-app okanye uqhagamshelo lwe-intanethi."
        }
      ]
    },
    st: {
      title: "Dipotso tse Botswang Hangata",
      subtitle: "Tsohle tseo o hlokang ho tseba ka Divine Mobile",
      faqs: [
        {
          question: "E sebetsa joang tsamaiso ya ho khutlisa chelete?",
          answer: "Fumana 2.5% ya ho khutlisa chelete ho reka ka mong airtime ka tsamaiso ya rona ya OneCard. Diputsiso di kenngwa akhaonteng ya hao ka bo tsona mme di ka sebediswa bakeng sa ditheko tsa nako e tlang kapa di ntshwe."
        },
        {
          question: "Ke di-network life tse tshehletswang?",
          answer: "Re tshehletsa di-network tsohle tse kgolo tsa Afrika Borwa ho kenyeletswa MTN, Vodacom, Cell C, Telkom Mobile, le Rain Mobile. Fumana dithuso tse molemo ho di-network tsohle sethuleng se le seng."
        },
        {
          question: "Airtime e fanwa ka potlako hakae?",
          answer: "Tsamaiso ya rona e tsamaiswang ke AI e sebetsa ditheko tsa airtime ka tlase ho metsotswana e 30. Ditheko tse ngata di phethwa ka potlako ka netefatso ya nako ya sebele."
        },
        {
          question: "Na ho sireletsehile ho sebedisa Divine Mobile?",
          answer: "Ee, ka ho feletseng. Re sebedisa encryption ya boemo ba banka mme re lumellana le PCI DSS. Ditheko tsohle di sireletsehile ka diprotocol tsa morao-rao tsa tshireletso ho sireletsa data le chelete ya hao."
        },
        {
          question: "Na nka ba morekisi?",
          answer: "Ee! Kenela network ya rona ya barekisi ho eketsa lekeno la hao ho ya ho 40%. Tsamaiso ya ho ngodisa e nka dihora tse 24 mme e kenyelletsa kwetliso e felletseng le tshehetso."
        },
        {
          question: "Ke eng khoutu ya USSD?",
          answer: "O ka fihlella ditshebeletso tsa Divine Mobile ka ho letsetsa *120*888# ho tswa foung efe kapa efe. Sena se sebetsa ho di-network tsohle ntle le ho hloka app kapa khokahanyo ya inthanete."
        }
      ]
    },
    tn: {
      title: "Dipotso tse di Botsiwang Gantsi",
      subtitle: "Sengwe le sengwe se o tlhokang go se itse ka Divine Mobile",
      faqs: [
        {
          question: "E dira jang tsamaiso ya go boela madi?",
          answer: "Bona 2.5% ya go boela madi mo thekong nngwe le nngwe ya airtime ka tsamaiso ya rona ya OneCard. Dituelo di tsenelwa mo akhaonteng ya gago ka boithaopi mme di ka dirisiwa mo thekong ya nako e e tlang kana di ntshiwa."
        },
        {
          question: "Ke di-network dife tse di tshegeditwang?",
          answer: "Re tshegotsa di-network tsotlhe tse dikgolo tsa Aforika Borwa go akaretsa MTN, Vodacom, Cell C, Telkom Mobile, le Rain Mobile. Bona dithuso tse di molemo mo di-network tsotlhe mo setlhopheng se le sengwe."
        },
        {
          question: "Airtime e rometswe ka bonako jang?",
          answer: "Tsamaiso ya rona e e kaelwang ke AI e dira ditheko tsa airtime ka fa tlase ga metsotswana e le 30. Ditheko tse dintsi di fedisiwa ka bonako ka netefatso ya nako ya mmatota."
        },
        {
          question: "A go babalesegileng go dirisa Divine Mobile?",
          answer: "Ee, ruri. Re dirisa poloko ya maemo a banka mme re dumalana le PCI DSS. Ditheko tsotlhe di babalesegile ka dithulaganyo tsa bosaitsanape tsa morao-nako go sireletsa tshedimosetso le madi a gago."
        },
        {
          question: "A nka nna morekisi?",
          answer: "Ee! Tsena mo netiwekeng ya rona ya barekisi go oketsa lotseno lwa gago go ya go 40%. Thulaganyo ya go kwala e tsaya dihora tse 24 mme e akaretsa katiso e e feletseng le thuso."
        },
        {
          question: "Ke eng khoutu ya USSD?",
          answer: "O ka fitlhelela ditirelo tsa Divine Mobile ka go letsa *120*888# go tswa mo mogaleng ope fela. Se se dira mo di-network tsotlhe ntle le go tlhoka app kapa kgolagano ya inthanete."
        }
      ]
    },
    nso: {
      title: "Dipotšišo tše di Botšišwago Gantši",
      subtitle: "Tsohle tšeo o hlokago go di tseba ka Divine Mobile",
      faqs: [
        {
          question: "E šoma bjang tshepedišo ya go bušetša tšhelete?",
          answer: "Hwetša 2.5% ya go bušetša tšhelete go rekeng ga airtime ka tshepedišo ya rena ya OneCard. Diputsiso di tsenngwa akhaonteng ya gago ka bo tšona gomme di ka šomišwa go reka nako ye e tlago goba di ntšhwe."
        },
        {
          question: "Ke di-network dife tšeo di thekgwago?",
          answer: "Re thekga di-network tšohle tše dikgolo tša Afrika Borwa go akaretša MTN, Vodacom, Cell C, Telkom Mobile, le Rain Mobile. Hwetša dithušo tše dibotse go di-network tšohle sethakeng se tee."
        },
        {
          question: "Airtime e romelwa ka lebelo le kae?",
          answer: "Tshepedišo ya rena yeo e laolwago ke AI e šoma go reka airtime ka fase ga metsotswana e 30. Ditheko tše dintši di phethwa ka pela ka netefatšo ya nako ya nnete."
        },
        {
          question: "Na go bolokegileng go šomiša Divine Mobile?",
          answer: "Ee, ka moka. Re šomiša poloko ya maemo a panka gomme re dumelana le PCI DSS. Ditheko tšohle di bolokegileng ka dithulaganyo tša polokego tša morao-nako go šireletša tshedimošetšo le tšhelete ya gago."
        },
        {
          question: "Na nka ba morekiši?",
          answer: "Ee! Tsena mo nethiwetheng ya rena ya barekiši go oketša letseno la gago go ya go 40%. Thulaganyo ya go ngwala e tšea diiri tše 24 gomme e akaretša tlhahlo e fellego le thekgo."
        },
        {
          question: "Ke eng khoutu ya USSD?",
          answer: "O ka fihlelela ditirelo tša Divine Mobile ka go letša *120*888# go tšwa mogaleng wo o bitšwago mongwe le mongwe. Se se šoma go di-network tšohle ntle le go hloka app goba kgokagano ya inthanete."
        }
      ]
    },
    ts: {
      title: "Swivutiso swo Vutsiwaka Gantsi",
      subtitle: "Hinkwaswo leswi u lavaka ku swi tiva hi Divine Mobile",
      faqs: [
        {
          question: "Xisisteme xa ku buyisa mali xi tirha njhani?",
          answer: "Kuma 2.5% ya ku buyisa mali eka xirek hinkwaxo xa airtime hi xisisteme xa hina xa OneCard. Swiphakelo swa nghenisiwa hi ku tisungula eka akhawunti ya wena naswona swi nga tirhisiwa ku xavela tikweni ta le kahle kumbe swi humesiwa."
        },
        {
          question: "I tinetiweke mani leti sekeriwaka?",
          answer: "Hi sekera tinetiweke hinkwato letikulu ta Afrika Dzonga ku katsa MTN, Vodacom, Cell C, Telkom Mobile, na Rain Mobile. Kuma swiphakelo swa kahle eka tinetiweke hinkwato eka pulatifomo yin'we."
        },
        {
          question: "Airtime yi tiseriwa ni xihatla xa wini?",
          answer: "Xisisteme xa hina lexi fambisiwaka hi AI xi tirha ku xavela ka airtime ehansi ka tisekonde ta 30. Ku xavela ku tele ku hetisiwa hi ku hatlisa na ku tiyisisa ka nkarhi wa ntiyiso."
        },
        {
          question: "I vuhlayiseki ku tirhisa Divine Mobile?",
          answer: "Ina, hi ku helela. Hi tirhisa encryption ya rivala ra banka naswona hi fambelana na PCI DSS. Ku xavela hinkwaku ku hlayisekile hi tiprotocol ta vuhlayiseki ta sweswi ku hlayisa rungula na mali ya wena."
        },
        {
          question: "Ndzi nga va muxavisi?",
          answer: "Ina! Nghena eka netiweke ya hina ya vaxavisi ku ndlandlamuxa rungula ra wena ku ya eka 40%. Xiyimo xa ku tsarisa xi teka tiawara ta 24 naswona xi katsa ku luga loku heleleleke na nseketelo."
        },
        {
          question: "I yini khodi ya USSD?",
          answer: "U nga fikelela swirho swa Divine Mobile hi ku ringeta *120*888# ku suka eka foni yin'wana na yin'wana. Leswi swi tirha eka tinetiweke hinkwato handle ko lava app kumbe vuhlanganisi bya inthanete."
        }
      ]
    },
    ve: {
      title: "Mbudziso dzo Budzwaho nga Nṱha",
      subtitle: "Zwoṱhe zwine na tea u zwi divha nga Divine Mobile",
      faqs: [
        {
          question: "Sisiteme ya u busela tshelede i shuma hani?",
          answer: "Wanani 2.5% ya u busela tshelede kha rengiha dzin̄we na dzin̄we dza airtime nga sisiteme yashu ya OneCard. Mikolodo i dzhielwa nga u vhofholowa kha akauniti ya vhone nahone i nga shumiswa kha u renga ha matshelo kana i bviswe."
        },
        {
          question: "I mitikiweki gani ye khou thekgwaho?",
          answer: "Ri khou thekga mitikiweki yoṱhe mikhulu ya Afrika Tshipembe hu tshi katsha MTN, Vodacom, Cell C, Telkom Mobile, na Rain Mobile. Wanani ndivho dza vhudi kha mitikiweki yoṱhe pulathifomo ithihi."
        },
        {
          question: "Airtime i rumelwa nga u tavhanya hangani?",
          answer: "Sisiteme yashu ye khou senguluswa nga AI i khou shuma u renga airtime nga fhasi ha mitshelo ya 30. U renga luzhi lunzhi lu khou fhedzwa nga u tavhanya nga u khwaṱhisedza ha tshifhinga tsha vhukuma."
        },
        {
          question: "Ndi vhukoni ha u shumisa Divine Mobile?",
          answer: "Ee, nga u fhedzisesa. Ri khou shumisa encryption ya levhele la banga nahone ri khou tevhedzana na PCI DSS. U renga hwoṱhe hu vhudziwa nga zwitshilele zwa tsireledzo zwa murangaphanda u sireletsa data na tshelede yavho."
        },
        {
          question: "Ndi nga vha murengi?",
          answer: "Ee! Dzhienani kha netiweki yashu ya varengi u engedza mbadelo yavho ya swika kha 40%. Maitele a u ṅwalisa a dzhia awara dza 24 nahone a katsha gudifhadzwa hukuma na thuso."
        },
        {
          question: "Ndi mini khodo ya USSD?",
          answer: "Ni nga swika kha tshumelo dza Divine Mobile nga u fonela *120*888# u bva kha foni iṅwe na iṅwe. Izwi zwi khou shuma kha mitikiweki yoṱhe hune ni sa tea app kana u kwamana ha inthanete."
        }
      ]
    }
  };

  const currentTranslation = translations[selectedLanguage];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {currentTranslation.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentTranslation.subtitle}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 bg-white rounded-lg border shadow-sm p-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[200px] border-0 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {currentTranslation.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
