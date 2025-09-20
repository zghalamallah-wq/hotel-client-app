import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Dashboard from "./components/Dashboard";
import CheckInOut from "./components/CheckInOut";
import DigitalKey from "./components/DigitalKey";
import RoomService from "./components/RoomService";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

type Screen = "welcome" | "dashboard" | "checkin" | "digital-key" | "room-service" | "reservations" | "transport" | "messages" | "profile";

interface UserData {
  name: string;
  reservationNumber: string;
  roomNumber: string;
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [userData, setUserData] = useState<UserData | null>(null);
  const { t } = useLanguage();

  const handleLogin = (name: string, reservation: string) => {
    setUserData({
      name,
      reservationNumber: reservation,
      roomNumber: "Suite 1205"
    });
    setCurrentScreen("dashboard");
  };

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const goBack = () => {
    setCurrentScreen("dashboard");
  };

  // Welcome/Login Screen
  if (currentScreen === "welcome" || !userData) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  // Main Application Screens
  return (
    <>
      {(() => {
        switch (currentScreen) {
          case "dashboard":
            return (
              <Dashboard
                userName={userData.name}
                reservationNumber={userData.reservationNumber}
                roomNumber={userData.roomNumber}
                onNavigate={navigateToScreen}
              />
            );

          case "checkin":
            return (
              <CheckInOut
                onBack={goBack}
                userName={userData.name}
                reservationNumber={userData.reservationNumber}
              />
            );

          case "digital-key":
            return (
              <DigitalKey
                onBack={goBack}
                roomNumber={userData.roomNumber}
              />
            );

          case "room-service":
            return (
              <RoomService
                onBack={goBack}
                roomNumber={userData.roomNumber}
              />
            );

          case "reservations":
            return (
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl mb-4">{t('reservations')}</h2>
                  <p className="text-slate-600 mb-4">Fonctionnalité en cours de développement</p>
                  <button 
                    onClick={goBack}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {t('backToDashboard')}
                  </button>
                </div>
              </div>
            );

          case "transport":
            return (
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl mb-4">Transport / Taxi</h2>
                  <p className="text-slate-600 mb-4">Fonctionnalité en cours de développement</p>
                  <button 
                    onClick={goBack}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {t('backToDashboard')}
                  </button>
                </div>
              </div>
            );

          case "messages":
            return (
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl mb-4">{t('messages')}</h2>
                  <p className="text-slate-600 mb-4">Messagerie avec le concierge - À venir</p>
                  <button 
                    onClick={goBack}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {t('backToDashboard')}
                  </button>
                </div>
              </div>
            );

          case "profile":
            return (
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl mb-4">{t('profile')}</h2>
                  <p className="text-slate-600 mb-2">Nom: {userData.name}</p>
                  <p className="text-slate-600 mb-2">Réservation: {userData.reservationNumber}</p>
                  <p className="text-slate-600 mb-4">Chambre: {userData.roomNumber}</p>
                  <button 
                    onClick={goBack}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    {t('backToDashboard')}
                  </button>
                </div>
              </div>
            );

          default:
            return (
              <Dashboard
                userName={userData.name}
                reservationNumber={userData.reservationNumber}
                roomNumber={userData.roomNumber}
                onNavigate={navigateToScreen}
              />
            );
        }
      })()}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}