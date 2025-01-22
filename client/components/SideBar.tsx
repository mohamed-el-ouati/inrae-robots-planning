"use client";

import React from "react";
import { SidebarButton } from "./SideBarButton";
import Link from "next/link";
import {
  Tractor,
  CalendarPlus,
  Calendar,
  Route,
  Map,
  Sprout,
  Drill,
  Waypoints,
} from "lucide-react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const generalItems = [
    { label: "Calendrier", href: "/", icon: Calendar },
    { label: "Opérations culturales", href: "/activities", icon: Tractor },
  ];
  const itkItems = [
    { label: "Planification d'un ITK", href: "/add-itk", icon: CalendarPlus },
    { label: "ITK planifiés", href: "/itks", icon: Sprout },
  ];
  const ResourcesItems = [
    { label: "Robots", href: "/robots", icon: Tractor },
    { label: "Équipement", href: "/equipments", icon: Drill },
  ];
  const fieldItems = [
    { label: "Parcelles", href: "/plots", icon: Map },
    { label: "Trajectoires", href: "/trajectories", icon: Waypoints },
    {
      label: "Trajectoires de référence",
      href: "/reference-trajectory",
      icon: Route,
    },
  ];
  const pathname = usePathname();

  return (
    <aside className="w-[270px] max-w-xs border-r fixed top-0 left-0 h-screen z-40 hidden md:block">
      <div className="h-full px-3 py-8">
        <h3 className="mx-3 text-3xl font-semibold text-foreground">
          SuperRob
        </h3>

        <div className="mt-5 flex flex-col gap-1 w-full">
          {generalItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <SidebarButton
                variant={pathname === item.href ? "secondary" : "ghost"}
                icon={item.icon}
              >
                {item.label}
              </SidebarButton>
            </Link>
          ))}

          <h3 className="mx-3 font-semibold text-slate-900 my-2">
          Itinéraires techniques (ITK)
          </h3>
          {itkItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <SidebarButton
                variant={pathname === item.href ? "secondary" : "ghost"}
                icon={item.icon}
              >
                {item.label}
              </SidebarButton>
            </Link>
          ))}

          <h3 className="mx-3 font-semibold text-slate-900 my-2">Ressources</h3>
          {ResourcesItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <SidebarButton
                variant={pathname === item.href ? "secondary" : "ghost"}
                icon={item.icon}
              >
                {item.label}
              </SidebarButton>
            </Link>
          ))}

          <h3 className="mx-3 font-semibold text-slate-900 my-2">
          Gestion de terrain
          </h3>
          {fieldItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <SidebarButton
                variant={pathname === item.href ? "secondary" : "ghost"}
                icon={item.icon}
              >
                {item.label}
              </SidebarButton>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
