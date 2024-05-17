"use client";

import React from "react";
import { SidebarButton } from "./SideBarButton";
import Link from "next/link";
import {
  Tractor,
  CirclePlus,
  CalendarPlus,
  Calendar,
  ChevronDown,
  ChevronDownCircle,
  Map,
  Sprout,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const SideBar = () => {
  const sidebarItems = [
    { label: "Robot Management", href: "/robots", icon: Tractor },
    { label: "ITK Planning", href: "/add-itk", icon: CalendarPlus },
    { label: "ITKs", href: "/itks", icon: Sprout },
    { label: "Calendar", href: "/calendar", icon: Calendar },

    { label: "Map", href: "/map", icon: Map },
  ];
  const recources = [{ label: "Robot", href: "/robots", icon: Tractor }];
  const pathname = usePathname();

  return (
    <aside className="w-[270px] max-w-xs border-r fixed top-0 left-0 h-screen z-40 hidden md:block">
      <div className="h-full px-3 py-8">
        <h3 className="mx-3 text-2xl font-semibold text-foreground">
          LambdAgrIoT
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
          {sidebarItems.map((item, index) => (
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
