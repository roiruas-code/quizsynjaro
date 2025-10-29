import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const notifications = [
  { name: "Maria", location: "São Paulo", action: "perdeu 8kg em 3 meses", icon: "🎉" },
  { name: "João", location: "Rio de Janeiro", action: "completou o plano", icon: "✅" },
  { name: "Ana", location: "Belo Horizonte", action: "está adorando as receitas", icon: "❤️" },
  { name: "Carlos", location: "Brasília", action: "perdeu 5kg na primeira semana", icon: "💪" },
  { name: "Fernanda", location: "Curitiba", action: "acabou de se inscrever", icon: "🚀" },
  { name: "Patricia", location: "Porto Alegre", action: "atingiu sua meta de peso", icon: "🎯" },
  { name: "Roberto", location: "Salvador", action: "renovou por mais 3 meses", icon: "🔄" },
  { name: "Camila", location: "Fortaleza", action: "recomendou para 3 amigas", icon: "👥" },
];

export const SocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-card border border-border rounded-lg shadow-elegant p-4 flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="text-2xl">{notification.icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            <span className="font-semibold">{notification.name}</span> de{" "}
            {notification.location}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {notification.action} há alguns minutos
          </p>
        </div>
      </div>
    </div>
  );
};
