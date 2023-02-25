import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Participant } from "../components/participants";
import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (!participantName.trim()) {
      Alert.alert("Nome Inválido", "Digite um nome de participante válido!");
      return setParticipantName("");
    }

    if (participants.includes(participantName.toLocaleLowerCase())) {
      return Alert.alert(
        "Participante Existente",
        "Já Existe Participante na Lista com esse Nome"
      );
    }

    setParticipants((prevState) => [...prevState, participantName.trim().toLocaleLowerCase()]);
    console.log(participantName);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover a participação do(a) ${name} ?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);

    console.log(`Você removeu ${name}`);
  }

  return (
    <View style={styles.container}>
      <TextInput 
      placeholder="Nome do Evento"
      placeholderTextColor="#6B6B6B"
      style={styles.eventName}></TextInput>

      <TextInput 
      placeholder="Data do Evento"
      placeholderTextColor="#6B6B6B"
      style={styles.eventDate}></TextInput>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(key) => key}
        data={participants}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(`${item}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
