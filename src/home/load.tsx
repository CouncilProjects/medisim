import { Button, Card, Fieldset, FileInput, Modal, Select, Stack, Switch, Text, TextInput, useCombobox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { preLoadScenarios } from "./preloadedScenarios";
import type { Scenario } from "../engine/types";
import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { validateScenario } from "../engine/validators";

export default function LoadScenario({ closeFun }: { closeFun: () => void }) {
  const [scenarioError, setScenarioError] = useState("");
  const [nameError, setNameError] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const nav = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = preLoadScenarios.map((item, index) => (
    { "label": item.title, "value": index + 1 }
  ));

  const handleForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: FormData = new FormData(e.currentTarget);

    console.log(data);

    if (!((data.get("nameIn") as string).length >= 2)) {
      setNameError("Το όνομα πρέπει να αποτελείται από τουλάχιστον 2 χαρακτήρες");
      return;
    }

    let id;

    if (checked) {
      if (!(data.get('fileIn') instanceof File)) {
        setScenarioError("Δεν επιλέχθηκε έγκυρο αρχείο");
        return;
      }

      id = await handleCustom(data.get("fileIn") as File, data.get("nameIn") as string);

      if (!id) {
        return;
      }
    } else {
      const preselected = Number(data.get("preselectIn"));
      console.log("here" + preselected);

      if (!preselected) {
        setError("Δεν έχει επιλεγεί σενάριο");
        return;
      }

      if (!(preselected > 0 && preselected <= preLoadScenarios.length)) {
        setError("Μη έγκυρο σενάριο");
        return;
      }

      const scenPicked = structuredClone(preLoadScenarios[preselected - 1]);
      scenPicked.username = data.get("nameIn") as string;
      scenPicked.uuid = crypto.randomUUID();
      id = addScenario(scenPicked);
    }

    done();
    nav("/scenario/" + id);
  }

  const done = () => {
    closeFun();
  }

  const handleCustom = async (scenario: File, name: string): Promise<string> => {

    console.log(scenario);

    const text = await scenario.text();

    const js = await JSON.parse(text) as Scenario & { UUID?: string; uuid?: string; username?: string };

    js.uuid = js.uuid || crypto.randomUUID();
    js.UUID = js.UUID || js.uuid;
    js.username = name;

    const validated = validateScenario(js);

    if (!validated.valid) {
      const issueText = (validated.errors ?? [])
        .map((issue) => `${issue.instancePath || "<root>"} ${issue.message ?? "is invalid"}`)
        .join("; ");

      notifications.show({
        title: "Σφάλμα!",
        message: "Το αρχείο JSON του σεναρίου δεν είναι έγκυρο. Αν δεν πρόκειται για δικό σας λάθος, επικοινωνήστε με το τμήμα Πληροφορικής.",
        autoClose: 4000,
        color: 'red',
        position: 'top-right'
      });

      setError(issueText || "Το αρχείο JSON του σεναρίου δεν πέρασε τον έλεγχο εγκυρότητας");
      return "";
    }

    return addScenario(js as Scenario);
  }

  const [, setScenarios] = useLocalStorage<Scenario[]>({
    key: 'medisim-ongoing-scenarios',
    defaultValue: [],
  });

  const addScenario = (scen: Scenario) => {
    const normalizedScenario = {
      ...scen,
      uuid: scen.uuid || crypto.randomUUID(),
      UUID: scen.UUID || scen.uuid || crypto.randomUUID(),
    } as Scenario;

    setScenarios((prev) => [...prev, normalizedScenario]);
    return normalizedScenario.uuid || "bad";
  };

  return (
    <Modal
      closeOnClickOutside={false}
      opened={true}
      onClose={closeFun}
      title={"Φόρτωση Σεναρίου"}
    >
      <Card>
        <form onSubmit={handleForm}>
          <Stack gap="md">

            <Fieldset>
              <Stack gap="xl">
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  label={checked ? "Φόρτωση προσαρμοσμένου σεναρίου" : "Επιλογή προεγκατεστημένου σεναρίου"}
                  description="Επιλέξτε αν θέλετε να φορτώσετε δικό σας σενάριο ή να χρησιμοποιήσετε κάποιο από τα προεγκατεστημένα."
                />

                {checked ?
                  <FileInput
                    variant="filled"
                    size="md"
                    radius="xl"
                    label="Σενάριο"
                    withAsterisk
                    description="Φόρτωση αρχείου σεναρίου (.json)"
                    placeholder="Επιλέξτε αρχείο"
                    error={scenarioError}
                    accept=".json"
                    clearable
                    name="fileIn"
                    required
                  />
                  :
                  <Select
                    name="preselectIn"
                    placeholder="Επιλέξτε σενάριο"
                    label="Επιλογή προεγκατεστημένου σεναρίου"
                    data={options}
                    withAsterisk
                    required
                  />
                }

                <TextInput
                  minLength={2}
                  placeholder="Το όνομά σας"
                  name="nameIn"
                  required
                  withAsterisk
                  label={"Όνομα εκπαιδευόμενου"}
                  error={nameError}
                />
              </Stack>
            </Fieldset>

            <Button variant="default" type="submit">
              Φόρτωση & Έναρξη
            </Button>

          </Stack>
        </form>

        {error && <Text c={'red'}>{error}</Text>}
      </Card>
    </Modal>
  )
}
