import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useReducer, useEffect } from "react";
import { Text, View } from "react-native";

const UserContext = createContext();
const initialState = {
  firstName: "",
  kids: [],
  quizScore: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        ...action.payload,
      };
  }
}
const UserProvider = ({ children }) => {
  const [{ id, firstName, kids }, dispatch] = useReducer(reducer, initialState);

  const { isPending, error, data } = useQuery({
    queryKey: ["myData"],
    queryFn: () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOCK_JWT}`,
        },
      })
        .then((res) => res.json())
        .then((json) => json.data),
  });
  useEffect(() => {
    if (data) {
      dispatch({ type: "dataReceived", payload: data });
    }
  }, [data]);
  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred: ${error.message}</Text>;

  return (
    <UserContext.Provider
      value={{
        id,
        firstName,
        kids,
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
