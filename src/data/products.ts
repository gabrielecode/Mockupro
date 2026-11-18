export interface ProductType {
  id: string;
  label: string;
  category: string;
  placements: string[];
}

export interface ColorOption {
  hex: string;
  label: string;
}

export interface EnvironmentOption {
  id: string;
  label: string;
}

export interface ModelOption {
  id: string;
  label: string;
}

export interface Scenario {
  id: string;
  label: string;
  promptSuffix: string;
}

export const PRODUCT_TYPES: ProductType[] = [
  // ABBIGLIAMENTO & MODA (Apparel & Fashion)
  { id: "t-shirt", label: "T-Shirt / Maglietta", category: "Abbigliamento & Moda", placements: ["Centrato sul petto", "Taschino Sinistro", "Stampa frontale grande", "Stampa posteriore"] },
  { id: "hoodie", label: "Felpa con Cappuccio (Hoodie)", category: "Abbigliamento & Moda", placements: ["Centrato sul petto", "Stampa frontale grande", "Stampa posteriore"] },
  { id: "sweater", label: "Felpa Girocollo (Sweatshirt)", category: "Abbigliamento & Moda", placements: ["Centrato sul petto", "Stampa frontale grande", "Stampa posteriore"] },
  { id: "cap", label: "Cappellino con Visiera (Baseball Cap)", category: "Abbigliamento & Moda", placements: ["Centrato sul fronte", "Ricamo laterale"] },
  { id: "beanie", label: "Berretto in Lana (Beanie)", category: "Abbigliamento & Moda", placements: ["Dettaglio sul risvolto", "Centrato sul fronte"] },
  { id: "socks", label: "Calzini di Design", category: "Abbigliamento & Moda", placements: ["Stampa laterale", "Stampa all-over"] },
  { id: "joggers", label: "Pantaloni Sportivi (Joggers)", category: "Abbigliamento & Moda", placements: ["Stampa gamba sinistra", "Stampa tasca posteriore"] },
  { id: "apron", label: "Grembiule da Cucina", category: "Abbigliamento & Moda", placements: ["Centrato sulla pettorina", "Stampa tasca anteriore"] },
  { id: "tote-bag", label: "Borsa di Tela (Tote Bag)", category: "Abbigliamento & Moda", placements: ["Stampa centrata sul fronte", "Stampa all-over"] },

  // PACKAGING, SCATOLE & BOTTIGLIE (Packaging & Bottles)
  { id: "shipping-box", label: "Scatola di Spedizione e-commerce", category: "Packaging & Scatole", placements: ["Stampa coperchio superiore", "Etichetta frontale", "Fascetta avvolgente"] },
  { id: "product-box", label: "Astuccio per Prodotti / Cosmetici", category: "Packaging & Scatole", placements: ["Facciata principale", "Retro scatola", "Alette laterali"] },
  { id: "amber-bottle", label: "Flacone in Vetro Ambrato (Cosmetici)", category: "Packaging & Scatole", placements: ["Etichetta frontale", "Etichetta avvolgente 360°"] },
  { id: "glass-jar", label: "Vasetto in Vetro (Crema / Spezie)", category: "Packaging & Scatole", placements: ["Etichetta frontale", "Sigillo sul coperchio"] },
  { id: "wine-bottle", label: "Bottiglia di Vino / Bevande", category: "Packaging & Scatole", placements: ["Etichetta principale fronte", "Controetichetta", "Colletto bottiglia"] },
  { id: "coffee-bag", label: "Busta per Caffè con Zip", category: "Packaging & Scatole", placements: ["Etichetta centrale", "Stampa frontale diretta"] },

  // CASA & ARREDAMENTO (Home & Living)
  { id: "mug", label: "Tazza in Ceramica (Mug)", category: "Casa & Arredamento", placements: ["Stampa frontale", "Avvolgente sinistra", "Avvolgente destra"] },
  { id: "tumbler", label: "Borraccia Termica / Tumbler", category: "Casa & Arredamento", placements: ["Stampa frontale verticale", "Stampa a tutto tondo"] },
  { id: "pillow", label: "Cuscino Decorativo", category: "Casa & Arredamento", placements: ["Stampa centrata", "Pattern all-over"] },
  { id: "candle", label: "Candela Profumata in Vetro", category: "Casa & Arredamento", placements: ["Etichetta frontale", "Fascetta adesiva"] },
  { id: "blanket", label: "Coperta in Pile (Throw Blanket)", category: "Casa & Arredamento", placements: ["Stampa centrata", "Pattern ripetuto"] },
  { id: "cutting-board", label: "Tagliere in Legno / Bambù", category: "Casa & Arredamento", placements: ["Incisione laser centrata", "Angolo inferiore"] },
  { id: "coasters", label: "Set Sottobicchieri", category: "Casa & Arredamento", placements: ["Stampa centrata su singolo"] },

  // CANCELLERIA, ARTE & CARTACEA (Stationery & Print)
  { id: "poster", label: "Poster / Quadro da Parete in Cornice", category: "Cancelleria & Arte", placements: ["Stampa intera (Full Frame)", "Passepartout centrale"] },
  { id: "notebook", label: "Quaderno / Agenda con copertina", category: "Cancelleria & Arte", placements: ["Copertina frontale", "Incisione in basso al centro"] },
  { id: "business-card", label: "Biglietti da Visita (Mockup Set)", category: "Cancelleria & Arte", placements: ["Fronte biglietto", "Retro biglietto"] },
  { id: "greeting-card", label: "Cartolina / Invito d'Auguri", category: "Cancelleria & Arte", placements: ["Stampa frontale", "Interno cartolina"] },
  { id: "stickers", label: "Set Adesivi Fustellati (Stickers)", category: "Cancelleria & Arte", placements: ["Contorno fustellato", "Foglio intero"] },

  // TECH & GADGET
  { id: "phone-case", label: "Cover Smartphone (iPhone / Samsung)", category: "Tech & Gadget", placements: ["Stampa posteriore centrata", "Stampa integrale wrap"] },
  { id: "laptop-sleeves", label: "Custodia per Laptop / Tablet", category: "Tech & Gadget", placements: ["Superficie frontale", "Angolo inferiore"] },
  { id: "mousepad", label: "Tappetino per Mouse Gaming", category: "Tech & Gadget", placements: ["Stampa centrata", "Stampa all-over"] },
  { id: "keychain", label: "Portachiavi Personalizzato", category: "Tech & Gadget", placements: ["Superficie centrale"] }
];

export const COLORS: ColorOption[] = [
  { hex: "#111111", label: "Nero Opaco / Antracite" },
  { hex: "#ffffff", label: "Bianco Puro / Neve" },
  { hex: "#d1d5db", label: "Grigio Melange / Argento" },
  { hex: "#1e3a8a", label: "Blu Notte / Navy" },
  { hex: "#14532d", label: "Verde Foresta / Oliva" },
  { hex: "#7f1d1d", label: "Bordeaux / Rosso Vino" },
  { hex: "#d97706", label: "Ocra / Ambra Caldo" },
  { hex: "#f5e1c8", label: "Sabbia Dorata / Naturale" },
  { hex: "#831843", label: "Rosa Antico / Magenta" }
];

export const ENVIRONMENTS: EnvironmentOption[] = [
  { id: "studio", label: "Studio Fotografico Neutro (Minimal Clean)" },
  { id: "urban", label: "Contesto Urbano / Streetwear / Lifestyle" },
  { id: "cozy", label: "Interno Domestico Accogliente (Cozy Home)" },
  { id: "nature", label: "Esterno / Luce Naturale (Natural Sunlight)" },
  { id: "luxury", label: "Showroom di Lusso / Minimalista High-End" },
  { id: "industrial", label: "Laboratorio / Superficie in Legno Grezzo e Cemento" }
];

export const MODEL_TYPES: ModelOption[] = [
  { id: "unisex", label: "Modello / Modella Professionale" },
  { id: "flatlay", label: "Still Life / Piatto (Flat Lay Zen)" },
  { id: "display", label: "Espositore / Podio in Scena" },
  { id: "handheld", label: "In Mano / Utilizzo Dinamico" }
];

export const PRINT_EFFECTS = [
  { id: "dtg", label: "Stampa Standard (DTG / Serigrafia / Digitale)" },
  { id: "embroidery", label: "Ricamo in Rilievo (3D Embroidery)" },
  { id: "gold-foil", label: "Lamina Metallizzata (Gold / Silver Foil)" },
  { id: "holographic", label: "Effetto Olografico (Rainbow Iridescent)" },
  { id: "embossed", label: "Rilievo / Sbalzo (Embossed / Debossed)" },
  { id: "glitter", label: "Glitter Brillante (Shimmer Sparkle)" },
  { id: "laser-carving", label: "Incisione Laser (Legno / Pelle / Vetro)" },
  { id: "sublimation", label: "Sublimazione Integrata (All-over Dye)" },
  { id: "neon", label: "Fluorescente / Neon Glow" },
  { id: "distressed", label: "Vintage Consumato / Grunge" }
];
