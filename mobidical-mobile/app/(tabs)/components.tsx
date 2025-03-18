import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TextInput } from '@/components/TextInput';
import { Modal } from '@/components/Modal';
import { Image } from '@/components/Image';
import { Icon } from '@/components/Icon';
import { Dropdown } from '@/components/Dropdown';
import { Popover } from '@/components/Popover';
import { Progress } from '@/components/Progress';
import { Text } from '@/components/CustomText';
import { Slider } from '@/components/Slider';
import { Sheet } from '@/components/Sheet';
import { Switch } from '@/components/Switch';
import { RadioButton } from '@/components/RadioButton';
import { Checkbox } from '@/components/Checkbox';
import { Heart } from 'lucide-react-native';

export default function ComponentsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState('Option 1');
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text variant="h1">Components</Text>

      <Card style={styles.section}>
        <Text variant="h2">Buttons</Text>
        <View style={styles.row}>
          <Button title="Primary" onPress={() => {}} />
          <Button title="Secondary" variant="secondary" onPress={() => {}} />
          <Button title="Outline" variant="outline" onPress={() => {}} />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Text Input</Text>
        <TextInput
          label="Example Input"
          placeholder="Type something..."
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Modal</Text>
        <Button
          title="Open Modal"
          onPress={() => setModalVisible(true)}
        />
        <Modal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <Text variant="h2">Modal Content</Text>
          <Text>This is a modal dialog</Text>
        </Modal>
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Image</Text>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba' }}
          rounded
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Icon</Text>
        <Icon icon={Heart} color="#FF3B30" size={32} />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Dropdown</Text>
        <Dropdown
          options={['Option 1', 'Option 2', 'Option 3']}
          value={dropdownValue}
          onChange={setDropdownValue}
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Popover</Text>
        <Popover
          trigger={<Button title="Show Popover" onPress={() => {}} />}
          content={<Text>Popover content</Text>}
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Progress</Text>
        <Progress progress={75} />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Slider</Text>
        <Slider
          value={sliderValue}
          onChange={setSliderValue}
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Switch</Text>
        <Switch
          value={switchValue}
          onValueChange={setSwitchValue}
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Radio Button</Text>
        <RadioButton
          options={['Option 1', 'Option 2', 'Option 3']}
          value={radioValue}
          onChange={setRadioValue}
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Checkbox</Text>
        <Checkbox
          checked={checkboxValue}
          onChange={setCheckboxValue}
          label="Example checkbox"
        />
      </Card>

      <Card style={styles.section}>
        <Text variant="h2">Bottom Sheet</Text>
        <Sheet>
          <Text>Sheet Content</Text>
        </Sheet>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});