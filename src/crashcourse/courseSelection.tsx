import { Button, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { NavLink } from "react-router";



export default function Selectcourse(){
    return(
        <Container size={'lg'} p={"lg"}>
            <Flex direction={"column"} align={"center"}>
                <Title>Basics about this</Title>
                <Stack>
                    <NavLink to="layout" end>
                        <Button fullWidth><Text>Layouts</Text></Button>
                    </NavLink>

                    <NavLink to="color" end>
                        <Button fullWidth><Text>Colors</Text></Button>
                    </NavLink>

                    <NavLink to="theme" end>
                        <Button disabled fullWidth><Text>Layouts</Text></Button>
                    </NavLink>
                </Stack>
            </Flex>
        </Container>
    )
}