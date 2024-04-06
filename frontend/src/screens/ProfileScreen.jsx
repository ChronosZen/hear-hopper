import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {useState, useEffect} from "react";
import HeaderText from "../components/reusable/HeaderText";
import ButtonFunc from "../components/reusable/ButtonFunc";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, VStack, HStack, ScrollView } from "@gluestack-ui/themed";
import Dad from "../../assets/dad.jpg";
import KidDisplay from "../components/user/KidDisplay";
import { useQuery } from "@tanstack/react-query";
import * as secureStorage from 'expo-secure-store';
import SVG from "../components/svg/SVG";
import { closeIcon, accountIcon, lockColorIcon, keyIcon, termsIcon, helpIcon, logoutIcon, nextIcon } from "../components/svg/svgs";
import { Typography, Colors } from "../styles/index";
import moment from "moment";

ProfileScreen = ({ navigation, route }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: async () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${await secureStorage.getItemAsync(
            "JwtToken"
          )}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json.data),
  });

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  const userData = data;

  const kidArr = [...userData.kids].sort(
    (kid1, kid2) => new Date(kid2.createdAt) - new Date(kid1.createdAt)
  );

  const [yearRange, setYearRange] = useState([])
  const currentYear = moment().year();

  const getYearRange = () => {
    setYearRange([])
    for(let i=currentYear-18; i<currentYear-5; i++){
        setYearRange(years => [...years, i])
    }
  }

  useEffect(() => {
      getYearRange()

  }, [])
  
  function navigateAddProfile() {
    navigation.navigate("AddProfile", { name: "Jane", yearRange: yearRange });
  }
  function navigateSample() {
    navigation.navigate("Example");
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView flex={1}>
        <VStack flex={1} mx={24}>
          <HStack>
            <HeaderText text="Settings" underlineColor={Colors.primary.p5} textAlign="left" />
          </HStack>

          <HStack alignItems="center" space="xl" mb={28}>
            <Image size="lg" borderRadius="$full" alt="test" source={Dad} />
            <Text style={{...Typography.heading.h5}}>{userData.firstName}</Text>
          </HStack>

          <VStack justifyContent="center" alignItems="start" space="xl" borderTopWidth={2} borderTopColor={Colors.gs.gs6}>
            <Text style={{...Typography.heading.h6, paddingTop:12}}>Children’s Account</Text>
            {kidArr.map((kid) => (
              <KidDisplay
                image={kid.image}
                childName={kid.firstName}
                key={kid.id}
              />
            ))}
          </VStack>

          <VStack alignItems="center" marginBottom={12}>
            <ButtonFunc
              text="Add +"
              handleOnPress={() => {
                navigateAddProfile();
              }}
              color={Colors.gs.white}
              textColor={Colors.gs.black}
            />
          </VStack>

          <VStack>
              <HStack style={styles.outerContainer}>
                <HStack style={styles.innerContainer}>
                  <SVG xml={accountIcon} width="40" height="40" />
                  <Text style={Typography.heading.h6}>Account Info</Text>
                </HStack>
                  <SVG xml={nextIcon} width="40" height="40" />
              </HStack>
              <HStack style={styles.outerContainer}>
                <HStack style={styles.innerContainer}>
                  <SVG xml={lockColorIcon} width="40" height="40" />
                  <Text style={Typography.heading.h6}>Change Password</Text>
                </HStack>
                  <SVG xml={nextIcon} width="40" height="40" />
              </HStack>
              <HStack style={styles.outerContainer}>
                <HStack style={styles.innerContainer}>
                  <SVG xml={keyIcon} width="40" height="40" />
                  <Text style={Typography.heading.h6}>Privacy Policy</Text>
                </HStack>
                  <SVG xml={nextIcon} width="40" height="40" />
              </HStack>
              <HStack style={styles.outerContainer}>
                <HStack style={styles.innerContainer}>
                  <SVG xml={termsIcon} width="40" height="40" />
                  <Text style={Typography.heading.h6}>Terms and Conditions</Text>
                </HStack>
                  <SVG xml={nextIcon} width="40" height="40" />
              </HStack>
              <HStack style={styles.outerContainer}>
                <HStack style={styles.innerContainer}>
                  <SVG xml={helpIcon} width="40" height="40" />
                  <Text style={Typography.heading.h6}>Help</Text>
                </HStack>
                  <SVG xml={nextIcon} width="40" height="40" />
              </HStack>
              <HStack style={styles.logoutContainer}>
                <SVG xml={logoutIcon} width="40" height="40" />
                <Text style={Typography.heading.h6}>Logout</Text>
              </HStack>
            </VStack>
          </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  outerContainer: {
    alignItems:"center",
    justifyContent: "space-between", 
    borderTopColor:Colors.gs.gs6, 
    borderTopWidth:2, 
    paddingVertical:24
  },
  logoutContainer: {
    alignItems:"center",
    borderTopColor:Colors.gs.gs6, 
    borderTopWidth:2, 
    paddingVertical:24,
    gap: 18
  },
  innerContainer: {
    alignItems:"center",
    gap: 18
  }
});
