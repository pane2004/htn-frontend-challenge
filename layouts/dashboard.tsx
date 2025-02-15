import { NavButton } from "@/components/Buttons";
import { H1, H2, H3 } from "@/components/Text";
import { useLogout } from "@/hooks/useLogout";
import { useTranslations } from "next-intl";
import { Sora } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  MdAccountCircle,
  MdClose,
  MdDashboard,
  MdLogout,
  MdMenu,
} from "react-icons/md";

const sora = Sora({ subsets: ["latin"] });

export function DashboardLayout({
  children,
}: React.HTMLAttributes<HTMLBodyElement>) {
  const t = useTranslations('Dashboard');
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const { loading, error, logout } = useLogout();
  const isPublic: boolean = useMemo(() => {
    if (router.asPath) {
      return router.asPath.includes("events-public");
    }
    return false;
  }, [router.asPath]);

  // listen for changes in size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`w-full min-h-screen ${sora.className}`}>
      <button
        aria-controls="sidebar"
        type="button"
        className="fixed p-2 m-8 text-sm text-white sm:hidden bg-gray-800 border-2 border-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-125"
        onClick={() => setMenu(!menu)}
      >
        <span className="sr-only">Open Sidebar Menu</span>
        <MdMenu size={32} />
      </button>
      <div className="grid grid-cols-12 gap-8 min-h-screen">
        <aside
          className={`${menu ? "fixed inset-y-0 left-0 z-40 w-64" : "hidden"
            } sm:relative sm:block sm:col-span-3 overflow-y-auto border-r-2 border-gray-500 transform-none`}
          aria-label="Sidebar"
        >
          <div className="relative h-full flex flex-col bg-gray-900 overflow-y-auto">
            {menu && (
              <button
                aria-controls="sidebar"
                type="button"
                className="absolute z-40 p-1 right-8 top-4 text-white border-2 border-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-125"
                onClick={() => setMenu(!menu)}
              >
                <span className="sr-only">Close Sidebar Menu</span>
                <MdClose size={24} />
              </button>
            )}
            <div className="flex-grow px-3 py-4 space-y-10">
              <div className="p-4">
                <H2 glow>{t("heading")}</H2>
                <H3>Hackathon Global Inc.™</H3>
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <NavButton
                    onClick={() => {
                      router.push(
                        isPublic ? "/events-public" : "/events-private"
                      );
                    }}
                    label={t("menuEvents")}
                    selected={
                      router.asPath === "/events-public" ||
                      router.asPath === "/events-private"
                    }
                  >
                    <MdDashboard size={32} />
                  </NavButton>
                </li>
                <li>
                  <NavButton
                    onClick={() => {
                      router.push(isPublic ? "" : "/events-private/mine");
                    }}
                    label={t("menuMyEvents")}
                    disabled={isPublic}
                    selected={router.asPath === "/events-private/mine"}
                  >
                    <MdAccountCircle size={32} />
                  </NavButton>
                </li>
              </ul>
            </div>
            <div className="w-full p-4 mb-8">
              <NavButton
                onClick={() => {
                  isPublic
                    ? router.push("/")
                    : // technically should catch and deal wih logout error
                    // but for sake of brevity lets skip it
                    logout().then(() => router.push("/"));
                }}
                label={t("logOut")}
              >
                <MdLogout size={32} />
              </NavButton>
            </div>
          </div>
        </aside>
        <div
          className={`${menu ? "col-span-12" : "sm:col-span-9 col-span-12"
            } max-h-screen overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
