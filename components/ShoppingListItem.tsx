import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../theme";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    // ? use this to make the prop optional
    name: string;
    isCompleted?: boolean;
};

export function ShoppingListItem({name, isCompleted}: Props) {
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

    return <View style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]} >
        <Text style={[styles.text, isCompleted ? styles.completedText : undefined]}>{name}</Text>
        <TouchableOpacity
            onPress={!isCompleted ? () => handleDelete(): undefined}
            activeOpacity={0.8} >
            <AntDesign name="closecircle" size={24} color={isCompleted ? theme.colorGray : theme.colorRed} />
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colorCerulean,
        paddingHorizontal: 8,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 18,
        fontWeight: "200",
        color: "black",
    },
    completedContainer: {
        backgroundColor: theme.colorLightGray,
        borderBottomWidth: 1,
        borderBottomColor: theme.colorLightGray,
    },
    completedText: {
        textDecorationLine: "line-through",
        textDecorationColor: theme.colorGray,
        color: theme.colorGray,
    }

});