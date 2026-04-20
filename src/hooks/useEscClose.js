import { useEffect } from "react";

export function useEscClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);
}
