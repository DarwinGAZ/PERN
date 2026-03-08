"use client";

import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../ChangeTheme";
import { Container } from "../layouts/Container";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    className?: string;
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
        className?: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        register: {
            title: string;
            url: string;
        };
    };
}

const Header = ({
    logo = {
        url: "/",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "ConectaPro",
    },
    menu = [
        { title: "Home", url: "/" },
        { title: "Serviços", url: "/services" },
        { title: "Sobre", url: "/about" },
        { title: "Contato", url: "/contact" },
    ],
    auth = {
        login: { title: "Entrar", url: "/login" },
        register: { title: "Cadastrar", url: "/register" },
    },
    className,
}: Navbar1Props) => {
    const authCtx = useContext(AuthContext);

    return (
        <section className={cn("py-4", className)}>
            {/* Desktop Menu */}
            <Container className="hidden items-center justify-between lg:flex">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link
                        to={logo.url}
                        className="flex items-center ml-10 gap-2"
                    >
                        <img
                            src={logo.src}
                            className="max-h-8 dark:invert"
                            alt={logo.alt}
                        />
                        <span className="text-lg font-semibold tracking-tighter">
                            {logo.title}
                        </span>
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {menu.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                <div className="flex gap-2 items-center mr-5">
                    <ThemeToggle />
                    {!authCtx?.isAuthenticated && (
                        <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                                <Link to={auth.login.url}>
                                    {auth.login.title}
                                </Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link to={auth.register.url}>
                                    {auth.register.title}
                                </Link>
                            </Button>
                        </div>
                    )}
                    {authCtx?.isAuthenticated && (
                        <div>
                            <Button
                                asChild
                                variant="outline"
                                className="w-9 h-9"
                                size="sm"
                            >
                                <Link to="/me">
                                    <User className="size-5" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </Container>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to={logo.url} className="flex items-center gap-2">
                        <img
                            src={logo.src}
                            className="max-h-8 dark:invert"
                            alt={logo.alt}
                        />
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        to={logo.url}
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={logo.src}
                                            className="max-h-8 dark:invert"
                                            alt={logo.alt}
                                        />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 p-4">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="flex w-full flex-col gap-4"
                                >
                                    {menu.map((item) =>
                                        renderMobileMenuItem(item),
                                    )}
                                </Accordion>

                                <div className="flex flex-col gap-3">
                                    <Button asChild variant="outline">
                                        <Link to={auth.login.url}>
                                            {auth.login.title}
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link to={auth.register.url}>
                                            {auth.register.title}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink
                            asChild
                            key={subItem.title}
                            className="w-80"
                        >
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink asChild>
                <Link
                    to={item.url}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                >
                    {item.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem
                key={item.title}
                value={item.title}
                className="border-b-0"
            >
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} to={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            to={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

export { Header };
