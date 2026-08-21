import { 
  SERVICES as BASE_SERVICES, 
  PROCESS_STEPS as BASE_PROCESS, 
  TESTIMONIALS as BASE_TESTIMONIALS, 
  PORTFOLIO as BASE_PORTFOLIO, 
  TEAM_MEMBERS as BASE_TEAM, 
  blogPosts as BASE_BLOGS, 
  FAQS as BASE_FAQS, 
  BUSINESS_INFO 
} from '../app/Data/content';
import { DEFAULT_LOCALE } from './config';

export { BUSINESS_INFO };

// Localized Services Data
const LOCALIZED_SERVICES = {
  en: BASE_SERVICES,
  es: [
    {
      id: 'book-marketing',
      title: 'Marketing Editorial',
      category: 'especialización',
      shortDesc: 'Campañas integrales de lanzamiento y crecimiento diseñadas para llevar tu libro a miles de lectores objetivo.',
      fullDesc: 'Ejecución integral del lanzamiento del libro, incluyendo optimización de categorías en Amazon, imanes de prospectos, distribución ARC y promoción segmentada.',
      deliverables: ['Plan Estratégico de Lanzamiento', 'Auditoría de Categorías y Palabras Clave en Amazon KDP', 'Configuración de Campaña de Reseñas y ARC'],
      roiHighlights: 'Incremento promedio de más del 300% en alcance de lectores y posición en ventas durante la semana de lanzamiento.'
    },
    {
      id: 'author-branding',
      title: 'Branding para Autores',
      category: 'especialización',
      shortDesc: 'Posicionamiento de autores como figuras memorables y de autoridad en su nicho con identidad distintiva y presencia en medios.',
      fullDesc: 'Construye una marca personal duradera con un kit de medios a medida, diseño web profesional, redacción de biografía y posicionamiento en plataformas.',
      deliverables: ['Kit de Medios para Autor en PDF', 'Guía de Voz de Marca y Estilo', 'Configuración de Plataforma para Autores'],
      roiHighlights: 'Genera autoridad inmediata para entrevistas en medios, conferencias y acuerdos editoriales.'
    },
    {
      id: 'book-cover-design',
      title: 'Diseño de Portadas de Libros',
      category: 'creativo',
      shortDesc: 'Diseños de portadas para ebook e impreso de alta conversión, adaptados al género, que capturan la atención del lector.',
      fullDesc: 'Tipografía y maquetación artesanales creadas específicamente para dominar tu género en Amazon y estanterías físicas.',
      deliverables: ['Archivos de Impresión: Portada, Contraportada y Lomo (PDF)', 'Portada de Ebook (JPG/PNG)', 'Formato de Portada para Audiolibro'],
      roiHighlights: 'Portadas diseñadas para incrementar la tasa de clics en anuncios (CTR) hasta en un 45%.'
    },
    {
      id: 'book-mockup-design',
      title: 'Diseño de Mockups 3D de Libros',
      category: 'creativo',
      shortDesc: 'Mockups 3D fotorrealistas y activos promocionales diseñados para anuncios sociales, sitios web y exhibiciones de marketing.',
      fullDesc: 'Renders 3D en alta resolución que muestran tapas duras, libros de bolsillo, lectores electrónicos y paquetes para campañas de lanzamiento.',
      deliverables: ['Renders PNG Transparentes en Alta Resolución', 'Gráficos Promocionales para Redes Sociales', 'Banners Publicitarios'],
      roiHighlights: 'Aumenta el compromiso publicitario con pruebas visuales hiperrealistas.'
    },
    {
      id: 'digital-marketing',
      title: 'Marketing Digital',
      category: 'marketing',
      shortDesc: 'Campañas digitales multicanal basadas en datos para maximizar el ROI, la adquisición de clientes y la visibilidad de marca.',
      fullDesc: 'Estrategias de crecimiento omnicanal enfocadas en captación de clientes, optimización de conversión y escalado de marca.',
      deliverables: ['Hoja de Ruta de Crecimiento', 'Configuración de Campañas Multicanal', 'Informes de Analítica de Rendimiento'],
      roiHighlights: 'Canal predecible y escalable para un crecimiento comercial continuo.'
    },
    {
      id: 'social-media-marketing',
      title: 'Gestión y Marketing en Redes Sociales',
      category: 'marketing',
      shortDesc: 'Creación estratégica de contenido, crecimiento de comunidad y gestión activa en Instagram, LinkedIn, TikTok y X.',
      fullDesc: 'Transforma usuarios pasivos en defensores activos de tu marca con publicaciones constantes y gestión de comunidad de alta conversión.',
      deliverables: ['Calendario Mensual de Contenidos', 'Creación de Reels y Gráficos Personalizados', 'Gestión de Comunidad y Analítica'],
      roiHighlights: 'Construcción constante de audiencia y mayor alcance orgánico.'
    },
    {
      id: 'social-media-graphics',
      title: 'Gráficos y Diseño Creativo para Redes',
      category: 'creativo',
      shortDesc: 'Gráficos llamativos, carruseles, infografías y folletos promocionales que detienen el scroll en el feed.',
      fullDesc: 'Diseños visuales adaptados perfectamente a la identidad e imagen de tu marca.',
      deliverables: ['Carruseles de Instagram Personalizados', 'Banners y Folletos Promocionales', 'Plantillas Editables en Canva'],
      roiHighlights: 'Mejora notablemente la interacción y las veces que se comparte tu contenido.'
    },
    {
      id: 'content-marketing',
      title: 'Marketing de Contenidos',
      category: 'marketing',
      shortDesc: 'Narrativa persuasiva a través de blogs, artículos, boletines e imanes de prospectos que educan y convierten.',
      fullDesc: 'Nutre el tráfico frío hasta convertirlo en compradores leales con contenido de alto valor, whitepapers y secuencias de email.',
      deliverables: ['Artículos de Blog Optimizados para SEO', 'PDFs de Imanes de Prospectos (Lead Magnets)', 'Secuencias de Nutrición por Email'],
      roiHighlights: 'Construye autoridad orgánica duradera y visibilidad en motores de búsqueda.'
    },
    {
      id: 'seo',
      title: 'Optimización para Motores de Búsqueda (SEO)',
      category: 'marketing',
      shortDesc: 'Estrategias técnicas, on-page y de palabras clave para posicionar tu sitio web en los primeros lugares de Google.',
      fullDesc: 'Atrae tráfico web orgánico y predecible con auditorías técnicas, optimización de contenidos y estrategias de enlaces.',
      deliverables: ['Auditoría SEO Técnica', 'Mapeo de Palabras Clave Objetivo', 'Optimización de Contenido On-Page'],
      roiHighlights: 'Genera prospectos recurrentes a bajo costo desde búsquedas en Google.'
    },
    {
      id: 'brand-strategy',
      title: 'Estrategia de Marca y Branding Creativo',
      category: 'creativo',
      shortDesc: 'Creación completa de identidad de marca: logotipos, paletas de color, tono de voz y manual de directrices de marca.',
      fullDesc: 'Diferencia tu negocio de la competencia con una identidad visual memorable y un marco de posicionamiento estratégico.',
      deliverables: ['Suite de Logotipos Primario y Secundario', 'Manual de Directrices de Marca (PDF)', 'Sistema de Tipografía y Paleta de Color'],
      roiHighlights: 'Genera posicionamiento premium inmediato y máxima confianza del consumidor.'
    },
    {
      id: 'digital-advertising',
      title: 'Publicidad Digital y Anuncios Pagos',
      category: 'marketing',
      shortDesc: 'Campañas hipersegmentadas en Meta (Facebook/IG), Google Ads y Amazon PPC optimizadas para ventas inmediatas.',
      fullDesc: 'Campañas de tráfico pagado diseñadas para entregar el máximo ROAS con segmentación precisa e iteración continua.',
      deliverables: ['Diseño Creativo y Copywriting de Anuncios', 'Configuración de Campañas y Segmentación', 'Optimización Semanal de ROAS'],
      roiHighlights: 'Adquisición pagada escalable con retorno verificable de la inversión publicitaria.'
    },
    {
      id: 'marketing-strategy',
      title: 'Estrategia Integral de Marketing',
      category: 'marketing',
      shortDesc: 'Planes de crecimiento a medida y marcos de ejecución creados específicamente para tus metas de facturación.',
      fullDesc: 'Hoja de ruta clara y aplicable que detalla canales, tácticas, presupuestos y cronogramas para alcanzar tus KPIs.',
      deliverables: ['Plan Integral de Marketing (Blueprint)', 'Informe Comparativo de Competidores', 'Plan de Asignación de Presupuesto'],
      roiHighlights: 'Elimina el gasto publicitario innecesario y enfoca los recursos en canales con ROI comprobado.'
    }
  ],
  it: [
    {
      id: 'book-marketing',
      title: 'Book Marketing',
      category: 'specializzazione',
      shortDesc: 'Campagne complete di lancio e crescita per portare il tuo libro all’attenzione di migliaia di lettori profilati.',
      fullDesc: 'Gestione a 360° del lancio: ottimizzazione categorie Amazon, lead magnet per lettori, distribuzione copie ARC e promozione mirata.',
      deliverables: ['Roadmap Strategica di Lancio', 'Audit Categorie e Keyword Amazon KDP', 'Setup Campagna Recensioni e ARC'],
      roiHighlights: 'Aumento medio del 300%+ della portata lettori e del posizionamento vendite nella settimana di lancio.'
    },
    {
      id: 'author-branding',
      title: 'Author Branding',
      category: 'specializzazione',
      shortDesc: 'Posizionamento degli autori come figure autorevoli e memorabili nella loro nicchia con un’identità chiara.',
      fullDesc: 'Costruisci un brand personale duraturo con media kit personalizzato, sito web d’autore, biografia professionale e presenza online.',
      deliverables: ['Media Kit Autore in PDF', 'Linee Guida Tono di Voce e Stile', 'Setup Piattaforma e Canali Autore'],
      roiHighlights: 'Consolida l’autorevolezza immediata per interviste, eventi e accordi editoriali.'
    },
    {
      id: 'book-cover-design',
      title: 'Design Copertine Libri',
      category: 'creativo',
      shortDesc: 'Copertine per ebook e cartaceo ad alta conversione, studiate per dominare il tuo genere letterario.',
      fullDesc: 'Tipografia e impaginazione su misura per catturare l’attenzione su Amazon e sugli scaffali delle librerie.',
      deliverables: ['File Stampa: Copertina, Quarta e Dorso (PDF)', 'Copertina Ebook (JPG/PNG)', 'Formattazione Copertina Audiobook'],
      roiHighlights: 'Copertine studiate per incrementare la percentuale di clic pubblicitari (CTR) fino al 45%.'
    },
    {
      id: 'book-mockup-design',
      title: 'Design Mockup 3D per Libri',
      category: 'creativo',
      shortDesc: 'Mockup 3D fotorealistici e asset promozionali per annunci social, siti web e presentazioni marketing.',
      fullDesc: 'Rendering 3D in alta definizione per copertine rigide, brossure, e-reader e bundle promozionali per il lancio.',
      deliverables: ['Rendering PNG Trasparenti in Alta Risoluzione', 'Grafiche Promozionali per Social Media', 'Banner Pubblicitari'],
      roiHighlights: 'Aumenta l’engagement degli annunci con un impatto visivo fotorealistico.'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      category: 'marketing',
      shortDesc: 'Campagne multicanale basate sui dati per massimizzare ROI, acquisizione clienti e visibilità del brand.',
      fullDesc: 'Strategie di crescita omnicanale focalizzate su acquisizione, ottimizzazione delle conversioni e scaling.',
      deliverables: ['Roadmap Strategica di Crescita', 'Setup Campagne Multicanale', 'Report di Analisi delle Prestazioni'],
      roiHighlights: 'Canale prevedibile e scalabile per una crescita continua del fatturato.'
    },
    {
      id: 'social-media-marketing',
      title: 'Gestione e Marketing Social Media',
      category: 'marketing',
      shortDesc: 'Creazione contenuti, crescita della community e gestione attiva su Instagram, LinkedIn, TikTok e X.',
      fullDesc: 'Converti i follower passivi in sostenitori attivi con una presenza social costante e performante.',
      deliverables: ['Piano Editoriale Mensile', 'Creazione Reel e Grafiche Personalizzate', 'Gestione Community e Analytics'],
      roiHighlights: 'Crescita organica costante e maggiore fidelizzazione del pubblico.'
    },
    {
      id: 'social-media-graphics',
      title: 'Grafica e Design per Social',
      category: 'creativo',
      shortDesc: 'Grafiche accattivanti, caroselli, infografiche e volantini promozionali che catturano lo sguardo.',
      fullDesc: 'Design visivo personalizzato e perfettamente allineato all’identità del tuo brand.',
      deliverables: ['Caroselli Instagram Personalizzati', 'Banner e Volantini Promozionali', 'Template Canva Modificabili'],
      roiHighlights: 'Migliora nettamente l’interazione e la condivisione dei contenuti.'
    },
    {
      id: 'content-marketing',
      title: 'Content Marketing',
      category: 'marketing',
      shortDesc: 'Storytelling strategico con blog, articoli, newsletter e lead magnet che informano e convertono.',
      fullDesc: 'Trasforma i visitatori in clienti fidelizzati attraverso contenuti di valore ed email sequence mirate.',
      deliverables: ['Articoli Blog Ottimizzati SEO', 'Lead Magnet in PDF', 'Email Sequence di Nutrimento'],
      roiHighlights: 'Costruisce autorevolezza organica duratura e visibilità sui motori di ricerca.'
    },
    {
      id: 'seo',
      title: 'Ottimizzazione per Motori di Ricerca (SEO)',
      category: 'marketing',
      shortDesc: 'Strategie tecniche, on-page e di parole chiave per posizionare il tuo sito in cima ai risultati Google.',
      fullDesc: 'Genera traffico organico costante con audit tecnici, ottimizzazione dei contenuti e strategie di backlink.',
      deliverables: ['Audit SEO Tecnico', 'Mappatura Parole Chiave Target', 'Ottimizzazione Contenuti On-Page'],
      roiHighlights: 'Genera lead qualificati a basso costo dalle ricerche Google.'
    },
    {
      id: 'brand-strategy',
      title: 'Brand Strategy e Identità Visiva',
      category: 'creativo',
      shortDesc: 'Creazione completa dell’identità di brand: logo, palette colori, tono di voce e linee guida.',
      fullDesc: 'Distinguiti dalla concorrenza con un’identità visiva memorabile e un posizionamento strategico solido.',
      deliverables: ['Suite Loghi Primari e Secondari', 'Brand Guidelines Book (PDF)', 'Sistema Tipografico e Palette Colori'],
      roiHighlights: 'Crea posizionamento premium immediato e massima fiducia dei clienti.'
    },
    {
      id: 'digital-advertising',
      title: 'Pubblicità Digitale e Campagne Ads',
      category: 'marketing',
      shortDesc: 'Campagne mirate su Meta (Facebook/IG), Google Ads e Amazon PPC per vendite e conversioni immediate.',
      fullDesc: 'Campagne a pagamento studiate per il massimo ROAS grazie a un targeting preciso e test continui.',
      deliverables: ['Copywriting e Creatività Pubblicitarie', 'Setup Campagne e Segmentazione Pubblico', 'Ottimizzazione Settimanale ROAS'],
      roiHighlights: 'Acquisizione a pagamento scalabile con ritorno sull’investimento tracciabile.'
    },
    {
      id: 'marketing-strategy',
      title: 'Strategia di Marketing Integrata',
      category: 'marketing',
      shortDesc: 'Piani di crescita su misura e modelli operativi studiati specificamente per i tuoi obiettivi di fatturato.',
      fullDesc: 'Una guida chiara e applicabile che definisce canali, budget e tempistiche per raggiungere i tuoi KPI.',
      deliverables: ['Marketing Blueprint Completo', 'Analisi Benchmark Competitor', 'Piano di Allocazione Budget'],
      roiHighlights: 'Elimina gli sprechi pubblicitari concentrando le risorse sui canali a più alto rendimento.'
    }
  ],
  de: [
    {
      id: 'book-marketing',
      title: 'Buchmarketing',
      category: 'spezialisierung',
      shortDesc: 'Umfassende Launch- und Wachstumskampagnen, um Ihr Buch in die Hände tausender zielgerichteter Leser zu bringen.',
      fullDesc: 'Ganzheitliche Launch-Durchführung: Amazon-Kategorieoptimierung, Leser-Lead-Magnets, ARC-Verteilung und zielgerichtete Promotion.',
      deliverables: ['Launch-Strategieplan', 'Amazon KDP Kategorie- & Keyword-Audit', 'Setup für ARC- & Rezensionskampagnen'],
      roiHighlights: 'Durchschnittlich 300%+ Steigerung der Leser-Reichweite und des Bestseller-Rangs in der Launch-Woche.'
    },
    {
      id: 'author-branding',
      title: 'Autoren-Branding',
      category: 'spezialisierung',
      shortDesc: 'Positionierung von Autoren als profilierte, unverwechselbare Persönlichkeiten in ihrem Genre mit starker Medienpräsenz.',
      fullDesc: 'Bauen Sie eine beständige Personenmarke auf: mit individuellem Autoren-Mediakit, professioneller Website, Autorenbiografie und Plattformaufbau.',
      deliverables: ['Autoren-Mediakit (PDF)', 'Brand Voice & Styleguide', 'Setup der Autorenplattform'],
      roiHighlights: 'Schafft sofortige Autorität für Medieninterviews, Vorträge und Buchverträge.'
    },
    {
      id: 'book-cover-design',
      title: 'Buchcover-Design',
      category: 'kreativ',
      shortDesc: 'Konversionsstarke E-Book- und Print-Coverdesigns, abgestimmt auf Ihr Genre, die sofort ins Auge fallen.',
      fullDesc: 'Individuelle Typografie und Layoutgestaltung, maßgeschneidert, um Ihr Genre auf Amazon und im Buchhandel zu dominieren.',
      deliverables: ['Druckfertige Dateien: Vorder-, Rückseite & Buchrücken (PDF)', 'E-Book-Cover (JPG/PNG)', 'Hörbuch-Cover-Formatierung'],
      roiHighlights: 'Cover-Designs, die die Klickrate (CTR) von Werbeanzeigen um bis zu 45% steigern.'
    },
    {
      id: 'book-mockup-design',
      title: '3D Buch-Mockup-Design',
      category: 'kreativ',
      shortDesc: 'Fotorealistische 3D-Buchmockups und Werbemittel für Social Ads, Websites und Marketingkampagnen.',
      fullDesc: 'Hochauflösende 3D-Renderings von Hardcovern, Taschenbüchern, E-Readern und Bundles für Ihre Buchvermarktung.',
      deliverables: ['Hochauflösende transparente PNG-Renderings', 'Social-Media-Werbegrafiken', 'Banner-Anzeigen'],
      roiHighlights: 'Steigert das Anzeigen-Engagement durch überzeugende visuelle Realitätsnähe.'
    },
    {
      id: 'digital-marketing',
      title: 'Digitales Marketing',
      category: 'marketing',
      shortDesc: 'Datenbasierte Multichannel-Kampagnen für maximalen ROI, Neukundengewinnung und gesteigerte Markensichtbarkeit.',
      fullDesc: 'Ganzheitliche Wachstumsstrategien mit Fokus auf Kundenakquise, Konversionsoptimierung und Markenskalierung.',
      deliverables: ['Wachstums-Roadmap', 'Setup von Multichannel-Kampagnen', 'Performance-Analyseberichte'],
      roiHighlights: 'Planbare, skalierbare Pipeline für nachhaltiges Unternehmenswachstum.'
    },
    {
      id: 'social-media-marketing',
      title: 'Social-Media-Marketing & Management',
      category: 'marketing',
      shortDesc: 'Strategische Content-Erstellung, Community-Aufbau und Betreuung auf Instagram, LinkedIn, TikTok und X.',
      fullDesc: 'Verwandeln Sie passive Nutzer in aktive Markenbotschafter durch kontinuierliche Veröffentlichungen und Betreuung.',
      deliverables: ['Monatlicher Redaktionsplan', 'Erstellung individueller Reels & Grafiken', 'Community-Betreuung & Analytics'],
      roiHighlights: 'Kontinuierlicher Zielgruppenaufbau und höhere organische Reichweite.'
    },
    {
      id: 'social-media-graphics',
      title: 'Social-Media-Grafiken & Kreativdesign',
      category: 'kreativ',
      shortDesc: 'Auffällige Grafiken, Karussells, Infografiken und Flyer, die im Feed für maximale Aufmerksamkeit sorgen.',
      fullDesc: 'Visuelle Designs, die den Scroll stoppen und exakt auf Ihre Markenidentität abgestimmt sind.',
      deliverables: ['Individuelle Instagram-Karussells', 'Werbebanner & Flyer', 'Editierbare Canva-Vorlagen'],
      roiHighlights: 'Steigert Interaktionsraten und das Teilen Ihrer Inhalte spürbar.'
    },
    {
      id: 'content-marketing',
      title: 'Content-Marketing',
      category: 'marketing',
      shortDesc: 'Überzeugendes Storytelling durch Blogs, Fachartikel, Newsletter und Lead-Magnets, die informieren und verkaufen.',
      fullDesc: 'Führen Sie kalte Kontakte zu treuen Käufern mit hochwertigen Blogbeiträgen, Whitepapern und E-Mail-Sequenzen.',
      deliverables: ['SEO-optimierte Blogartikel', 'Lead-Magnet-PDFs', 'E-Mail-Nurturing-Sequenzen'],
      roiHighlights: 'Baut langfristige organische Autorität und Suchmaschinen-Sichtbarkeit auf.'
    },
    {
      id: 'seo',
      title: 'Suchmaschinenoptimierung (SEO)',
      category: 'marketing',
      shortDesc: 'Technische, On-Page- und Keyword-Strategien für Spitzenplatzierungen Ihrer Website bei Google.',
      fullDesc: 'Generieren Sie planbaren organischen Traffic durch technische Audits, Inhaltsoptimierung und Backlink-Strategien.',
      deliverables: ['Technisches SEO-Audit', 'Ziel-Keyword-Mapping', 'On-Page-Content-Optimierung'],
      roiHighlights: 'Liefert kostengünstige, wiederkehrende Leads über die Google-Suche.'
    },
    {
      id: 'brand-strategy',
      title: 'Markenstrategie & Kreatives Branding',
      category: 'kreativ',
      shortDesc: 'Vollständige Markenentwicklung: Logos, Farbpaletten, Tonalität und umfassende Brand Guidelines.',
      fullDesc: 'Heben Sie Ihr Unternehmen vom Wettbewerb ab mit einer unverwechselbaren visuellen Identität und strategischer Positionierung.',
      deliverables: ['Primäres & Sekundäres Logo-Set', 'Brand-Guidelines-Handbuch (PDF)', 'Typografie- & Farbsystem'],
      roiHighlights: 'Schafft sofortige Premium-Wahrnehmung und hohes Kundenvertrauen.'
    },
    {
      id: 'digital-advertising',
      title: 'Digitale Werbung & Performance Ads',
      category: 'marketing',
      shortDesc: 'Präzise ausgesteuerte Meta- (Facebook/IG), Google Ads- und Amazon PPC-Kampagnen für unmittelbaren Umsatz.',
      fullDesc: 'Bezahlte Werbekampagnen mit maximalem ROAS durch exakte Zielgruppenansprache und kontinuierliche Optimierung.',
      deliverables: ['Werbemittel-Design & Copywriting', 'Kampagnen-Setup & Zielgruppenansprache', 'Wöchentliche ROAS-Optimierung'],
      roiHighlights: 'Skalierbare bezahlte Kundengewinnung mit messbarem Ertrag auf Werbeausgaben.'
    },
    {
      id: 'marketing-strategy',
      title: 'Ganzheitliche Marketingstrategie',
      category: 'marketing',
      shortDesc: 'Maßgeschneiderte Wachstumspläne und Umsetzungsleitfäden, exakt auf Ihre Umsatzziele ausgerichtet.',
      fullDesc: 'Klare, umsetzbare Roadmap mit Kanälen, Taktiken, Budgets und Zeitplänen zur Erreichung Ihrer wichtigsten KPIs.',
      deliverables: ['Umfassender Marketing-Blueprint', 'Wettbewerbs-Benchmark-Bericht', 'Budget-Allokationsplan'],
      roiHighlights: 'Vermeidet Streuverluste und fokussiert das Werbebudget auf die rentabelsten Kanäle.'
    }
  ]
};

export function getLocalizedServices(locale = DEFAULT_LOCALE) {
  const list = LOCALIZED_SERVICES[locale] || LOCALIZED_SERVICES[DEFAULT_LOCALE] || [];
  
  return BASE_SERVICES.map(base => {
    const localized = list.find(s => s.id === base.id) || {};
    return {
      ...base,
      title: localized.title || base.title,
      category: localized.category || base.category,
      shortDesc: localized.shortDesc || base.shortDesc,
      fullDesc: localized.fullDesc || base.fullDesc,
      deliverables: (localized.deliverables && localized.deliverables.length > 0)
        ? localized.deliverables
        : base.deliverables,
      roiHighlights: localized.roiHighlights || base.roiHighlights,
    };
  });
}

export function getLocalizedServiceById(id, locale = DEFAULT_LOCALE) {
  const services = getLocalizedServices(locale);
  return services.find(s => s.id === id) || null;
}