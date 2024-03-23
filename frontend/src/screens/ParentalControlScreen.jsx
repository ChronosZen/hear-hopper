import HeaderText from "../components/reusable/HeaderText"
import {
    VStack,
    Heading,
    Text,
    Box,
    Divider,
    Pressable,
} from '@gluestack-ui/themed';
import SVG from "../components/svg/SVG";

const ParentalControlScreen = ( { navigation }) => {

    return (
        <VStack flex={1} justifyContent="start" m={16}>
            <HeaderText text="Parental Control" />
            <VStack
                space="lg"
                p="$12"
                $dark-borderColor="$backgroundDark700"
            >
                <Box>
                    <Pressable onPress={() => {
                        navigation.navigate("Parental Control Noise Check")
                    } }>

                        <Heading>Noise Check</Heading>
                        <Text size="sm" mt="$1.5">
                            Run an Environmental Noise Check.
                        </Text>
                    </Pressable>
                </Box>
                <Divider bg="$trueGray300" $dark-bg="$backgroundDark700" />
                <Box>
                    <Heading>Max Value</Heading>
                    <Text size="sm" mt="$1.5">
                        Set the maximum volume of this device.
                    </Text>
                </Box>
            </VStack>
        </VStack>

    )
}

export default ParentalControlScreen