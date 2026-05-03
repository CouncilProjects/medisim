import { Button, Card, Combobox, Fieldset, FileInput, Input, InputBase, Modal, Select, Stack, Switch, Text, TextInput, useCombobox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { preLoadScenarios } from "./preloadedScenarios";

type ScenarioData = {
    scenario: string;
    nodes: number;
    diff: number;
};

export function placeholderValidateScenario(data: any): {
    valid: boolean;
    error?: string;
    value?: ScenarioData;
} {
    // 1. Must be an object
    if (!data || typeof data !== "object") {
        return { valid: false, error: "Data must be an object" };
    }

    // 2. Check required fields exist
    const { scenario, nodes, diff } = data;

    if (typeof scenario !== "string" || scenario.trim().length === 0) {
        return { valid: false, error: "Invalid or missing 'scenario' (string required)" };
    }

    if (typeof nodes !== "number" || !Number.isFinite(nodes) || nodes <= 0) {
        return { valid: false, error: "Invalid 'nodes' (positive number required)" };
    }

    if (typeof diff !== "number" || !Number.isFinite(diff)) {
        return { valid: false, error: "Invalid 'diff' (number required)" };
    }

    // 3. Optional sanity rule (you can remove/adjust later)
    if (nodes > 10000) {
        return { valid: false, error: "'nodes' is unrealistically large" };
    }

    // 4. If everything passes
    return {
        valid: true,
        value: {
            scenario: scenario.trim(),
            nodes,
            diff,
        },
    };
}

export default function LoadScenario({ closeFun}) {
    const [scenarioError,setScenarioError] = useState("");
    const [nameError, setNameError] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(true);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = preLoadScenarios.map((item,index) => (
        {"label":item.scenario,"value":index+1}
    ));


    const handleForm = async (e: React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        
        let data:FormData = new FormData(e.currentTarget);

        console.log(data);

        if (!( (data.get("nameIn") as string).length>=2 )) {
            setNameError("Name should be at-least 2 characters");
            return;
        }

        

        if(checked){
            if (!(data.get('fileIn') instanceof File)) {
                setScenarioError("Not a file");
                return;
            }
            await handleCustom(data.get("fileIn") as File,data.get("nameIn") as string);
        } else {
            const preselected = Number(data.get("preselectIn"));
            console.log("here"+preselected);
            if(!preselected){
                setError("No preselected scenario");
                return;
            }
            if( !(preselected>0&&preselected<=preLoadScenarios.length)){
                setError("Not correct scenario");
                return;
            }
            
            let scenPicked = preLoadScenarios[preselected-1];
            scenPicked.username=data.get("nameIn") as string;
            addScenario(scenPicked);
        }

        
        
        done();
    }

    const done = ()=>{
        closeFun();
    }

    const handleCustom = async (scenario:File,name:string) =>{

        console.log(scenario);

        const text = await scenario.text()

        const js = await JSON.parse(text);

        const validated = placeholderValidateScenario(js);
        if (!validated.valid) {
            notifications.show(
                {
                    title: "Error !",
                    message: "Your JSON scenario is malformed, if you didnt make a mistake contact IT",
                    autoClose: 4000,
                    color: 'red',
                    position: 'top-right'
                }
            )
            setError(validated.error);
            return;
        }

        js.username = name
        addScenario(js);
    }

    const addScenario = (scen:any)=>{
        const items: any[] = JSON.parse(localStorage.getItem('ongoing-scenarios') || '[]');
        items.push(scen);
        localStorage.setItem('ongoing-scenarios', JSON.stringify(items));
    }


    return(
        <Modal closeOnClickOutside={false} opened={true} onClose={closeFun} title={"Load a scenario"}>
            <Card>
                <form onSubmit={handleForm}>
                    <Stack gap="md">

                        <Fieldset>
                            <Stack gap="xl">
                                <Switch
                                    checked={checked}
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                    label={checked?"Load custom scenario":"Chose preselected scenario"}
                                    description="Chose whether you want to upload a custom scenario or use a preloaded one"
                                />


                                {checked?
                                    <FileInput
                                        variant="filled"
                                        size="md"
                                        radius="xl"
                                        label="Scenario"
                                        withAsterisk
                                        description="Load scenario .json"
                                        placeholder="File input"
                                        error={scenarioError}
                                        accept=".json"
                                        clearable
                                        name="fileIn"
                                        required
                                    />
                                    :
                                    <Select
                                        name="preselectIn"
                                        placeholder="Pick scenario"
                                        label="Select a preloaded scenario"
                                        data={options}
                                        withAsterisk
                                        required
                                    >

                                    </Select>
                                }

                                <TextInput
                                    minLength={2}
                                    placeholder="Your name"
                                    name="nameIn"
                                    required
                                    withAsterisk
                                    label={"Registered name"}
                                    error={nameError}
                                />
                            </Stack>
                        </Fieldset>

                        <Button variant="default" type="submit">
                            Load & Start
                        </Button>

                    </Stack>
                </form>
                {error&&<Text c={'red'}>{error}</Text>}
            </Card>
        </Modal>
    )
}