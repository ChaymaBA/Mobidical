import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, TextStyle, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { useAppTheme } from "@/utils/useAppTheme"
import { $styles } from "../theme"

// Type des presets pour les boutons
type Presets = "default" | "filled" | "reversed"

// Props pour le bouton
export interface ButtonProps extends PressableProps {
    text?: string
    style?: StyleProp<ViewStyle>
    pressedStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    pressedTextStyle?: StyleProp<TextStyle>
    disabledTextStyle?: StyleProp<TextStyle>
    preset?: Presets
    disabled?: boolean
    onPress?: () => void
}

// Button Component
export function Button(props: ButtonProps) {
    const {
        text,
        style: $viewStyleOverride,
        pressedStyle: $pressedViewStyleOverride,
        textStyle: $textStyleOverride,
        pressedTextStyle: $pressedTextStyleOverride,
        disabledTextStyle: $disabledTextStyleOverride,
        disabled,
        ...rest
    } = props

    const { themed } = useAppTheme()

    const preset: Presets = props.preset ?? "default"

    function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
        return [
            themed($viewPresets[preset]),
            $viewStyleOverride,
            !!pressed && themed([$pressedViewPresets[preset], $pressedViewStyleOverride]),
            !!disabled && $disabledViewStyleOverride,
        ]
    }

    function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
        return [
            themed($textPresets[preset]),
            $textStyleOverride,
            !!pressed && themed([$pressedTextPresets[preset], $pressedTextStyleOverride]),
            !!disabled && $disabledTextStyleOverride,
        ]
    }

    return (
        <Pressable style={$viewStyle} accessibilityRole="button" {...rest} disabled={disabled}>
            {(state) => (
                <>
                    <Text style={$textStyle(state)}>{text}</Text>
                </>
            )}
        </Pressable>
    )
}

// Style par défaut pour les vues et les textes du bouton
const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
    default: [
        $styles.row,
        { minHeight: 56, borderRadius: 4, justifyContent: "center", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16 },
        ({ colors }) => ({
            borderWidth: 1,
            borderColor: colors.palette.neutral400,
            backgroundColor: colors.palette.neutral100,
        }),
    ],
    filled: [
        $styles.row,
        { minHeight: 56, borderRadius: 4, justifyContent: "center", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16 },
        ({ colors }) => ({ backgroundColor: colors.palette.neutral300 }),
    ],
    reversed: [
        $styles.row,
        { minHeight: 56, borderRadius: 4, justifyContent: "center", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16 },
        ({ colors }) => ({ backgroundColor: colors.palette.neutral800 }),
    ],
}

const $textPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
    default: [{ fontSize: 16, lineHeight: 20, textAlign: "center" }],
    filled: [{ fontSize: 16, lineHeight: 20, textAlign: "center" }],
    reversed: [{ fontSize: 16, lineHeight: 20, textAlign: "center", color: "#fff" }],
}

const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
    default: ({ colors }) => ({ backgroundColor: colors.palette.neutral200 }),
    filled: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
    reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral700 }),
}

const $pressedTextPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
    default: () => ({ opacity: 0.9 }),
    filled: () => ({ opacity: 0.9 }),
    reversed: () => ({ opacity: 0.9 }),
}

// Tab Bar Component
const Tab = createBottomTabNavigator()

function HomeScreen() {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenText}>Home Screen</Text>
            <Button text="Go to Settings" preset="filled" onPress={() => { }} />
        </View>
    )
}

function SettingsScreen() {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenText}>Settings Screen</Text>
            <Button text="Go to Home" preset="reversed" onPress={() => { }} />
        </View>
    )
}

// Tab Navigation
function TabBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#f8f8f8",
                        borderTopWidth: 1,
                        borderTopColor: "#ddd",
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: "#333",
                    },
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

// App Component
export default function App() {
    return <TabBar />
}

// Styles
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    screenText: {
        fontSize: 20,
        marginBottom: 20,
    },
})
