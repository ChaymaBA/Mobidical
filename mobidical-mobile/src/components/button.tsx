import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const App = () => {
    return (
        <View style={styles.container}>
            {/* Boutons Login & Signup */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: "blue" }]}>
                    <Text style={styles.actionButtonText}>LogIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, { backgroundColor: "green" }]}>
                    <Text style={styles.actionButtonText}>SignUP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    bottomButtons: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 40,
    },
    actionButton: {
        paddingVertical: 15,
        borderRadius: 8,
        width: 120,
        alignItems: "center",
    },
    actionButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default App;
