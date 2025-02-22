import {Alert, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type Props = {
    // ? use this to make the prop optional
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleComplete: () => void;
};

export function ShoppingListItem({name, isCompleted, onDelete, onToggleComplete}: Props) {
    const handleDelete = () => {
        Alert.alert("Delete", `Are you sure you want to delete ${name} item?`, [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel"),
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => onDelete(),
                style: "destructive",
            },
        ]);
    };

    return <Pressable
        style={[
            styles.itemContainer,
            isCompleted ? styles.completedContainer : undefined
        ]}
        onPress={onToggleComplete}
    >
        <View style={styles.row}>
            <Feather name={isCompleted? "check" : "circle"} size={24} color={isCompleted? theme.colorGray : theme.colorCerulean} />
            <Text style={[styles.text, isCompleted ? styles.completedText : undefined]}>{name}</Text>
        </View>
        <TouchableOpacity
            onPress={!isCompleted ? () => handleDelete(): undefined}
            activeOpacity={0.8} >
            <AntDesign name="closecircle" size={24} color={isCompleted ? theme.colorGray : theme.colorRed} />
        </TouchableOpacity>
    </Pressable>;
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
        flex: 1,
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
    },
    row: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        flex: 1,
    }

});