import { useMantineColorScheme } from "@mantine/core";

export function useThemeColor(lightColor, darkColor) {
    const { colorScheme } = useMantineColorScheme();

    return colorScheme === "dark" ? darkColor : lightColor;
}