import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  BookOpen, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle, 
  Menu, 
  X, 
  Scale, 
  Search, 
  FileText 
} from 'lucide-react';

// --- Types ---
interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="georgia-font text-3xl font-medium tracking-tight text-white">Lexora</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#video" className="text-zinc-400 hover:text-white transition-colors">Video vodič</a>
            <a href="#koraki" className="text-zinc-400 hover:text-white transition-colors">Postopek</a>
            <a href="#funkcije" className="text-zinc-400 hover:text-white transition-colors">Funkcionalnosti</a>
            <a href="https://app.lexora.si/" className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors">Preizkusi Lexoro</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 p-4 space-y-4">
          <a href="#video" className="block text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>Video vodič</a>
          <a href="#koraki" className="block text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>Postopek</a>
          <a href="#funkcije" className="block text-zinc-300" onClick={() => setIsMobileMenuOpen(false)}>Funkcionalnosti</a>
          <a href="https://app.lexora.si/" className="block w-full text-center bg-blue-700 text-white px-5 py-2 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Preizkusi Lexoro</a>
        </div>
      )}
    </nav>
  );
};

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => (
  <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-sm hover:border-zinc-700 transition-all group">
    <div className="bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </div>
);

const StepItem: React.FC<OnboardingStep & { index: number }> = ({ title, description, icon, index }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 relative">
      <div className="w-12 h-12 bg-black rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-400 font-bold z-10 relative">
        {index + 1}
      </div>
      {index < 2 && (
        <div className="absolute top-12 bottom-[-24px] left-1/2 w-0.5 bg-zinc-800 -translate-x-1/2 hidden md:block"></div>
      )}
    </div>
    <div className="pb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-blue-500">{icon}</span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-zinc-400 leading-relaxed max-w-md">{description}</p>
    </div>
  </div>
);

const FaqSection: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <button 
            className="w-full flex justify-between items-center p-5 text-left font-semibold text-white hover:bg-zinc-800 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.question}
            <ChevronDown className={`transition-transform text-zinc-500 ${openIndex === index ? 'rotate-180 text-blue-400' : ''}`} />
          </button>
          {openIndex === index && (
            <div className="p-5 pt-0 text-zinc-400 border-t border-zinc-800 animate-in fade-in slide-in-from-top-1 duration-200">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const steps: OnboardingStep[] = [
    {
      title: "Ustvarite svoj profil",
      description: "Registrirajte se z e-poštnim naslovom in vzpostavite varno digitalno okolje za svoje zadeve.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Uvozite svoje dokumente",
      description: "Varno naložite pravne dokumente, pogodbe ali sodno prakso, ki jih želite analizirati z uporabo Lexore.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Začnite z delom",
      description: "Uporabite moč AI za pripravo osnutkov, iskanje po dokumentih in hitro analizo kompleksnih pravnih vprašanj.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const features: Feature[] = [
    {
      title: "Analiza in razumevanje dokumentov",
      description: "Lexora hitro pregleda pogodbe, sodbe ali vloge, izpostavi ključne točke, tveganja in pravna vprašanja ter pripravi jasen povzetek.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "Priprava osnutkov pravnih dokumentov",
      description: "Na podlagi vaših navodil in dejstev zadeve pripravi strukturirane osnutke tožb, odgovorov, pogodb ali pravnih mnenj.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Iskanje zakonodaje in sodne prakse",
      description: "Poišče relevantne člene zakonov in sodne odločbe glede na konkretno situacijo ter povzame bistvena pravna stališča.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "Oblikovanje pravne argumentacije",
      description: "Pomaga razviti jasno, logično in prepričljivo argumentacijo ter predlaga možne protiargumente.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Pregled in optimizacija klavzul",
      description: "Analizira posamezne pogodbene določbe, opozori na tveganja ter predlaga izboljšave ali alternativne formulacije.",
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      title: "In še veliko več",
      description: "Od klepeta z dokumenti, preverjanja skladnosti in priprave povzetkov do podpore pri vsakodnevnih pravnih opravilih - Lexora je vaš AI asistent skozi celoten delovni proces.",
      icon: <Scale className="w-6 h-6" />
    }
  ];

  const faqs: FaqItem[] = [
    {
      question: "1. Kaj je Lexora?",
      answer: "Lexora je AI pravni agent, zasnovan posebej za pravnike in odvetnike. Združuje napredne modele umetne inteligence z dostopom do slovenske in evropske zakonodaje ter sodne prakse ter vam pomaga pri analizi, raziskavi in pripravi dokumentov."
    },
    {
      question: "2. Kako se Lexora razlikuje od generičnih AI orodij?",
      answer: "Lexora ni splošen chatbot. Deluje znotraj vaših konkretnih zadev, analizira naložene dokumente in jih povezuje z veljavno zakonodajo ter sodno prakso. Razvita je za profesionalno uporabo v pravnem okolju."
    },
    {
      question: "3. Ali so moji podatki varni?",
      answer: "Platforma je zasnovana intuitivno. Večina uporabnikov postane popolnoma suverenih že po ogledu 5-minutnega video vodiča."
    },
    {
      question: "4. Ali Lexora nadomešča pravnika?",
      answer: "Ne. Lexora je orodje za podporo odločanju in povečanje učinkovitosti. Končna presoja, strategija in odgovornost vedno ostanejo v rokah pravnika."
    },
    {
      question: "5. Katere naloge lahko z Lexoro avtomatiziram?",
      answer: "Pripravo osnutkov, povzetkov, analizo pogodb, preverjanje klavzul, iskanje sodne prakse, oblikovanje argumentacije ter odgovarjanje na pravna vprašanja na podlagi dokumentov vaše zadeve."
    },
    {
      question: "6. Kako začnem uporabljati Lexoro?",
      answer: "Ustvarite profil, odprite novo zadevo in naložite dokumente. Nato lahko začnete z analizo, pripravo osnutkov ali raziskavo. Priporočamo, da Lexoro preizkusite na čim več korakih svojega delovnega procesa, da v celoti izkoristite njen potencial."
    }
  ];

  return (
    <div className="min-h-screen bg-black selection:bg-blue-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-4 lg:pt-48 lg:pb-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-900/10 to-transparent -z-10 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-800 text-blue-300 text-sm font-semibold mb-6 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Umetna inteligenca za slovenske pravnike</span>
          </div>
          <h1 className="georgia-font text-4xl md:text-6xl lg:text-7xl text-white mb-8 max-w-4xl mx-auto leading-tight">
            Dobrodošli v prihodnosti <span className="text-blue-500">pravne prakse!</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Lexora je vaša nova konkurenčna prednost. Oglejte si spodnji video vodič, da ugotovite, kako v celoti izkoristiti potencial umetne inteligence v vaši odvetniški pisarni.
          </p>
          
          <div className="flex justify-center items-center">
            <a href="https://app.lexora.si/" className="px-10 py-5 bg-blue-700 text-white rounded-full font-bold text-xl hover:bg-blue-600 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-900/20">
              Preizkusi Lexoro <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Video Section */}
<section id="video" className="py-28 bg-black relative overflow-hidden">

    {/* Background glow */}
    <div className="absolute inset-0 flex justify-center pointer-events-none">
      <div className="w-[900px] h-[450px] bg-blue-600/20 blur-3xl rounded-full"></div>
    </div>

    <div className="relative max-w-[1400px] mx-auto px-6">

      {/* Glass Border Wrapper */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_50px_140px_rgba(0,0,0,0.7)]">

        {/* Glass Container */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">

          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/d6VyCQnH0wc?modestbranding=1&rel=0"
              title="Lexora predstavitev"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-20 grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
        
        <div>
          <span className="block text-3xl font-semibold text-blue-500">
            10 minut
          </span>
          <span className="text-zinc-500 text-sm uppercase tracking-widest">
            Trajanje vodiča
          </span>
        </div>

        <div className="border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
          <span className="block text-3xl font-semibold text-blue-500">
            Vsi ključni moduli
          </span>
          <span className="text-zinc-500 text-sm uppercase tracking-widest">
            Pokrita vsebina
          </span>
        </div>

        <div>
          <span className="block text-3xl font-semibold text-blue-500">
            Takojšnja uporaba
          </span>
          <span className="text-zinc-500 text-sm uppercase tracking-widest">
            Cilj izobraževanja
          </span>
        </div>

      </div>

    </div>
  </section>

      {/* Steps Section */}
      <section id="koraki" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="georgia-font text-3xl md:text-5xl text-white mb-6 font-medium leading-tight">3 preprosti koraki do <span className="text-blue-500">uvedbe AI v vaše pravno delo:</span></h2>
                 <p className="text-lg text-zinc-400 mb-12">
                      Ni vam treba spreminjati svojega načina dela.
                      Lexora se prilagodi vam – vašim primerom, vašim dokumentom, vašemu načinu razmišljanja.
                 </p>
                 <div className="space-y-4">
                {steps.map((step, idx) => (
                  <StepItem key={idx} {...step} index={idx} />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-900/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 text-white border border-blue-800/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">Hitri nasvet za začetek</h3>
                  <p className="text-zinc-300 mb-8 leading-relaxed italic">
                       Priporočamo, da Lexoro preizkusite na čim več korakih svojega delovnega procesa – od prve analize dokumentov do priprave končnih osnutkov.
                        Uporabljajte jo pri različnih opravilih in scenarijih, saj boste le tako v celoti izkoristili njen potencial ter moč umetne inteligence v vsakodnevnem pravnem delu.    </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-medium text-zinc-200">Delo znotraj konkretne pravne zadeve</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-medium text-zinc-200">Povezava z zakonodajo in sodno prakso</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-medium text-zinc-200">Varnost in zaupnost na profesionalni ravni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="funkcije" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="georgia-font text-3xl md:text-5xl text-white mb-6 font-medium leading-tight">Orodja, ki vam <span className="text-blue-500">prihranijo ure dela</span></h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Odvetniško delo ni več le brskanje po papirjih. Z Lexoro postane vaše znanje bolj dostopno in uporabno.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-sm text-blue-500 mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="georgia-font text-3xl md:text-5xl text-white mb-6 font-medium">Pogosta vprašanja</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Tukaj so odgovori na najpogostejša vprašanja naših novih uporabnikov.
            </p>
          </div>
          <FaqSection items={faqs} />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="georgia-font text-3xl md:text-6xl mb-8 font-medium">Ste pripravljeni dvigniti svojo pisarno na nov nivo?</h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Vaša ekipa bo navdušena nad novim nivojem produktivnosti, ki ga prinaša Lexora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.lexora.si/" className="px-10 py-5 bg-white text-blue-950 rounded-full font-bold text-xl hover:bg-zinc-100 transition-all hover:scale-105">
              Začnite zdaj
            </a>
            <button className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-xl hover:bg-white/10 transition-all">
              Kontaktirajte podporo: info@lexora.si
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-black text-zinc-500 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="georgia-font text-2xl tracking-tight text-white">Lexora</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Pogoji uporabe</a>
            <a href="#" className="hover:text-white transition-colors">Politika zasebnosti</a>
            <a href="#" className="hover:text-white transition-colors">Pišite nam</a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Lexora. Vse pravice pridržane.
          </p>
        </div>
      </footer>
    </div>
  );
}
