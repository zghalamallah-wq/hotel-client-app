import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // WelcomeScreen
    hotelName: 'Luxury Hotel',
    welcomeMessage: 'Votre expérience commence ici',
    fullName: 'Nom complet',
    enterName: 'Entrez votre nom',
    reservationNumber: 'Numéro de réservation',
    reservationPlaceholder: 'Ex: HTL123456',
    startCheckin: 'Commencer le check-in',
    or: 'ou',
    continueWithGoogle: 'Continuer avec Google',
    continueWithApple: 'Continuer avec Apple',
    noAccount: 'Pas encore de compte ?',
    createAccount: 'Créer un compte',
    
    // Dashboard
    hello: 'Bonjour',
    welcome: 'bienvenue au Luxury Hotel',
    quickAccess: 'Accès rapide',
    hotelServices: 'Services de l\'hôtel',
    recentActivity: 'Activité récente',
    
    // Navigation
    home: 'Accueil',
    reservations: 'Réservations',
    services: 'Services',
    messages: 'Messages',
    profile: 'Profil',
    
    // CheckInOut
    checkInOut: 'Check-in / Check-out',
    scanId: 'Scanner votre pièce d\'identité',
    scanIdDesc: 'Placez votre pièce d\'identité face à la caméra',
    scanningId: 'Analyse en cours...',
    idScanned: 'Pièce d\'identité scannée avec succès',
    personalInfo: 'Informations personnelles',
    confirmInfo: 'Confirmez vos informations',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    emergencyContact: 'Contact d\'urgence',
    signature: 'Signature',
    signHere: 'Signez ici',
    clearSignature: 'Effacer',
    confirmCheckin: 'Confirmer le check-in',
    back: 'Retour',

    // DigitalKey
    digitalKey: 'Clé Digitale',
    roomAccess: 'Accès chambre',
    keyActive: 'Clé active',
    tapToOpen: 'Appuyez pour ouvrir',
    keyUsage: 'Utilisation de la clé',
    validUntil: 'Valide jusqu\'au',
    qrCode: 'Code QR',
    nfcReady: 'NFC prêt',
    approaches: 'Approchez du lecteur',
    shareKey: 'Partager la clé',
    keySettings: 'Paramètres',

    // RoomService
    roomServiceTitle: 'Room Service',
    orderFor: 'Commande pour la chambre',
    categories: 'Catégories',
    breakfast: 'Petit-déjeuner',
    lunch: 'Déjeuner',
    dinner: 'Dîner',
    drinks: 'Boissons',
    desserts: 'Desserts',
    cart: 'Panier',
    items: 'articles',
    total: 'Total',
    addToCart: 'Ajouter au panier',
    placeOrder: 'Passer commande',
    estimatedDelivery: 'Livraison estimée',
    specialRequests: 'Demandes spéciales',
    orderPlaced: 'Commande passée',
    orderTracking: 'Suivi de commande',

    // General
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    backToDashboard: 'Retour au dashboard',
    
    // Languages
    french: 'Français',
    english: 'English',
    spanish: 'Español',
    german: 'Deutsch',
    italian: 'Italiano'
  },
  en: {
    // WelcomeScreen
    hotelName: 'Luxury Hotel',
    welcomeMessage: 'Your experience starts here',
    fullName: 'Full name',
    enterName: 'Enter your name',
    reservationNumber: 'Reservation number',
    reservationPlaceholder: 'Ex: HTL123456',
    startCheckin: 'Start check-in',
    or: 'or',
    continueWithGoogle: 'Continue with Google',
    continueWithApple: 'Continue with Apple',
    noAccount: 'No account yet?',
    createAccount: 'Create account',
    
    // Dashboard
    hello: 'Hello',
    welcome: 'welcome to Luxury Hotel',
    quickAccess: 'Quick access',
    hotelServices: 'Hotel services',
    recentActivity: 'Recent activity',
    
    // Navigation
    home: 'Home',
    reservations: 'Reservations',
    services: 'Services',
    messages: 'Messages',
    profile: 'Profile',
    
    // CheckInOut
    checkInOut: 'Check-in / Check-out',
    scanId: 'Scan your ID',
    scanIdDesc: 'Place your ID in front of the camera',
    scanningId: 'Scanning...',
    idScanned: 'ID scanned successfully',
    personalInfo: 'Personal information',
    confirmInfo: 'Confirm your information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    emergencyContact: 'Emergency contact',
    signature: 'Signature',
    signHere: 'Sign here',
    clearSignature: 'Clear',
    confirmCheckin: 'Confirm check-in',
    back: 'Back',

    // DigitalKey
    digitalKey: 'Digital Key',
    roomAccess: 'Room access',
    keyActive: 'Key active',
    tapToOpen: 'Tap to open',
    keyUsage: 'Key usage',
    validUntil: 'Valid until',
    qrCode: 'QR Code',
    nfcReady: 'NFC ready',
    approaches: 'Approach the reader',
    shareKey: 'Share key',
    keySettings: 'Settings',

    // RoomService
    roomServiceTitle: 'Room Service',
    orderFor: 'Order for room',
    categories: 'Categories',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    drinks: 'Drinks',
    desserts: 'Desserts',
    cart: 'Cart',
    items: 'items',
    total: 'Total',
    addToCart: 'Add to cart',
    placeOrder: 'Place order',
    estimatedDelivery: 'Estimated delivery',
    specialRequests: 'Special requests',
    orderPlaced: 'Order placed',
    orderTracking: 'Order tracking',

    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    backToDashboard: 'Back to dashboard',
    
    // Languages
    french: 'Français',
    english: 'English',
    spanish: 'Español',
    german: 'Deutsch',
    italian: 'Italiano'
  },
  es: {
    // WelcomeScreen
    hotelName: 'Luxury Hotel',
    welcomeMessage: 'Tu experiencia comienza aquí',
    fullName: 'Nombre completo',
    enterName: 'Ingrese su nombre',
    reservationNumber: 'Número de reserva',
    reservationPlaceholder: 'Ej: HTL123456',
    startCheckin: 'Iniciar check-in',
    or: 'o',
    continueWithGoogle: 'Continuar con Google',
    continueWithApple: 'Continuar con Apple',
    noAccount: '¿Aún no tienes cuenta?',
    createAccount: 'Crear cuenta',
    
    // Dashboard
    hello: 'Hola',
    welcome: 'bienvenido al Luxury Hotel',
    quickAccess: 'Acceso rápido',
    hotelServices: 'Servicios del hotel',
    recentActivity: 'Actividad reciente',
    
    // Navigation
    home: 'Inicio',
    reservations: 'Reservas',
    services: 'Servicios',
    messages: 'Mensajes',
    profile: 'Perfil',
    
    // CheckInOut
    checkInOut: 'Check-in / Check-out',
    scanId: 'Escanear su identificación',
    scanIdDesc: 'Coloque su identificación frente a la cámara',
    scanningId: 'Escaneando...',
    idScanned: 'Identificación escaneada exitosamente',
    personalInfo: 'Información personal',
    confirmInfo: 'Confirme su información',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Email',
    emergencyContact: 'Contacto de emergencia',
    signature: 'Firma',
    signHere: 'Firme aquí',
    clearSignature: 'Borrar',
    confirmCheckin: 'Confirmar check-in',
    back: 'Atrás',

    // DigitalKey
    digitalKey: 'Llave Digital',
    roomAccess: 'Acceso a habitación',
    keyActive: 'Llave activa',
    tapToOpen: 'Toque para abrir',
    keyUsage: 'Uso de llave',
    validUntil: 'Válida hasta',
    qrCode: 'Código QR',
    nfcReady: 'NFC listo',
    approaches: 'Acérquese al lector',
    shareKey: 'Compartir llave',
    keySettings: 'Configuración',

    // RoomService
    roomServiceTitle: 'Servicio a la Habitación',
    orderFor: 'Pedido para habitación',
    categories: 'Categorías',
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    drinks: 'Bebidas',
    desserts: 'Postres',
    cart: 'Carrito',
    items: 'artículos',
    total: 'Total',
    addToCart: 'Agregar al carrito',
    placeOrder: 'Realizar pedido',
    estimatedDelivery: 'Entrega estimada',
    specialRequests: 'Solicitudes especiales',
    orderPlaced: 'Pedido realizado',
    orderTracking: 'Seguimiento del pedido',

    // General
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    backToDashboard: 'Volver al dashboard',
    
    // Languages
    french: 'Français',
    english: 'English',
    spanish: 'Español',
    german: 'Deutsch',
    italian: 'Italiano'
  },
  de: {
    // WelcomeScreen
    hotelName: 'Luxury Hotel',
    welcomeMessage: 'Ihr Erlebnis beginnt hier',
    fullName: 'Vollständiger Name',
    enterName: 'Geben Sie Ihren Namen ein',
    reservationNumber: 'Reservierungsnummer',
    reservationPlaceholder: 'Z.B.: HTL123456',
    startCheckin: 'Check-in starten',
    or: 'oder',
    continueWithGoogle: 'Mit Google fortfahren',
    continueWithApple: 'Mit Apple fortfahren',
    noAccount: 'Noch kein Konto?',
    createAccount: 'Konto erstellen',
    
    // Dashboard
    hello: 'Hallo',
    welcome: 'willkommen im Luxury Hotel',
    quickAccess: 'Schnellzugriff',
    hotelServices: 'Hotelservices',
    recentActivity: 'Letzte Aktivität',
    
    // Navigation
    home: 'Start',
    reservations: 'Reservierungen',
    services: 'Services',
    messages: 'Nachrichten',
    profile: 'Profil',
    
    // CheckInOut
    checkInOut: 'Check-in / Check-out',
    scanId: 'Ausweis scannen',
    scanIdDesc: 'Halten Sie Ihren Ausweis vor die Kamera',
    scanningId: 'Scannen...',
    idScanned: 'Ausweis erfolgreich gescannt',
    personalInfo: 'Persönliche Informationen',
    confirmInfo: 'Bestätigen Sie Ihre Informationen',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    emergencyContact: 'Notfallkontakt',
    signature: 'Unterschrift',
    signHere: 'Hier unterschreiben',
    clearSignature: 'Löschen',
    confirmCheckin: 'Check-in bestätigen',
    back: 'Zurück',

    // DigitalKey
    digitalKey: 'Digitaler Schlüssel',
    roomAccess: 'Zimmerzugang',
    keyActive: 'Schlüssel aktiv',
    tapToOpen: 'Zum Öffnen antippen',
    keyUsage: 'Schlüsselverwendung',
    validUntil: 'Gültig bis',
    qrCode: 'QR-Code',
    nfcReady: 'NFC bereit',
    approaches: 'An den Leser heranführen',
    shareKey: 'Schlüssel teilen',
    keySettings: 'Einstellungen',

    // RoomService
    roomServiceTitle: 'Zimmerservice',
    orderFor: 'Bestellung für Zimmer',
    categories: 'Kategorien',
    breakfast: 'Frühstück',
    lunch: 'Mittagessen',
    dinner: 'Abendessen',
    drinks: 'Getränke',
    desserts: 'Desserts',
    cart: 'Warenkorb',
    items: 'Artikel',
    total: 'Gesamt',
    addToCart: 'In Warenkorb',
    placeOrder: 'Bestellung aufgeben',
    estimatedDelivery: 'Geschätzte Lieferung',
    specialRequests: 'Sonderwünsche',
    orderPlaced: 'Bestellung aufgegeben',
    orderTracking: 'Bestellverfolgung',

    // General
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    next: 'Weiter',
    previous: 'Zurück',
    close: 'Schließen',
    backToDashboard: 'Zurück zum Dashboard',
    
    // Languages
    french: 'Français',
    english: 'English',
    spanish: 'Español',
    german: 'Deutsch',
    italian: 'Italiano'
  },
  it: {
    // WelcomeScreen
    hotelName: 'Luxury Hotel',
    welcomeMessage: 'La tua esperienza inizia qui',
    fullName: 'Nome completo',
    enterName: 'Inserisci il tuo nome',
    reservationNumber: 'Numero di prenotazione',
    reservationPlaceholder: 'Es: HTL123456',
    startCheckin: 'Inizia check-in',
    or: 'o',
    continueWithGoogle: 'Continua con Google',
    continueWithApple: 'Continua con Apple',
    noAccount: 'Non hai ancora un account?',
    createAccount: 'Crea account',
    
    // Dashboard
    hello: 'Ciao',
    welcome: 'benvenuto al Luxury Hotel',
    quickAccess: 'Accesso rapido',
    hotelServices: 'Servizi dell\'hotel',
    recentActivity: 'Attività recente',
    
    // Navigation
    home: 'Home',
    reservations: 'Prenotazioni',
    services: 'Servizi',
    messages: 'Messaggi',
    profile: 'Profilo',
    
    // CheckInOut
    checkInOut: 'Check-in / Check-out',
    scanId: 'Scansiona il documento',
    scanIdDesc: 'Posiziona il documento davanti alla fotocamera',
    scanningId: 'Scansione in corso...',
    idScanned: 'Documento scansionato con successo',
    personalInfo: 'Informazioni personali',
    confirmInfo: 'Conferma le tue informazioni',
    address: 'Indirizzo',
    phone: 'Telefono',
    email: 'Email',
    emergencyContact: 'Contatto di emergenza',
    signature: 'Firma',
    signHere: 'Firma qui',
    clearSignature: 'Cancella',
    confirmCheckin: 'Conferma check-in',
    back: 'Indietro',

    // DigitalKey
    digitalKey: 'Chiave Digitale',
    roomAccess: 'Accesso camera',
    keyActive: 'Chiave attiva',
    tapToOpen: 'Tocca per aprire',
    keyUsage: 'Utilizzo chiave',
    validUntil: 'Valida fino al',
    qrCode: 'Codice QR',
    nfcReady: 'NFC pronto',
    approaches: 'Avvicinati al lettore',
    shareKey: 'Condividi chiave',
    keySettings: 'Impostazioni',

    // RoomService
    roomServiceTitle: 'Servizio in Camera',
    orderFor: 'Ordine per camera',
    categories: 'Categorie',
    breakfast: 'Colazione',
    lunch: 'Pranzo',
    dinner: 'Cena',
    drinks: 'Bevande',
    desserts: 'Dolci',
    cart: 'Carrello',
    items: 'articoli',
    total: 'Totale',
    addToCart: 'Aggiungi al carrello',
    placeOrder: 'Effettua ordine',
    estimatedDelivery: 'Consegna stimata',
    specialRequests: 'Richieste speciali',
    orderPlaced: 'Ordine effettuato',
    orderTracking: 'Tracciamento ordine',

    // General
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    cancel: 'Annulla',
    confirm: 'Conferma',
    save: 'Salva',
    next: 'Avanti',
    previous: 'Indietro',
    close: 'Chiudi',
    backToDashboard: 'Torna al dashboard',
    
    // Languages
    french: 'Français',
    english: 'English',
    spanish: 'Español',
    german: 'Deutsch',
    italian: 'Italiano'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}