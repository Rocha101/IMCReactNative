import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import LinhaTabela from './components/LinhaTabela';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarUsuario = async usuarioData => {
  try {
    const jsonValue = JSON.stringify(usuarioData);
    await AsyncStorage.setItem("@usuario", jsonValue);
    return true;
  } catch (err) {
    //
  }

  return false;
};

const getUsuario = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@usuario");
    if (jsonValue !== null) {
      const usuarioRecuperado = JSON.parse(jsonValue);
      return usuarioRecuperado;
    }
  } catch (e) {
    // error reading value
  }
};

export default function App() {
  const [peso, setPeso] = React.useState('')
  const [altura, setAltura] = React.useState('')
  const [imcvalor, setImcvalor] = React.useState('')
  const [imcNum, setImcNum] = React.useState(null)
  const [usuarioSalvo, setUsuarioSalvo] = React.useState(null);

  async function restoreUsuarioSalvo() {
    const restoredUsuario = await getUsuario();
    setUsuarioSalvo(restoredUsuario);
  }

  async function salvaUsuario(imcNum) {
    const success = await salvarUsuario(imcNum);
    if (success) {
      setUsuarioSalvo(imcNum);
    }
  }

  React.useEffect(() => {
    restoreUsuarioSalvo();
  }, []);

  async function defIMC(altura, peso) {
    const imc = parseFloat(peso) / parseFloat((altura ** 2))
    const imcfixed = imc.toFixed(2)
    setImcNum(imcfixed)
    if (imc < 18.5) {
      setImcvalor("Magreza")
    } else if (imc >= 18.5 && imc < 25.0) {
      setImcvalor("Normal")
    } else if (imc >= 25.0 && imc < 30.0) {
      setImcvalor("Sobrepeso")
    } else if (imc >= 30.0 && imc < 40.0) {
      setImcvalor("Obesidade grau I")
    } else if (imc >= 40.0) {
      setImcvalor("Obesidade grau II")
    }
    await salvaUsuario(imcNum, imcvalor);
  }


  return (
    <View style={styles.container}>
      <TextInput
        value={altura}
        mode="outlined"
        label="Altura"
        placeholder="Altura"
        onChangeText={(altura) => setAltura(altura)}
      />

      <TextInput
        value={peso}
        mode="outlined"
        label="Peso"
        placeholder="Peso"
        onChangeText={(peso) => setPeso(peso)}
      />

      <Button style={styles.botao} icon="calculator" mode="contained" onPress={() => { defIMC(altura, peso) }}>
        Calcular
      </Button>
      <View >
        <Text style={styles.resposta} variant="displayLarge">{imcNum} - {imcvalor}</Text>
        <Text style={styles.resposta} variant="displayLarge">Último IMC: {usuarioSalvo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  botao: {
    marginTop: 10,
  },
  resposta: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 15,
    color: 'blue'
  }
});
