import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider"

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`$ {
          isOpen ? 'w-64' : 'w-16'
        } bg-gray-100 p-4 border-r transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={20} />
          </Button>
          <span className="font-semibold text-sm">
            {isOpen ? "Menu" : ""}
          </span>
        </div>
        <nav className="space-y-4 text-sm">
          <a href="/dashboard" className="block hover:underline">
            {isOpen ? "Dashboard" : ""}
          </a>
          <a href="/settings" className="block hover:underline">
            {isOpen ? "Settings" : ""}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </main>
    </div>
  );
};

export default Layout;
