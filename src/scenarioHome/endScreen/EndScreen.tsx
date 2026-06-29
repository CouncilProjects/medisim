import { useEffect } from "react"
import { Accordion, Box, Button, Card, Center, Divider, Group, Image, List, Loader, Modal, NumberFormatter, Stack, Text, Timeline, TimelineItem } from "@mantine/core";
import type { Action } from "../../engine/schemas/actionEnum";
import { useLocation, useNavigate } from "react-router";
import engine from "../../engine/engine";
import { OnLineHelp, type PageHelp } from "../../common/onlineHelp";
import { useAppContext } from "../../App";
import { downloadJSON, downloadPDF } from "./downloadFunctions";
import type { Assessment } from "../../engine/types";

export function EndScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { helpNeeded } = useAppContext();

  const scen = location.state?.scenario;

  useEffect(() => {
    if (scen == undefined) {
      navigate("/home", { replace: true });
    }
  }, [scen]);

  const debrif = scen ? engine.getDebrief(scen) : null;

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePop = () => {
      navigate('/home', { replace: true });
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [navigate]);

  useEffect(() => {
    // @ts-ignore
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (debrif == null) {
    return <Loader></Loader>
  }

  const now = new Date();
  const dateTOprint =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + "-" +
    String(now.getMinutes()).padStart(2, "0");

  return (
    <Center w={'100%'} h={'100%'}>
      <Card p={12} m={4}>
        <Group justify="space-between">
          <Text fw={1000}>Αναφορά Αποτελεσμάτων</Text>

          <Group>
            <Button
              leftSection={<Image src={"/download.svg"} w={32} h={32} />}
              onClick={() => { downloadJSON(debrif) }}
            >
              Λήψη .json
            </Button>

            <Button
              leftSection={<Image src={"/download.svg"} w={32} h={32} />}
              onClick={() => { downloadPDF(debrif, dateTOprint) }}
            >
              Λήψη .pdf
            </Button>
          </Group>
        </Group>

        <Stack>
          <Text>Σενάριο: {debrif.scenarioName}</Text>
          <Text>Εκπαιδευόμενος: {debrif.taker}</Text>
          <Text>Τελική Βαθμολογία: {debrif.score}</Text>
          <Text>
            Ποσοστό Επιτυχίας:{" "}
            <NumberFormatter
              value={debrif.goodPercent}
              decimalScale={2}
              suffix="%"
            />
          </Text>
        </Stack>

        <Divider />


        <Divider mt="md" />

        <Text mb={"md"}>Χρονογραμμή</Text>

        <Box mah={"60dvh"} style={{ overflowY: 'auto' }}>
          <Timeline active={debrif.timeline.length}>
            {
              debrif.timeline.map(nodeLine => {
                return (
                  <TimelineItem title={nodeLine.duringNode}>
                    <Text>{nodeLine.nodeText}</Text>

                    <Accordion>
                      <Accordion.Item
                        key={nodeLine.duringNode}
                        value={"Λεπτομέρειες"}
                      >
                        <Accordion.Control>
                          Λεπτομέρειες
                        </Accordion.Control>

                        <Accordion.Panel>
                          <List>
                            {
                              nodeLine.nodeTimeline.map(act => {
                                return (
                                  <List.Item>
                                    <Text>
                                      {act.valid ? '✅' : '❌'} [{act.action}] προκάλεσε μεταβολή της βαθμολογίας κατά {act.scoreDelta}
                                    </Text>
                                  </List.Item>
                                )
                              })
                            }
                          </List>
                        </Accordion.Panel>

                      </Accordion.Item>

                    </Accordion>
                  </TimelineItem>
                )
              })
            }
          </Timeline>

          <Text fw={700} mt="sm">Απαντήσεις φόρμας αξιολόγησης</Text>
          {debrif.assessments.length > 0 ? (
            <Stack gap="sm" mt="sm">
              {debrif.assessments.map((assessment, index) => (
                <Card withBorder key={`${assessment.nodeID}-${index}`} p="sm">
                  <Text fw={600}>Φόρμα: {assessment.formID || "—"}</Text>
                  <Text size="sm">Κόμβος: {assessment.nodeID || "—"}</Text>
                  <Text size="sm">Ευαισθησίες: {assessment.value.sensitivities.join(", ") || "—"}</Text>
                  <Text size="sm">Τελευταία ενέργεια: {assessment.value.last_action || "—"}</Text>
                  <Text size="sm">Αιτιολόγηση: {assessment.value.reason || "—"}</Text>
                  <Text size="sm">Σχόλια: {assessment.value.notes || "—"}</Text>
                </Card>
              ))}
            </Stack>
          ) : (
            <Text c="dimmed" mt="sm">Δεν υποβλήθηκαν απαντήσεις φόρμας.</Text>
          )}

        </Box>
      </Card>

      <Modal
        opened={helpNeeded.value}
        onClose={helpNeeded.toggle}
        title="Ηλεκτρονική Βοήθεια"
      >
        <OnLineHelp pageHelp={onlineHelp} />
      </Modal>
    </Center>
  );
}

export type Debrief = {
  taker: string,
  scenarioName: string,
  score: number,
  goodPercent: number,
  assessments: Assessment[],
  timeline: NodeTimelineSnapshot[]
}

export type NodeTimelineSnapshot = {
  duringNode: string,
  nodeText: string,
  nodeTimeline: ActionSnapshot[]
}

export type ActionSnapshot = {
  action: Action,
  valid: boolean,
  scoreDelta: number
}

const onlineHelp: PageHelp = {
  pageTitle: "Σελίδα Αναφοράς",
  activeSections: [
    {
      title: "Χρονογραμμή",
      steps: [
        {
          stepContent: "Η χρονογραμμή παρουσιάζει τη διαδρομή που ακολουθήθηκε κατά την εκτέλεση του σεναρίου."
        },
        {
          stepContent: "Πατώντας «Λεπτομέρειες» εμφανίζονται οι ενέργειες που πραγματοποιήθηκαν και ο τρόπος με τον οποίο επηρέασαν τη βαθμολογία."
        }
      ]
    },
    {
      title: "Λήψη .json",
      steps: [
        {
          stepContent: "Κατεβάστε την αναφορά σε μορφή JSON."
        }
      ]
    },
    {
      title: "Λήψη .pdf",
      steps: [
        {
          stepContent: "Κατεβάστε την αναφορά σε μορφή PDF."
        }
      ]
    }
  ]
}
