import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable >
        <Text onPress={() => console.log("Pressed")}>Delete</Text>
      </Pressable>
      <View style={styles.itemContainer} >
        <Text style={{
            fontSize: 18,
          fontWeight: "200",
            color: "black",
        }}>Coffee</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e78a',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 16,
  }
});
