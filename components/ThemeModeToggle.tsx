"use client"

import { useTheme } from "next-themes";

import { BiSolidSun } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const ThemeModeToggle = () => {
    const { setTheme } = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <BiSolidSun className="h-[30px] w-[30px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MdDarkMode className="absolute h-[30px] w-[30px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only bg-zinc-800">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-zinc-800 border">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}

export default ThemeModeToggle