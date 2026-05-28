export const Actions = {
    shockLight: "shockLight",
    shock: "shock",

    painkillers: "painkillers",
    painkillersLight: "painkillersLight",

    oxygenDensityUp: "oxygenDensityUp",
    oxygenDensityDown: "oxygenDensityDown",

    oxyPumpsUp: "oxyPumpsUp",
    oxyPumpsDown: "oxyPumpsDown",

    bloodPressureUp: "bloodPressureUp",
    bloodPressureDown: "bloodPressureDown",
    bloodPressureUpLight: "bloodPressureUpLight",
    bloodPressureDownLight: "bloodPressureDownLight",

    tempUp: "tempUp",
    tempDown: "tempDown",
    tempUpLight: "tempUpLight",
    tempDownLight: "tempDownLight",

    wait:"wait",
    callDoctor:"callDoctor",
    doTests:"doTests",
} as const;

export type Action = typeof Actions[keyof typeof Actions];

