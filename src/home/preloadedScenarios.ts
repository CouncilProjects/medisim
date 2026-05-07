
type testScen = {
    scenario: string;
    nodes: number;
    diff: number;
    username?:string
}

export const preLoadScenarios:testScen[] = [
    {
        "scenario": "Epileptic attack",
        "nodes": 10,
        "diff": 5
    },
    {
        "scenario": "Heart attack",
        "nodes": 13,
        "diff": 2
    },
    {
        "scenario": "Common cold",
        "nodes": 8,
        "diff": 1
    }
]