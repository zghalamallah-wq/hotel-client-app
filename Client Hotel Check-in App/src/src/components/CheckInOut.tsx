import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, 
  CheckCircle, 
  Camera, 
  MapPin, 
  Clock, 
  Star,
  Upload
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CheckInOutProps {
  onBack: () => void;
  userName: string;
  reservationNumber: string;
}

export default function CheckInOut({ onBack, userName, reservationNumber }: CheckInOutProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useLanguage();

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setShowCheckOut(true);
  };

  const submitCheckOut = () => {
    // Handle check-out submission
    alert("Check-out effectué avec succès !");
    onBack();
  };

  if (showCheckOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
          <div className="max-w-4xl mx-auto flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowCheckOut(false)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1>Check-out</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4">
          <Card className="p-6">
            <h2 className="text-xl mb-4">Évaluez votre séjour</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Note générale</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 ${star <= rating ? "text-amber-400" : "text-slate-300"}`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2">Commentaires (optionnel)</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Ajoutez des photos (optionnel)</p>
                <p className="text-sm text-slate-500">PNG, JPG jusqu'à 10MB</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <Button variant="outline" onClick={() => setShowCheckOut(false)}>
                {t('cancel')}
              </Button>
              <Button 
                onClick={submitCheckOut}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {t('confirmCheckin')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1>{t('checkInOut')}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Current Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg mb-2">Statut actuel</h2>
              <div className="flex items-center space-x-2">
                {isCheckedIn ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600">Enregistré</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="text-amber-600">En attente</span>
                  </>
                )}
              </div>
            </div>
            <Badge variant={isCheckedIn ? "default" : "secondary"}>
              {isCheckedIn ? "Suite 1205" : "En attente d'attribution"}
            </Badge>
          </div>
        </Card>

        {/* Reservation Details */}
        <Card className="p-4">
          <h3 className="text-base mb-3">Détails de la réservation</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Nom:</span>
              <span className="font-medium">{userName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Réservation:</span>
              <span className="font-medium">{reservationNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Arrivée:</span>
              <span className="font-medium">20 Sept 2024, 15:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Départ:</span>
              <span className="font-medium">22 Sept 2024, 11:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Type de chambre:</span>
              <span className="font-medium">Suite Deluxe</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        {!isCheckedIn ? (
          <Card className="p-4">
            <h3 className="text-base mb-3">Finaliser le check-in</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Scannez votre pièce d'identité ou confirmez en un clic
            </p>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-12"
                onClick={handleCheckIn}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('confirmCheckin')}
              </Button>
              
              <Button variant="outline" className="w-full h-12">
                <Camera className="w-4 h-4 mr-2" />
                {t('scanId')}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Room Information */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Informations de la chambre</h3>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-3 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4>Suite 1205</h4>
                  <p className="text-slate-600">12ème étage, aile ouest</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Vue sur mer • Balcon privé • King size bed
                  </p>
                </div>
              </div>
            </Card>

            {/* Check-out */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Prêt pour le départ ?</h3>
              <p className="text-slate-600 mb-4">
                Check-out prévu le 22 Septembre à 11:00
              </p>
              <Button 
                onClick={handleCheckOut}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                Commencer le check-out
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}