import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {theme} from "../../theme";
import {registerForPushNotificationsAsync} from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
    // const route = useRouter();

    const handleRequestPermission = async () => {
        const result = await registerForPushNotificationsAsync()
        console.log(result);
    }

    return (
        <View style={styles.container}>
            {/*<TouchableOpacity onPress={() => route.navigate("/idea")}>*/}
            {/*    <Text style={{ textAlign:"center", marginBottom:18, fontSize:24 }}>Go to /idea</Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleRequestPermission}>
                <Text style={styles.buttonText}>Request Permission</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Counter</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 24,
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    }
});
