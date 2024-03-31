import HeaderText from "../components/reusable/HeaderText"
import {
    HStack,
    VStack,
    Heading,
    Text,
    Link,
    Image,
    Box,
    Divider,
    Card,
    Pressable,
    Icon,
    ChevronRightIcon,
    LinkText,
    SafeAreaView
} from '@gluestack-ui/themed';

const ParentalControlScreen = ( { navigation }) => {

    return (
        <>
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
        </>

    )



}

export default ParentalControlScreen