import React, { useState, useRef, useEffect } from 'react';
import { View, PanResponder, TextInput, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import { ColorPikerstyles } from './stylesS';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/theme/images';
import useTheme from '@/theme/useTheme';
import { Button } from '@/components/Button';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

interface ColorPickerProps {
    initialColor?: string;
    onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    initialColor = '#10868AFF',
    onChange
}) => {
    const { theme } = useTheme();
    const router = useRouter();
    const { t } = useTranslation();
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [lightness, setLightness] = useState(50);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [loading, setLoading] = useState(false);

    const wheelRef = useRef<View>(null);
    const sliderRef = useRef<View>(null);

    // Load saved color if available
    useEffect(() => {
        const loadSavedColor = async () => {
            try {
                const color = await AsyncStorage.getItem('userColor');
                if (color) {
                    setSelectedColor(color);
                    // Also update HSL values
                    const rgb = hexToRgb(color);
                    if (rgb) {
                        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                        setHue(hsl.h);
                        setSaturation(hsl.s);
                        setLightness(hsl.l);
                    }
                }
            } catch (error) {
                console.error('Failed to load color:', error);
            }
        };

        loadSavedColor();
    }, []);

    // Initialize HSL values from the initial color
    useEffect(() => {
        const rgb = hexToRgb(initialColor);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            setHue(hsl.h);
            setSaturation(hsl.s);
            setLightness(hsl.l);
        }
    }, [initialColor]);

    // Update selected color whenever HSL changes
    useEffect(() => {
        const hexColor = hslToHex(hue, saturation, lightness);
        setSelectedColor(hexColor);
    }, [hue, saturation, lightness]);

    const handleWheelMove = (x: number, y: number) => {
        wheelRef.current?.measure((fx, fy, width, height, px, py) => {
            const centerX = width / 2;
            const centerY = height / 2;

            const relativeX = x - px - centerX;
            const relativeY = y - py - centerY;

            // Calculate angle (hue) and distance (saturation)
            let angle = Math.atan2(relativeY, relativeX) * (180 / Math.PI) + 180;
            let distance = Math.min(100, Math.sqrt(relativeX * relativeX + relativeY * relativeY) / (Math.min(centerX, centerY)) * 100);

            setHue(angle);
            setSaturation(distance);
        });
    };

    const handleSliderMove = (x: number) => {
        sliderRef.current?.measure((fx, fy, width, height, px, py) => {
            const percentage = Math.max(0, Math.min(100, ((x - px) / width) * 100));
            setLightness(percentage);
        });
    };

    const wheelPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            handleWheelMove(gestureState.moveX, gestureState.moveY);
        },
        onPanResponderGrant: (_, gestureState) => {
            handleWheelMove(gestureState.x0, gestureState.y0);
        }
    });

    const sliderPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            handleSliderMove(gestureState.moveX);
        },
        onPanResponderGrant: (_, gestureState) => {
            handleSliderMove(gestureState.x0);
        }
    });

    const hexToRgb = (hex: string): RGB | null => {
        // Support #rgb and #rrggbb formats
        const formatted = hex.replace(/^#/, '');
        if (formatted.length === 3) {
            return {
                r: parseInt(formatted[0] + formatted[0], 16),
                g: parseInt(formatted[1] + formatted[1], 16),
                b: parseInt(formatted[2] + formatted[2], 16)
            };
        }

        const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formatted);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHsl = (r: number, g: number, b: number): HSL => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hslToHex = (h: number, s: number, l: number): string => {
        h = h % 360;
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else if (h >= 300 && h < 360) {
            r = c; g = 0; b = x;
        }

        const toHex = (n: number): string => {
            const hex = Math.round((n + m) * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const handleHexInputChange = (text: string) => {
        // Validate and format hex input
        let formattedHex = text;
        if (!formattedHex.startsWith('#')) {
            formattedHex = '#' + formattedHex;
        }

        setSelectedColor(formattedHex);

        // Update HSL only if hex format is valid
        const rgb = hexToRgb(formattedHex);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            setHue(hsl.h);
            setSaturation(hsl.s);
            setLightness(hsl.l);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await AsyncStorage.setItem('userColor', selectedColor);
            if (onChange) {
                onChange(selectedColor);
            }
            setTimeout(() => {
                setLoading(false);
                router.back();
            }, 500);
        } catch (error) {
            console.error('Failed to save color:', error);
            setLoading(false);
        }
    };

    // Generate a circular gradient for the color wheel
    const generateColorWheel = () => {
        return {
            width: 256,
            height: 256,
            borderRadius: 128,
            // Use a white background with a circular overlay to simulate the wheel
            backgroundColor: 'white',
            position: 'relative' as const
        };
    };

    return (
        <SafeAreaView style={ColorPikerstyles.safeArea}>
            <View style={ColorPikerstyles.container}>
                {/* Header */}
                <View style={ColorPikerstyles.headerContainer}>
                    <TouchableOpacity
                        style={ColorPikerstyles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.primary} />
                    </TouchableOpacity>
                    <Text style={ColorPikerstyles.appName}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={ColorPikerstyles.logo} />
                </View>

                {/* Color Picker Content */}
                <View style={ColorPikerstyles.content}>
                    <View
                        ref={wheelRef}
                        style={[generateColorWheel()]}
                        {...wheelPanResponder.panHandlers}
                    >
                        {/* Overlay with radial gradient to create the color wheel */}
                        <View style={[ColorPikerstyles.wheelOverlay, {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: 128
                        }]} />
                        <View
                            style={[ColorPikerstyles.marker, {
                                position: 'absolute',
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                borderWidth: 2,
                                borderColor: 'white',
                                backgroundColor: selectedColor,
                                left: Math.cos((hue - 180) * Math.PI / 180) * (saturation / 100 * 128) + 128 - 8,
                                top: Math.sin((hue - 180) * Math.PI / 180) * (saturation / 100 * 128) + 128 - 8
                            }]}
                        />
                    </View>

                    <View
                        ref={sliderRef}
                        style={[ColorPikerstyles.slider, {
                            backgroundColor: `hsl(${hue}, ${saturation}%, 50%)`,
                            height: 32,
                            marginVertical: 20,
                            borderRadius: 16,
                            position: 'relative'
                        }]}
                        {...sliderPanResponder.panHandlers}
                    >
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: 16,
                            backgroundImage: 'linear-gradient(to right, #000000, transparent, #ffffff)'
                        }} />
                        <View
                            style={[ColorPikerstyles.sliderThumb, {
                                position: 'absolute',
                                width: 16,
                                height: 32,
                                borderRadius: 8,
                                borderWidth: 2,
                                borderColor: 'white',
                                backgroundColor: selectedColor,
                                left: `${lightness}%`,
                                transform: [{ translateX: -8 }]
                            }]}
                        />
                    </View>

                    <View style={[ColorPikerstyles.colorPreviewContainer, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20
                    }]}>
                        <View style={[ColorPikerstyles.colorPreview, {
                            backgroundColor: selectedColor,
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            marginRight: 16,
                            borderWidth: 1,
                            borderColor: '#DDDDDD'
                        }]} />
                        <TextInput
                            value={selectedColor}
                            onChangeText={handleHexInputChange}
                            style={[ColorPikerstyles.hexInput, {
                                flex: 1,
                                height: 48,
                                borderWidth: 1,
                                borderColor: '#DDDDDD',
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                fontSize: 16
                            }]}
                            placeholder="#RRGGBB"
                        />
                    </View>

                    {/* Save Button */}
                    <Button
                        title={loading ? t('saving') : t('save')}
                        onPress={handleSave}
                        style={{
                            ...ColorPikerstyles.button,
                            backgroundColor: theme.primary,
                            height: 48,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        disabled={loading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ColorPicker;