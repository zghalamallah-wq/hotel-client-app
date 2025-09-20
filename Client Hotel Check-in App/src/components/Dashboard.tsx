import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  LogIn, 
  Key, 
  Coffee, 
  Calendar, 
  Car,
  Home,
  MessageCircle,
  User,
  Clock,
  Wifi,
  Dumbbell,
  UtensilsCrossed
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface DashboardProps {
  userName: string;
  reservationNumber: string;
  onNavigate: (screen: string) => void;
  roomNumber?: string;
}

export default function Dashboard({ userName, reservationNumber, onNavigate, roomNumber = "Suite 1205" }: DashboardProps) {
  const { t } = useLanguage();
  const quickActions = [
    {
      id: "checkin",
      title: "Check-in / Check-out",
      description: "Gérer votre séjour",
      icon: LogIn,
      color: "from-blue-500 to-blue-600",
      screen: "checkin"
    },
    {
      id: "key",
      title: "Clé Digitale",
      description: "Accès à votre chambre",
      icon: Key,
      color: "from-amber-500 to-amber-600",
      screen: "digital-key"
    },
    {
      id: "room-service",
      title: "Room Service",
      description: "Commandez à votre chambre",
      icon: Coffee,
      color: "from-green-500 to-green-600",
      screen: "room-service"
    },
    {
      id: "reservations",
      title: "Réservations",
      description: "Gérer vos réservations",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      screen: "reservations"
    },
    {
      id: "transport",
      title: "Taxi / Transport",
      description: "Réserver un transport",
      icon: Car,
      color: "from-red-500 to-red-600",
      screen: "transport"
    }
  ];

  const hotelServices = [
    { name: "WiFi gratuit", icon: Wifi, available: true },
    { name: "Salle de sport", icon: Dumbbell, hours: "6h-22h" },
    { name: "Restaurant", icon: UtensilsCrossed, hours: "19h-23h" },
    { name: "Room Service", icon: Coffee, hours: "24h/24" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 pb-6 relative">
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <LanguageSelector variant="dashboard" />
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl">{t('hello')} {userName.split(' ')[0]},</h1>
              <p className="text-slate-300 text-sm">{t('welcome')}</p>
            </div>
            <Badge variant="secondary" className="bg-amber-500 text-white text-sm">
              {roomNumber}
            </Badge>
          </div>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm text-slate-300">Réservation</p>
                <p className="text-lg">{reservationNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">Check-out</p>
                <p className="text-lg">Dimanche 22 Sep</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-lg mb-3">{t('quickAccess')}</h2>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Card 
                key={action.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-95"
                onClick={() => onNavigate(action.screen)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base mb-0.5">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Hotel Services */}
        <section>
          <h2 className="text-lg mb-3">{t('hotelServices')}</h2>
          <div className="grid grid-cols-2 gap-3">
            {hotelServices.map((service, index) => (
              <Card key={index} className="p-3">
                <div className="text-center space-y-2">
                  <service.icon className="w-6 h-6 text-slate-600 mx-auto" />
                  <div>
                    <p className="text-sm font-medium">{service.name}</p>
                    {service.hours && (
                      <p className="text-xs text-muted-foreground">{service.hours}</p>
                    )}
                    {service.available && (
                      <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-700">
                        Actif
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg mb-3">{t('recentActivity')}</h2>
          <Card className="p-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Check-in effectué aujourd'hui à 15h30</span>
            </div>
          </Card>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around">
            {[
              { icon: Home, label: t('home'), active: true },
              { icon: Calendar, label: t('reservations') },
              { icon: Coffee, label: t('services') },
              { icon: MessageCircle, label: t('messages') },
              { icon: User, label: t('profile') }
            ].map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  item.active 
                    ? "text-amber-600 bg-amber-50" 
                    : "text-slate-600 active:bg-slate-100"
                }`}
                onClick={() => {
                  if (item.label === t('services')) onNavigate("room-service");
                  if (item.label === t('reservations')) onNavigate("reservations");
                  if (item.label === t('messages')) onNavigate("messages");
                  if (item.label === t('profile')) onNavigate("profile");
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}