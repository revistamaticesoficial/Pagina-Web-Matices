'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { NAVIGATION } from '@/data/constants';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { authState, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image src="/images/logotipo.png" alt="Logo" width={100} height={40} />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {authState.isAuthenticated ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{authState.user?.firstName}</span>
                  </Button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{authState.user?.firstName} {authState.user?.lastName}</p>
                        <p className="text-gray-500 text-xs">{authState.user?.email}</p>
                      </div>

                      <Link
                        href="/gestion/inicio"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Gestión
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // <>
                //   {/* <Link href="/auth/login">
                //     <Button variant="outline" size="sm">
                //       <User className="h-4 w-4 mr-2" />
                //       Iniciar Sesión
                //     </Button>
                //   </Link>
                //   <Link href="/auth/register">
                //     <Button size="sm">
                //       Crear Cuenta
                //     </Button>
                //   </Link> */}
                // </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
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

              {/* <div className="px-4 py-2 space-y-2">
                {authState.isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 py-2 border-b">
                      <p className="font-medium">{authState.user?.firstName} {authState.user?.lastName}</p>
                      <p className="text-gray-500 text-xs">{authState.user?.email}</p>
                    </div>

                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={async () => {
                        await logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        Crear Cuenta
                      </Button>
                    </Link>
                  </>
                )}
              </div> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}