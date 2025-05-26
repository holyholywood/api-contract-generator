import Head from "next/head";
import { ReactNode } from "react";
import ThemeSwitcher from "../molecules/ThemeSwitcher";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`${title ?? "API Contract Generator"}`}</title>
      </Head>
      <header className="sticky inset-x-0 top-0 bg-background z-50">
        <div className="py-8 flex max-w-5xl mx-auto items-center justify-between gap-8">
          <h1 className="font-medium text-xl">API Contract Generators</h1>
          <ul className="flex items-center gap-4">
            {router.pathname !== "/" && (
              <li>
                <Link href={"/"} className="text-default-500 hover:text-foreground duration-200 text-sm">
                  Create
                </Link>
              </li>
            )}
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
