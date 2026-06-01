export const Actions = {
    //vitals
    shockLight: "shockLight",
    shock: "shock",


    //ventilator
    oxygenDensityUp: "oxygenDensityUp",
    oxygenDensityDown: "oxygenDensityDown",

    oxyPumpsUp: "oxyPumpsUp",
    oxyPumpsDown: "oxyPumpsDown",

    //medicine cabinet
    painkillers: "painkillers",
    painkillersLight: "painkillersLight",

    bloodPressureUp: "bloodPressureUp",
    bloodPressureDown: "bloodPressureDown",
    bloodPressureUpLight: "bloodPressureUpLight",
    bloodPressureDownLight: "bloodPressureDownLight",

    tempUp: "tempUp",
    tempDown: "tempDown",
    tempUpLight: "tempUpLight",
    tempDownLight: "tempDownLight",

    
    callDoctor:"callDoctor",
    
    doTests:"doTests",
    //patient info
    wait: "wait",
    bloodTest:"bloodTest",
    cholesterolTest:"cholTest",
    pulseOximetry:"spo2Test"

} as const;

export type Action = typeof Actions[keyof typeof Actions];

