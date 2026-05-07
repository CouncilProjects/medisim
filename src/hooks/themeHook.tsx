import { useMantineColorScheme } from "@mantine/core";


export function useThemeColor(lightColor:string, darkColor:string) {
    const { colorScheme } = useMantineColorScheme();

    return colorScheme === "dark" ? darkColor : lightColor;
}

export function useThemeDepends(lightContent:any, darkContent:any) {
    const { colorScheme } = useMantineColorScheme();

    return colorScheme === "dark" ? darkContent : lightContent;
}