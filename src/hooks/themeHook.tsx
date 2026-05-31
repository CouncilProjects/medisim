import { useMantineColorScheme } from "@mantine/core";


export function useThemeColor(lightColor:string, darkColor:string) {
    const { colorScheme } = useMantineColorScheme();

    return colorScheme === "dark" ? darkColor : lightColor;
}

export function useThemeDepends<T>(lightContent:T, darkContent:T) {
    const { colorScheme } = useMantineColorScheme();

    return colorScheme === "dark" ? darkContent : lightContent;
}