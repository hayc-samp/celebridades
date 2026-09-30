import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { PesquisarCelebridades as buscarCelebridadeAPI } from './services/celebridades';
import styles from './style';

export default function App() {
  const [celebridades, setCelebridades] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [pesquisa, setPesquisa] = useState('');
  const [genero, setGenero] = useState('todos');
  const [celebridadesEncontradas, setCelebridadesEncontradas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  // Função genérica para realizar a busca na API
  async function executarBusca(nomeBusca) {
    if (!nomeBusca || nomeBusca.trim() === '') return;

    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarCelebridadeAPI(nomeBusca);
      setCelebridades(dados || []);
    } catch (error) {
      console.log('Erro ao buscar celebridade:', error);
      setErro('Não foi possível carregar os dados.');
    } finally {
      setCarregando(false);
    }
  }

  // Recalcula o filtro sempre que 'celebridades', 'pesquisa' ou 'genero' mudarem
  useEffect(() => {
    const resultado = celebridades.filter((celebridade) => {
      const atendeNome = celebridade.name
        ?.toLowerCase()
        .includes(pesquisa.toLowerCase());

      const atendeGenero =
        genero === 'todos' ||
        celebridade.gender?.toLowerCase() === genero.toLowerCase();

      return atendeNome && atendeGenero;
    });

    setCelebridadesEncontradas(resultado);
  }, [celebridades, pesquisa, genero]);

  function limparSessao() {
    setCelebridadesEncontradas([]);
    setGenero('todos');
    setPesquisa('');
  }

  function alternarFavorito(celebridade) {
    const jaFavoritada = favoritos.some(
      (item) => item.name === celebridade.name
    );

    if (jaFavoritada) {
      setFavoritos(favoritos.filter((item) => item.name !== celebridade.name));
    } else {
      setFavoritos([...favoritos, celebridade]);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquise uma celebridade</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a celebridade que você quer buscar"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => executarBusca(pesquisa)}>
        <Text style={styles.textoBotao}>Buscar celebridade</Text>
      </TouchableOpacity>

    
      <TouchableOpacity
        style={styles.botao}
        onPress={() => setMostrarFavoritos(!mostrarFavoritos)}>
        <Text style={styles.textoBotao}>
          {mostrarFavoritos ? 'Mostrar todas' : ' Mostrar favoritos'}
        </Text>
      </TouchableOpacity>

  <View style={styles.filtrosGenero}>
        <TouchableOpacity
          style={styles.botaoGenero}
          onPress={() => setGenero('todos')}>
          <Text style={styles.textoBotao}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoGenero}
          onPress={() => setGenero('male')}>
          <Text style={styles.textoBotao}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoGenero}
          onPress={() => setGenero('female')}>
          <Text style={styles.textoBotao}>Feminino</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => limparSessao()}>
        <Text style={styles.textoBotao}>limpar Sessao</Text>
      </TouchableOpacity>

      <Text style={styles.contador}>
        Celebridades encontradas: {celebridadesEncontradas.length}
      </Text>

      {/* Indicador de Carregamento */}
      {carregando && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Mensagem de Erro */}
      {erro && <Text style={{ color: 'red', marginTop: 10 }}>{erro}</Text>}

      {!carregando && (
        <FlatList
          data={mostrarFavoritos ? favoritos : celebridadesEncontradas}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Gênero: {item.gender}</Text>

              <Text style={styles.info}>
                Ocupação: {item.occupation?.join(', ')}
              </Text>

              <Text style={styles.info}>Nacionalidade: {item.nationality}</Text>

              <Text style={styles.info}>
                Patrimônio Líquido: ${item.net_worth}
              </Text>

              <TouchableOpacity
                style={styles.botaoGenero}
                onPress={() => alternarFavorito(item)}>
                <Text style={styles.textoBotao}>
                  {favoritos.some((fav) => fav.name === item.name)
                    ? ' Remover dos favoritos'
                    : ' Favoritar'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
