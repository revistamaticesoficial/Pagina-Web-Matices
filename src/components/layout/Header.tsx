'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X, User } from 'lucide-react';
import { NAVIGATION } from '@/data/constants';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src="/images/logotipo.png" alt="Logo" width={100} height={40} />
          </div>

          {/* Desktop Navigation */}
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
            {/* <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button> */}
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Iniciar Sesión
            </Button>
            <Button size="sm">
              Crear Cuenta
            </Button>
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
              <div className="px-4 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
                <Button size="sm" className="w-full">
                  Suscribirse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

