import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Key, 
  Unlock, 
  Clock, 
  Shield, 
  Smartphone,
  Wifi,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface DigitalKeyProps {
  onBack: () => void;
  roomNumber: string;
}

export default function DigitalKey({ onBack, roomNumber = "Suite 1205" }: DigitalKeyProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockSuccess, setUnlockSuccess] = useState(false);
  const [keyActive, setKeyActive] = useState(true);
  const { t } = useLanguage();

  const accessHistory = [
    { time: "15:30", date: "Aujourd'hui", action: "Chambre déverrouillée" },
    { time: "14:45", date: "Aujourd'hui", action: "Chambre verrouillée" },
    { time: "09:20", date: "Aujourd'hui", action: "Chambre déverrouillée" },
    { time: "23:15", date: "Hier", action: "Chambre verrouillée" },
  ];

  const handleUnlock = () => {
    setIsUnlocking(true);
    
    // Simulate unlock process
    setTimeout(() => {
      setIsUnlocking(false);
      setUnlockSuccess(true);
      
      setTimeout(() => {
        setUnlockSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4">
        <div className="max-w-md mx-auto flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1>{t('digitalKey')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Digital Key Card */}
        <div className="relative">
          <Card className="p-6 bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-white border-0 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-3 right-3">
                <Key className="w-20 h-20" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-amber-100 mb-1 text-sm">Chambre</p>
                  <h2 className="text-2xl">{roomNumber}</h2>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    <Shield className="w-3 h-3 mr-1" />
                    Sécurisé
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-xs">{t('validUntil')}</p>
                  <p className="text-sm">22 Sept, 11:00</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <span className="text-xs">{t('nfcReady')}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Unlock Button */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className={`p-6 rounded-full ${
                unlockSuccess 
                  ? "bg-green-100" 
                  : isUnlocking 
                    ? "bg-amber-100" 
                    : "bg-slate-100"
              } transition-all duration-300`}>
                {unlockSuccess ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : isUnlocking ? (
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Unlock className="w-12 h-12 text-slate-600" />
                )}
              </div>
            </div>

            {unlockSuccess ? (
              <div>
                <h3 className="text-xl text-green-600 mb-2">Chambre déverrouillée !</h3>
                <p className="text-slate-600">Vous pouvez maintenant entrer</p>
              </div>
            ) : isUnlocking ? (
              <div>
                <h3 className="text-xl mb-2">Déverrouillage en cours...</h3>
                <p className="text-slate-600">Approchez votre téléphone de la serrure</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl mb-2">Déverrouiller ma chambre</h3>
                <p className="text-slate-600">Appuyez et approchez votre téléphone</p>
              </div>
            )}

            <Button 
              onClick={handleUnlock}
              disabled={isUnlocking || unlockSuccess}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 py-4"
            >
              <Key className="w-5 h-5 mr-2" />
              {isUnlocking ? "Déverrouillage..." : "Déverrouiller maintenant"}
            </Button>
          </div>
        </Card>

        {/* Key Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-slate-600" />
              <span>{t('keyUsage')}</span>
            </div>
            <Badge variant={keyActive ? "default" : "secondary"}>
              {keyActive ? t('keyActive') : "Inactive"}
            </Badge>
          </div>
        </Card>

        {/* Access History */}
        <Card className="p-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Historique des accès
          </h3>
          
          <div className="space-y-3">
            {accessHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium">{entry.action}</p>
                  <p className="text-sm text-slate-600">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-blue-900 mb-1">Instructions d'utilisation</h4>
              <p className="text-blue-700 text-sm">
                Activez le Bluetooth et NFC, puis approchez votre téléphone de la serrure 
                après avoir appuyé sur "Déverrouiller maintenant".
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}