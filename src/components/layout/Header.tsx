"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, User, LogOut, Settings, UserRound } from "lucide-react";
import { NAVIGATION } from "@/data/constants";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { authState, logout } = useAuth();

  const profileName =
    authState.user?.profile?.full_name?.trim() ||
    [authState.user?.firstName, authState.user?.lastName].filter(Boolean).join(' ').trim() ||
    authState.user?.email ||
    'Mi cuenta';

  const handleAccess = () => {
    authState.isAuthenticated 
      ? router.push("/validation")
      : router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white border-border shandow-sm">
      <div className="w-full px-2 lg:px-4 lg:container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src="/images/logotipo.png"
                alt="Logo"
                width={100}
                height={40}
              />
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button onClick={handleAccess} className="text-sm text-gray-700 py-2 border flex gap-2 rounded-md border-gray-200 hover:shadow-lg px-4">
              <UserRound className="h-4 w-4" />
              <span>{authState.isAuthenticated ? profileName : 'Acceder'}</span>
            </button>
          </nav>
          <div className="block md:hidden rounded-md border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4 " />
              )}
            </Button>
            
          </div>
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full h-screen bg-[#00000050] md:hidden" onClick={() => setIsMenuOpen(false)}>
              <div className="md:hidden border-t bg-background shadow backdrop-blur-0">
                <nav className="flex flex-col space-y-2 py-4">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {/* <div className="px-4 py-2 space-y-2 ">
                    <div className="text-sm text-gray-700 py-2 border-b flex gap-2 rounded-2">
                        <UserRound className="h-4 w-4" />
                        <span>Acceder</span>
                    </div>
                  </div> */}
                </nav>
              </div>
            </div>
            )}
        </div>
      </div>
    </header>
  );
}
