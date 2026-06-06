import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const ToastContext = React.createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "relative rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-right",
              t.variant === "success" && "bg-green-50 border-green-200 text-green-900",
              t.variant === "error" && "bg-red-50 border-red-200 text-red-900",
              t.variant === "default" && "bg-white border-gray-200"
            )}
          >
            <button
              onClick={() => removeToast(t.id)}
              className="absolute top-2 right-2 rounded-md p-1 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </button>
            {t.title && <div className="font-semibold mb-1">{t.title}</div>}
            {t.description && <div className="text-sm opacity-90">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
