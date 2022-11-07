import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Text } from 'react-native-paper';

export default function App() {
  const [peso,setPeso] = React.useState('')
  const [altura,setAltura] = React.useState('')
  const [imcvalor,setImcvalor] = React.useState('')

  function defIMC(altura,peso){
      const imc = parseFloat(peso)/parseFloat((altura**2))
                if(imc < 18.5){
                   setImcvalor("Magreza")
                }else if(imc >= 18.5 && imc < 25.0){
                   setImcvalor("Normal")
                }else if(imc >= 25.0 && imc < 30.0){
                   setImcvalor("Sobrepeso")
                }else if(imc >= 30.0 && imc < 40.0){
                   setImcvalor("Obesidade grau I")
                }else if(imc >= 40.0){
                   setImcvalor("Obesidade grau II")
                }}

  return (
    <View style={styles.container}>
    <TextInput
      value={altura}
      mode="outlined"
      label="Altura"
      placeholder="Altura"
      onChangeText={()=>setAltura(altura)}
    />

    <TextInput
      value={peso}
      mode="outlined"
      label="Peso"
      placeholder="Peso"
      onChangeText={()=>setPeso(peso)}
    />

      <Button style={styles.botao} icon="calculator" mode="contained" onPress={() => {defIMC(altura,peso)}}>
        Calcular
      </Button>
      <Text>{imcvalor}</Text>
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
  botao:{
    marginTop: 10,
  },
});
