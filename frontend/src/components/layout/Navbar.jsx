"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

import {
  ChevronDown,
  Menu,
  Printer,
  MessageSquareText,
  FileText,
} from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Products",
      href: "/products",
      hasMegaMenu: true,
    },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <header
      className=" sticky top-0 z-50 w-full bg-[var(--card)] border-b border-[var(--border)] shadow-sm"
    >
      <div
        className={`w-full mx-auto flex items-center ${isScrolled ? "py-2" : "py-2.5"
          } px-5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          {/* Logo Icon */}
          <div
            className=" w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md group-hover:scale-105 "
          >
            <Printer className="w-5 h-5" />
          </div>

          {/* Brand Text */}
          <div className="flex flex-col leading-none">
            <span
              className=" text-[17px] sm:text-[18px] font-black tracking-tight text-[var(--foreground)] whitespace-nowrap "
            >
              PARAS PRINTERS
            </span>

            <span
              className="mt-1 text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--muted-foreground)] whitespace-nowrap "
            >
              Packaging & Labels
            </span>
          </div>
        </Link>

        <nav
          className=" hidden lg:flex flex-1 items-center justify-center mx-6 xl:mx-10 "
        >
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <Link
                      href={link.href}
                      className={` min-w-[88px] px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-semibold whitespace-nowrap

                        ${isActive
                          ? "text-[var(--primary)] bg-[var(--accent)]"
                          : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]"
                        }
                      `}
                    >
                      <span>{link.name}</span>

                      <ChevronDown
                        className={` w-3.5 h-3.5 transition-transform duration-200
                          ${showMegaMenu
                            ? "rotate-180"
                            : "rotate-0"
                          }
                        `}
                      />
                    </Link>

                    {showMegaMenu && (
                      <MegaMenu
                        onClose={() => setShowMegaMenu(false)}
                      />
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={` min-w-[78px] px-4 py-2.5 rounded-lg flex items-center justify-center text-[13px] font-semibold whitespace-nowrap transition-all duration-200

                    ${isActive
                      ? "text-[var(--primary)] bg-[var(--accent)]"
                      : "text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--muted)]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div
          className=" flex items-center justify-end gap-2 sm:gap-2.5 shrink-0 "
        >
          {/* Theme */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210?text=Hello%20Paras%20Printers,%20I%20would%20like%20to%20inquire%20about%20labels."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex shrink-0"
          >
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                <MessageSquareText className="w-4 h-4 text-emerald-500" />
              }
            >
              WhatsApp
            </Button>
          </a>

          {!authLoading && user && (
            <Link
              href="/account"
              className=" hidden lg:flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-[var(--muted)] "
            >
              {/* Avatar */}
              <div
                className=" flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-sm font-bold text-white "
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                    getInitials(user.name) || "U"
                  )}
              </div>

              {/* User name */}
              <div className="flex max-w-[130px] flex-col leading-tight">
                <span
                  className=" truncate text-[13px] font-bold text-[var(--foreground)] "
                >
                  {user.name}
                </span>

                <span
                  className=" text-[10px] text-[var(--muted-foreground)] "
                >
                  My Account
                </span>
              </div>
            </Link>
          )} 

          {!authLoading && !user && (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="hidden lg:inline-flex shrink-0"
              >
                <Button
                  variant="outline"
                  size="sm"
                >
                  Login
                </Button>
              </Link>

              {/* Sign Up */}
              <Link
                href="/signup"
                className="hidden lg:inline-flex shrink-0"
              >
                <Button
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {/* Get Quote */}
          <Link href="/request-quote" className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FileText className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">
                Get Quote
              </span>

              <span className="sm:hidden">
                Quote
              </span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setShowMobileNav(!showMobileNav)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5 text-[var(--foreground)]" />
          </Button>
        </div>
      </div>

      {showMobileNav && (
        <MobileNav
          links={navLinks}
          onClose={() => setShowMobileNav(false)}
        />
      )}
    </header>
  );
};