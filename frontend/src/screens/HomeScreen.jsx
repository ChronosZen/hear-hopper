import { StyleSheet, View } from "react-native";
import React from "react";
import TestResult from "../components/TestResult";
import {
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  Image
} from '@gluestack-ui/themed';

const HomeScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Header */}
      <View>
        <HStack>
          <VStack>
            <Heading>Welcome</Heading>
            <Heading> User name</Heading>
          </VStack>
          <Image 
            size="md"
            borderRadius="$none"
            source={{
              uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            }} />
        </HStack>
      </View>

      {/* Hearing result section */}
      <View>
        <VStack>
          <HStack>
            <Heading size={"3xl"}>Hearing Test Result</Heading>
            <Link>View all</Link>
          </HStack>
          <TestResult />
        </VStack>
      </View>

      {/* Hearing test section */}
      <View>
        <HStack>
          <VStack>
            <Heading>Test your child hearing</Heading>
            <Text>Our hearing test is created keeping your child\'s ear sensitivity in mind.</Text>
            <Button>Take the Test</Button>
          </VStack>
          <Image size="md"
            borderRadius="$none"
            source={{
              uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            }} />
        </HStack>
      </View>

      {/* Cards (Ear training & Parental control) section */}
      <View>
          <View>
            <Image></Image>
            <Heading>Child Ear Training</Heading>
            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting.</Text>
          </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});