import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useReducer, useEffect } from "react";
import { Text, View } from "react-native";
import * as secureStorage from "expo-secure-store";

const UserContext = createContext();
const initialState = {
  firstName: "",
  kids: [],
  selectedKidId: "",
  selectedKidImage: "",
  selectedKidQuizScore: 0,
  selectedKidAudiograms: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        ...action.payload,
      };
    case "initialChild":
      return {
        ...state,
        selectedKidId: action.payload.selectedKidId,
        selectedKidImage: action.payload.selectedKidImage,
        selectedKidQuizScore: action.payload.selectedKidQuizScore,
        selectedKidAudiograms: action.payload.selectedKidAudiograms,
      };
    case "changeChild":
      return {
        ...state,
        selectedKidId: action.payload.selectedKidId,
        selectedKidImage: action.payload.selectedKidImage,
        selectedKidQuizScore: action.payload.selectedKidQuizScore,
        selectedKidAudiograms: action.payload.selectedKidAudiograms,
      };
    case "submitQuiz":
      return {
        ...state,
        selectedKidQuizScore: action.payload.selectedKidQuizScore,
      };
  }
}
const UserProvider = ({ children }) => {
  const [
    {
      id,
      firstName,
      kids,
      selectedKidId,
      selectedKidImage,
      selectedKidQuizScore,
      selectedKidAudiograms,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

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
  useEffect(() => {
    if (data) dispatch({ type: "dataReceived", payload: data });
    if (data?.kids.length > 0)
      dispatch({
        type: "initialChild",
        payload: {
          selectedKidId: data.kids[0]._id,
          selectedKidImage: data.kids[0].image,
          selectedKidQuizScore: data.kids[0].quizScore,
          selectedKidAudiograms: data.kids[0].audiograms,
        },
      });
  }, [data]);
  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  return (
    <UserContext.Provider
      value={{
        id,
        firstName,
        kids,
        selectedKidId,
        selectedKidImage,
        selectedKidQuizScore,
        selectedKidAudiograms,
        dispatch,
      }}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("UserContext was used outside of the UserProvider");
  return context;
}
export { UserProvider, useUser };
