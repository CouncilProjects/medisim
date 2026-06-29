import { Box, Button, Card, Center, Modal, Stack, Switch, Text, Title } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { OnLineHelp, type PageHelp } from "../common/onlineHelp";
import LoadScenario from "./load";
import type { Scenario } from "../engine/types";
import { useState } from "react";

export default function Home() {

  //https://mantine.dev/hooks/use-local-storage/

  const [storedScen, setStoredScen] = useLocalStorage<Scenario[]>({
    key: 'medisim-ongoing-scenarios',
    defaultValue: [],
  });

  function deleteScenario(id?: string) {
    if (id == undefined) return;
    setStoredScen((prev) => {
      return prev.filter(val => val.uuid != id)
    })
  }

  const nav = useNavigate();

  const [resumePanel, resumePanelHandlers] = useDisclosure(false);
  const [loadPanel, loadPanelHandlers] = useDisclosure(false);
  const { helpNeeded } = useAppContext();
  console.log(helpNeeded);
  const [checkedDelete, setCheckedDelete] = useState(false);

  return (
    <Center h={'100dvh'}>
      <Card>
        <Title>Αρχική Σελίδα Medisim</Title>
        <Text size="sm">Επιλέξτε μια ενέργεια</Text>
        <Box>
          <Stack>
            <Button onClick={loadPanelHandlers.toggle}>
              <Text>Φόρτωση Σεναρίου</Text>
            </Button>

            <Button disabled={storedScen == null} onClick={() => { resumePanelHandlers.toggle() }}>
              <Text>Συνέχιση Σεναρίου</Text>
            </Button>

            <Button onClick={() => { nav("/test") }}>
              <Text>Προεπισκόπηση Χώρου</Text>
            </Button>

          </Stack>
        </Box>
      </Card>

      <Modal opened={resumePanel} onClose={resumePanelHandlers.close} title="Επιλογή Σεναρίου">
        <Switch
          m={12}
          onChange={(event) => { setCheckedDelete(event.target.checked) }}
          checked={checkedDelete}
          label={"Διαγραφή επιλεγμένου"}
        />
        {storedScen.map((scen) =>
          <ChoiceCard
            scen={scen}
            onClicked={
              checkedDelete
                ? () => { deleteScenario(scen.uuid) }
                : () => {
                  resumePanelHandlers.close();
                  nav(`/scenario/${scen.uuid}`)
                }
            }
          />
        )}
      </Modal>

      {loadPanel &&
        <LoadScenario closeFun={loadPanelHandlers.close} />
      }

      <Modal opened={helpNeeded.value} onClose={helpNeeded.toggle} title="Ηλεκτρονική Βοήθεια">
        <OnLineHelp pageHelp={onlineHelp} />
      </Modal>
    </Center>
  )
}

function ChoiceCard({ scen, onClicked }: { scen: Scenario, onClicked: () => void }) {
  const [hovered, handlers] = useDisclosure(false)

  if (!scen || !scen.title || !scen.username) {
    return null;
  }

  return (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={onClicked}
      mb={hovered ? 10 : 4}
      mt={hovered ? 6 : 0}
      p={4}
      pl={10}
      onPointerEnter={() => { handlers.open() }}
      onPointerLeave={() => { handlers.close() }}
      bd={hovered ? "1px solid orange" : "none"}
    >
      <Stack p={1}>
        <Text m={0}>Σενάριο: {scen.title}</Text>
        <Text m={0}>Εκπαιδευόμενος: {scen.username}</Text>
      </Stack>
    </Card>
  )
}

const onlineHelp: PageHelp = {
  pageTitle: "Αρχική Οθόνη",
  activeSections: [
    {
      title: "Φόρτωση Νέου Σεναρίου",
      steps: [
        {
          stepContent: "Πατήστε το κουμπί «Φόρτωση Σεναρίου»."
        },
        {
          stepContent: "Θα ανοίξει το παράθυρο αναζήτησης αρχείων του υπολογιστή σας. Επιλέξτε το αρχείο μορφής .json που περιέχει τα δεδομένα του σεναρίου."
        },
        {
          stepContent: "Μόλις επιλέξετε το αρχείο, η προσομοίωση του σεναρίου θα ξεκινήσει αυτόματα.",
          important: true
        }
      ]
    },
    {
      title: "Συνέχιση Ημιτελούς Σεναρίου",
      steps: [
        {
          stepContent: "Πατήστε το κουμπί «Συνέχιση Σεναρίου»."
        },
        {
          stepContent: "Θα εμφανιστεί μια λίστα με τα αποθηκευμένα, μη ολοκληρωμένα σενάρια. Επιλέξτε αυτό που επιθυμείτε να συνεχίσετε."
        },
        {
          stepContent: "Μόλις το επιλέξετε, το σενάριο θα φορτώσει και θα συνεχιστεί ακριβώς από το σημείο που το είχατε αφήσει.",
          important: true
        }
      ]
    },
    {
      title: "Προεπισκόπηση Χώρου",
      steps: [
        {
          stepContent: "Πατήστε το κουμπί «Προεπισκόπηση Χώρου»."
        },
        {
          stepContent: "Θα ανοίξει μια οπτική αναπαράσταση του περιβάλλοντος εργασίας σας για να εξοικειωθείτε με τον χώρο."
        },
      ]
    }
  ]
}
