import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SpectrumIcon } from './src/components/atoms/icons/SpectrumIcon';

export default function App() {
  return (
    <View style={styles.container}>
      <SpectrumIcon size={120} animated={true} />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
