import React from "react";
import Link from "next/link";

export default function NavBar() {
  const navLinks: { href: string; text: string }[] = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/hotels",
      text: "Hotels",
    },
  ];
  const authLinks: { href: string; text: string }[] = [
    {
      href: "/profile",
      text: "Profile",
    },
    {
      href: "/login",
      text: "Login",
    },
    {
      href: "/register",
      text: "Register",
    },
  ];

  return (
    <div className="flex justify-between px-40 py-1.5 bg-slate-200">
      <div className="flex justify-start gap-20">
        {navLinks.map(({ href, text }, key) => {
          return (
            <Link key={key} href={href}>
              {text}
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end gap-20">
        {authLinks.map(({ href, text }, key) => {
          return (
            <Link key={key} href={href}>
              {text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
