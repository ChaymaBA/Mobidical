import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DatePicker } from '@/components/PikeDate';
import { TextInput } from '@/components/TextInput';
import { useTranslation } from 'react-i18next';
import useTheme from '@/theme/useTheme';
import { images } from '@/theme/images';
import { makeStyles } from './stylesS';
import { colors } from '@/theme/colors';
import { CustomDropDown } from '@/components/Dropdown';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FormData = {
  report_period_start: Date;
  report_period_end: Date;
  cognitive_metrics: { progression: string };
  social_metrics: { progression: string };
  motor_metrics: { progression: string };
  communication_metrics: { progression: string };
  observations: string;
};

const progressOptions = [
  { label: 'Bonne progression générale', value: 'bonne' },
  { label: 'Moyenne progression générale', value: 'moyenne' },
  { label: 'Faible progression générale', value: 'faible' },
];

export default function ProgressionChildScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('@child_progress');
        if (storedData) {
          const parsedData: FormData = JSON.parse(storedData);
          // Remplir le formulaire avec les données stockées
          setValue('report_period_start', parsedData.report_period_start);
          setValue('report_period_end', parsedData.report_period_end);
          setValue('cognitive_metrics.progression', parsedData.cognitive_metrics.progression);
          setValue('social_metrics.progression', parsedData.social_metrics.progression);
          setValue('motor_metrics.progression', parsedData.motor_metrics.progression);
          setValue('communication_metrics.progression', parsedData.communication_metrics.progression);
          setValue('observations', parsedData.observations);
        }
      } catch (error) {
        console.error('Failed to load progress data:', error);
      }
    };

    loadProgressData();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await AsyncStorage.setItem('@child_progress', JSON.stringify(data));
      navigation.navigate('settings' as never);
    } catch (error) {
      console.error('Failed to save progress data:', error);
    }
  };

  const validateStartDate = (date: Date | undefined) => {
    const minDate = new Date(2025, 3, 20); // 20 avril 2025
    if (date && date < minDate) {
      return t('errors.startDateInvalid');
    }
    return true;
  };

  const validateEndDate = (date: Date | undefined) => {
    if (date && date > new Date()) {
      return t('errors.endDateInvalid');
    }
    return true;
  };

  type MetricKeys = keyof Pick<
    FormData,
    'cognitive_metrics' | 'social_metrics' | 'motor_metrics' | 'communication_metrics'
  >;

  const [openCognitive, setOpenCognitive] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const [openMotor, setOpenMotor] = useState(false);
  const [openCommunication, setOpenCommunication] = useState(false);

  const DROPDOWN_HEIGHT = 150;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [
    openCognitive,
    openSocial,
    openMotor,
    openCommunication,
  ]);

  const metricOrder: MetricKeys[] = [
    'cognitive_metrics',
    'social_metrics',
    'motor_metrics',
    'communication_metrics',
  ];

  const renderMetricSection = (
    name: MetricKeys,
    label: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>{label}</Text>

        <Controller
          control={control}
          name={`${name}.progression`}
          rules={{ required: t('errors.required') }}
          render={({ field: { onChange, value } }) => (

            <CustomDropDown
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={onChange}
              items={progressOptions}
              placeholderKey="select Progression"

            />

          )}
        />
        {errors[name]?.progression && (
          <Text style={[styles.errorText, { color: theme.error }]}>{errors[name]?.progression?.message}</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, { paddingHorizontal: 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.iconColor} />
          </TouchableOpacity>
          <Text style={[styles.appNameStyle, { color: theme.textPrimary }]}>MOBIDICAL</Text>
          <Image source={images.app_logo} style={styles.logo} />
        </View>

        <Text style={[styles.title, { color: theme.textPrimary, marginBottom: 20 }]}>
          {t('child Progress Report')}
        </Text>

        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 10 }]}>
            {t('Report Period')}
          </Text>

          <Controller
            control={control}
            name="report_period_start"
            rules={{ required: t('errors.required'), validate: validateStartDate }}
            render={() => (
              <DatePicker
                name="report_period_start"
                control={control}
                placeholder={t('start Date')}
                leftIcon="calendar"
                style={styles.datePicker}
              />
            )}
          />
          {errors.report_period_start && (
            <Text style={[styles.errorText, { color: theme.error }]}>{errors.report_period_start.message}</Text>
          )}

          <Controller
            control={control}
            name="report_period_end"
            rules={{ required: t('errors.required'), validate: validateEndDate }}
            render={() => (
              <DatePicker
                name="report_period_end"
                control={control}
                placeholder={t('End Date')}
                leftIcon="calendar"
                style={styles.datePicker}
              />
            )}
          />
          {errors.report_period_end && (
            <Text style={[styles.errorText, { color: theme.error }]}>{errors.report_period_end.message}</Text>
          )}
        </View>

        {metricOrder.map((metricKey) => {
          const labels = {
            cognitive_metrics: t('Cognitive Metrics'),
            social_metrics: t('Social Metrics'),
            motor_metrics: t('Motor Metrics'),
            communication_metrics: t('Communication Metrics'),
          };
          return renderMetricSection(
            metricKey,
            labels[metricKey],
            metricKey === 'cognitive_metrics' ? openCognitive :
              metricKey === 'social_metrics' ? openSocial :
                metricKey === 'motor_metrics' ? openMotor : openCommunication,
            metricKey === 'cognitive_metrics' ? setOpenCognitive :
              metricKey === 'social_metrics' ? setOpenSocial :
                metricKey === 'motor_metrics' ? setOpenMotor : setOpenCommunication
          );
        })}

        <View style={[styles.section, { marginBottom: 30 }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 10 }]}>
            {t('observations')}
          </Text>
          <Controller
            control={control}
            name="observations"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={t('Observations')}
                style={[styles.textInput, { backgroundColor: theme.background, color: theme.textPrimary }]}
                multiline
              />
            )}
          />
          {errors.observations && (
            <Text style={[styles.errorText, { color: theme.error }]}>{errors.observations.message}</Text>
          )}
        </View>

        <Pressable
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={[styles.buttonText, { color: colors.palette.black }]}>
            {isSubmitting ? t('Submitting') : t('Submit')}
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
