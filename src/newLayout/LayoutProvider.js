import { createContext, useState } from "react";

// Create the LayoutContext
export const LayoutContext = createContext();

export default function LayoutProvider({ children }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <LayoutContext.Provider
      value={{ showHeader, setShowHeader, showSidebar, setShowSidebar }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
