import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, Modal, TouchableOpacity, FlatList } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const modalidades = [
    "Judô",
    "Karatê",
    "Jiu-jitsu",
    "Taekwondo",
    "Capoeira",
    "Kickboxing",
    "Boxe",
  ];

  // Função para formatar a data
  const formatarData = (date) => {
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleConfirmDate = (date) => {
    setDataNascimento(formatarData(date));
    setDatePickerVisibility(false);
  };

  // Função para formatar o CPF
  const formatarCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  // Função para formatar o Telefone
  const formatarTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handleCadastro = () => {
    if (!nome || !cpf || !telefone || !dataNascimento || !endereco || !modalidade) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
    // Aqui você pode adicionar a lógica para enviar os dados para um backend ou salvar localmente
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Alunos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => setCpf(formatarCPF(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(formatarTelefone(text))}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Button
        title={
          dataNascimento ? `Data de Nascimento: ${dataNascimento}` : "Escolher Data de Nascimento"
        }
        onPress={() => setDatePickerVisibility(true)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <TouchableOpacity
        style={styles.modalTrigger}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.modalTriggerText}>
          {modalidade ? modalidade : "Selecione a Modalidade"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Modalidade</Text>
            <FlatList
              data={modalidades}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setModalidade(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="Cadastrar Aluno" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  modalTrigger: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    alignItems: "center",
  },
  modalTriggerText: {
    color: "#555",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 16,
  },
});
