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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const SideBar = () => {
  const generalItems = [
    // { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Activities", href: "/activities", icon: Tractor },
  ];
  const itkItems = [
    { label: "ITK Planning", href: "/add-itk", icon: CalendarPlus },
    { label: "Planned ITKs", href: "/itks", icon: Sprout },
  ];
  const ResourcesItems = [
    { label: "Robots", href: "/robots", icon: Tractor },
    { label: "Equipment", href: "/equipments", icon: Drill },
  ];
  const fieldItems = [
    { label: "Plots", href: "/plots", icon: Map },
    { label: "Trajectories", href: "/trajectories", icon: Waypoints },
    { label: "Reference trajectory", href: "/map", icon: Route },
  ];
  const recources = [{ label: "Robot", href: "/robots", icon: Tractor }];
  const pathname = usePathname();

  return (
    <aside className="w-[270px] max-w-xs border-r fixed top-0 left-0 h-screen z-40 hidden md:block">
      <div className="h-full px-3 py-8">
        <h3 className="mx-3 text-3xl font-semibold text-foreground">
          SuperRob
        </h3>

        <div className="mt-5 flex flex-col gap-1 w-full">
          {/* <Collapsible>
            <CollapsibleTrigger className="h-10 px-4 py-2 flex font-medium justify-between w-full hover:bg-secondary/80 rounded-md text-md">
              <div className="flex gap-2 items-center">
                <Tractor size={20} /> Recources
              </div>
              <ChevronDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              {recources.map((item, index) => (
                <Link key={index} href={item.href}>
                  <SidebarButton
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="pl-11"
                  >
                    {item.label}
                  </SidebarButton>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible> */}

          {/* <h3 className="mx-3 font-semibold text-slate-900 my-2">General</h3> */}
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
            Technical itineraries (ITK)
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

          <h3 className="mx-3 font-semibold text-slate-900 my-2">Resources</h3>
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
            Field management
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
