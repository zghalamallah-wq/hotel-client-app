import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Coffee, 
  UtensilsCrossed, 
  Waves, 
  Shirt,
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface RoomServiceProps {
  onBack: () => void;
  roomNumber: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export default function RoomService({ onBack, roomNumber = "Suite 1205" }: RoomServiceProps) {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { t } = useLanguage();

  const categories = [
    { id: "breakfast", name: t('breakfast'), icon: Coffee, color: "from-amber-500 to-yellow-500" },
    { id: "dinner", name: t('dinner'), icon: UtensilsCrossed, color: "from-red-500 to-orange-500" },
    { id: "spa", name: "Spa", icon: Waves, color: "from-blue-500 to-teal-500" },
    { id: "housekeeping", name: "Ménage", icon: Shirt, color: "from-green-500 to-emerald-500" },
  ];

  const menuItems = {
    breakfast: [
      { id: "b1", name: "Petit-déjeuner Continental", price: 25, description: "Croissants, confiture, café, jus d'orange" },
      { id: "b2", name: "Oeufs Benedict", price: 18, description: "Oeufs pochés, saumon fumé, sauce hollandaise" },
      { id: "b3", name: "Pancakes aux fruits", price: 16, description: "Pancakes, fruits frais, sirop d'érable" },
      { id: "b4", name: "Café Premium", price: 8, description: "Expresso, cappuccino ou latte" }
    ],
    dinner: [
      { id: "d1", name: "Saumon grillé", price: 32, description: "Saumon, légumes de saison, sauce citron" },
      { id: "d2", name: "Boeuf Wellington", price: 45, description: "Filet de boeuf en croûte, purée truffée" },
      { id: "d3", name: "Risotto aux champignons", price: 26, description: "Risotto crémeux, champignons sauvages" },
      { id: "d4", name: "Salade César", price: 18, description: "Salade, poulet grillé, parmesan, croutons" }
    ],
    spa: [
      { id: "s1", name: "Massage relaxant 60min", price: 80, description: "Massage corps entier aux huiles essentielles" },
      { id: "s2", name: "Soin du visage", price: 65, description: "Nettoyage, gommage, masque hydratant" },
      { id: "s3", name: "Accès Spa privatisé", price: 50, description: "2h d'accès privé au spa et jacuzzi" },
      { id: "s4", name: "Manucure/Pédicure", price: 40, description: "Soin complet ongles mains et pieds" }
    ],
    housekeeping: [
      { id: "h1", name: "Service ménage supplémentaire", price: 25, description: "Nettoyage complet de la chambre" },
      { id: "h2", name: "Service repassage", price: 15, description: "Repassage jusqu'à 10 articles" },
      { id: "h3", name: "Changement de draps", price: 12, description: "Draps et serviettes fraîches" },
      { id: "h4", name: "Réapprovisionnement minibar", price: 10, description: "Recharge complète du minibar" }
    ]
  };

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { 
        ...item, 
        quantity: 1, 
        category: activeCategory 
      }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setShowCart(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl mb-2">Commande confirmée !</h2>
          <p className="text-slate-600 mb-4">
            Votre commande sera livrée dans votre chambre {roomNumber} dans 15-20 minutes.
          </p>
          <Button onClick={() => { setOrderPlaced(false); onBack(); }}>
            Retour au dashboard
          </Button>
        </Card>
      </div>
    );
  }

  if (showCart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
          <div className="max-w-4xl mx-auto flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowCart(false)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1>Panier ({cart.length})</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <Card className="p-8 text-center">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Votre panier est vide</p>
            </Card>
          ) : (
            <>
              {/* Cart Items */}
              <Card className="p-6">
                <h3 className="text-lg mb-4">Articles sélectionnés</h3>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div className="flex-1">
                        <h4>{item.name}</h4>
                        <p className="text-slate-600 text-sm">{item.price}€ x {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 py-1 bg-slate-100 rounded">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl">{getTotalPrice()}€</span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Livraison en chambre {roomNumber}</span>
                    <span>Gratuite</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps estimé</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      15-20 min
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={placeOrder}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Confirmer la commande
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1>{t('roomServiceTitle')}</h1>
          </div>
          {cart.length > 0 && (
            <Button 
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t('cart')} ({cart.length})
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-4 cursor-pointer transition-all transform hover:scale-105 ${
                activeCategory === category.id ? "ring-2 ring-amber-400" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="text-center space-y-2">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} mx-auto w-fit`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium">{category.name}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <h2 className="text-xl">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <div className="grid gap-4">
            {menuItems[activeCategory as keyof typeof menuItems]?.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">{item.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{item.price}€</Badge>
                      {activeCategory !== "spa" && activeCategory !== "housekeeping" && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <Clock className="w-3 h-3 mr-1" />
                          15-20 min
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => addToCart(item)}
                    className="ml-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}