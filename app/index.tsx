import { StyleSheet, TextInput, FlatList, View, Text, LayoutAnimation } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import {useEffect, useState} from "react";
import {getFromStorage, saveToStorage} from "../utils/storage";

const storageKey = "shopping-list";

type ShoppingListItemType = {
    id: string;
    name: string;
    completedAtTimestamp?: number;
    lastUpdatedTimestamp: number;
};

export default function App() {
    const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
    const [value, setValue] = useState<string>();

    useEffect(() => {
        const fetchInitial = async () => {
            const data = await getFromStorage(storageKey);
            if (data) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShoppingList(data);
            }
        };
        fetchInitial();
    }, []);

    const handleSubmit = () => {
        if (value) {
            const newShoppingList = [
                { id: new Date().toISOString(),
                    name: value,
                    lastUpdatedTimestamp: Date.now() },
                ...shoppingList,
            ];
            setShoppingList(newShoppingList);
            saveToStorage(storageKey, newShoppingList);
            setValue(undefined);
        }
    };

    const handelDelete = (id: string) => {
        const newShoppingList = shoppingList.filter((item) => item.id !== id);
        saveToStorage(storageKey, newShoppingList);
        setShoppingList(newShoppingList);
    }

    const handleToggleComplete = (id: string) => {
        const newShoppingList = shoppingList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    lastUpdatedTimestamp: Date.now(),
                    completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(),
                };
            }
            return item;
        });
        setShoppingList(newShoppingList);
        saveToStorage(storageKey, newShoppingList);
    }

    return (
        <FlatList
            data={orderShoppingList(shoppingList)}
            ListHeaderComponent={
                <TextInput
                    value={value}
                    style={styles.textInput}
                    onChangeText={setValue}
                    placeholder="E.g Coffee"
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                />
            }
            ListEmptyComponent={
                <View style={styles.listEmptyContainer}>
                    <Text>Your shopping list is empty</Text>
                </View>
            }
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) =>
                <ShoppingListItem
                    name={item.name}
                    onDelete={() => handelDelete(item.id)}
                    onToggleComplete={() => handleToggleComplete(item.id)}
                    isCompleted={Boolean(item.completedAtTimestamp)}
                />}
        ></FlatList>
    );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
        if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
            return item2.completedAtTimestamp - item1.completedAtTimestamp;
        }

        if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
            return 1;
        }

        if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
            return -1;
        }

        if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
            return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
        }

        return 0;
    });
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colorWhite,
        flex: 1,
        paddingTop: 12,
    },
    contentContainer: {
        paddingBottom: 24,
    },
    textInput: {
        borderColor: theme.colorLightGray,
        borderWidth: 2,
        padding: 12,
        fontSize: 18,
        borderRadius: 50,
        marginHorizontal: 12,
        marginBottom: 12,
        backgroundColor: theme.colorWhite,
    },
    listEmptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 18,
    },
});