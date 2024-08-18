import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [tapCount, setTapCount] = useState<number>(0);
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handlePress = (): void => {
    const newColor = generateRandomColor();
    setBackgroundColor(newColor);
    setTapCount(tapCount + 1);
    setColorHistory([newColor, ...colorHistory]);
  };

  const applyColorFromHistory = (color: string): void => {
    setBackgroundColor(color);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.touchableArea} onPress={handlePress}>
        <View style={styles.content}>
          <Text style={styles.text}>Hello there</Text>
          <Text style={styles.tapCount}>Tap Count: {tapCount}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.historyContainer} horizontal>
        {colorHistory.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.historyItem, { backgroundColor: color }]}
            onPress={() => applyColorFromHistory(color)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tapCount: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  historyContainer: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 10,
  },
  historyItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
