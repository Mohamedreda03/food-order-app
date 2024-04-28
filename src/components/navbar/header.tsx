import Link from "next/link";
import NavLinks from "./nav-links";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { auth } from "@/auth";
import AuthProfileButton from "../auth/auth-profile-button";
import CartNav from "./cart-nav";

export default async function Header() {
  const session = await auth();

  return (
    <div className="h-[70px] flex items-center px-5 border-b shadow shadow-gray-100">
      <header className="max-w-screen-xl w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-bold">Cucina</h1>
        </Link>
        <div className="hidden md:block">
          <NavLinks />
        </div>
        <div className="flex items-center gap-5 md:gap-6">
          <Link href="/cart">
            <CartNav />
          </Link>
          {session ? (
            <AuthProfileButton />
          ) : (
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          )}
          <div className="flex md:hidden items-center justify-center">
            <MobileMenu />
          </div>
        </div>
      </header>
    </div>
  );
}
