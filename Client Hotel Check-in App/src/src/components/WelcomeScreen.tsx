import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Hotel, Chrome, Apple } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface WelcomeScreenProps {
  onLogin: (name: string, reservation: string) => void;
}

export default function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [reservation, setReservation] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && reservation.trim()) {
      onLogin(name, reservation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Language Selector */}
      <LanguageSelector variant="welcome" />
      
      <div className="w-full max-w-sm space-y-6">
        {/* Logo and Branding */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-3 rounded-2xl">
              <Hotel className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-white text-2xl">{t('hotelName')}</h1>
          <p className="text-slate-300 text-sm">{t('welcomeMessage')}</p>
        </div>

        {/* Login Form */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">
                  {t('fullName')}
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('enterName')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">
                  {t('reservationNumber')}
                </label>
                <Input
                  type="text"
                  value={reservation}
                  onChange={(e) => setReservation(e.target.value)}
                  placeholder={t('reservationPlaceholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white border-0 h-12"
            >
              {t('startCheckin')}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900 px-3 text-slate-300">{t('or')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Chrome className="w-4 h-4 mr-2" />
                {t('continueWithGoogle')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Apple className="w-4 h-4 mr-2" />
                {t('continueWithApple')}
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-slate-300">
            {t('noAccount')}{" "}
            <button 
              type="button"
              className="text-amber-400 hover:text-amber-300"
              onClick={() => setIsLogin(!isLogin)}
            >
              {t('createAccount')}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}