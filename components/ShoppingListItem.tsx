import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../theme";

type Props = {
    // ? use this to make the prop optional
    name: string;
};

export function ShoppingListItem({name}: Props) {
    const handleDelete = () => {
        Alert.alert("Delete", `Are you sure you want to delete ${name} item?`, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => console.log("Yes"),
                style: "destructive",
            },
        ]);
    };

    return <View style={styles.itemContainer} >
        <Text style={{
            fontSize: 18,
            fontWeight: "200",
            color: "black",
        }}>{name}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => handleDelete()}
            activeOpacity={0.8} >
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorWhite,
        justifyContent: 'center',
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colorCerulean,
        paddingHorizontal: 8,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 8,
        borderRadius: 6,
    },
    buttonText: {
        color: theme.colorWhite,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    }

});