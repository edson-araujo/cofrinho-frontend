import {
  Tag,
  Users,
  Settings,
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Receipt
} from "lucide-react";
import { BiTransfer } from "react-icons/bi";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
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
          label: "Transações",
          active: pathname.includes("/despesas"),
          icon: BiTransfer,
          submenus: [
            {
              href: "/transacao",
              label: "Home",
              active: pathname === "/transacao"
            },
            {
              href: "/transacao/cadastrar",
              label: "Cadastrar",
              active: pathname === "/transacao/cadastrar"
            },
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
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/teste",
          label: "Despesas",
          active: pathname.includes("/teste"),
          icon: Receipt,
          submenus: []
        }
      ]
    },
  ];
}
