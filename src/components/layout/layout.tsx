import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Settings } from "lucide-react"; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
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
        className={`${
          isOpen ? 'w-40' : 'w-16'
        } bg-gray-200 p-4 border-r transition-all duration-300 ease-in-out overflow-hidden dark:bg-black`}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="ml-[-8px]" size={20} />
          </Button>
          <span className="font-semibold text-sm">
            {isOpen ? "Menu" : ""}
          </span>
        </div>
        <nav className="space-y-4 text-sm">
          <a href="/dashboard" className="hover:underline flex">
          <LayoutDashboard className={`${
          isOpen ? 'mr-2' : 'ml-1'
        }`} size={20} />
            {isOpen ? "Dashboard" : ""}
          </a>
          <a href="/settings" className="hover:underline flex">
            <Settings className={`${
              isOpen ? 'mr-2' : 'ml-1'
            }`} size={20} />
            {isOpen ? "Settings" : ""}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white dark:bg-zinc-700">
        
        {children}
      </main>
    </div>
  );
};

export default Layout;
