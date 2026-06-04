export const Actions = {
    //timeout
    timeout: "Timeout Triggered",

    // vitals
    shockLight: "Applied light shock",
    shock: "Applied shock",

    // ventilator
    oxygenDensityUp: "Increased oxygen density",
    oxygenDensityDown: "Decreased oxygen density",

    oxyPumpsUp: "Increased oxygen pump rate",
    oxyPumpsDown: "Decreased oxygen pump rate",

    // medicine cabinet
    painkillers: "Administered painkillers",
    painkillersLight: "Administered light painkillers",

    bloodPressureUp: "Increased blood pressure",
    bloodPressureDown: "Decreased blood pressure",
    bloodPressureUpLight: "Slightly increased blood pressure",
    bloodPressureDownLight: "Slightly decreased blood pressure",

    tempUp: "Increased body temperature",
    tempDown: "Decreased body temperature",
    tempUpLight: "Slight increase in body temperature",
    tempDownLight: "Slight decrease in body temperature",

    callDoctor: "Called doctor",

    doTests: "Performed diagnostic tests",

    // patient info
    wait: "Waited / monitored patient",

    bloodTest: "Performed blood test",
    cholesterolTest: "Performed cholesterol test",
    pulseOximetry: "Measured oxygen saturation (SpO2)",
} as const;

export type Action = typeof Actions[keyof typeof Actions];

export type ActionKey = keyof typeof Actions