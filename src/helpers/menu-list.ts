import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Depesas",
          active: pathname.includes("/despesas"),
          icon: SquarePen,
          submenus: [
            {
              href: "/despesas/home",
              label: "Home",
              active: pathname === "/despesas/home"
            },
            {
              href: "/despesas/new",
              label: "Cadastrar",
              active: pathname === "/despesas/new"
            }
          ]
        },
        {
          href: "/asdas",
          label: "Despesas",
          active: pathname.includes("/aswdawsd"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/tags",
          label: "Receitas",
          active: pathname.includes("/receitas"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Despesas",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
