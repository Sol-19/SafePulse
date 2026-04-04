import { View, Text } from "react-native";

export default function NoInternet() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">
        No Internet Connection
      </Text>
    </View>
  );
}