import{StyleSheet} from 'react-native';
const styles =StyleSheet.create({
 container: {
    backgroundColor: "##f1eae5",
    padding: 15,
    flex: 1,
    justifyContent: 'flex-start', // Garante que tudo fique alinhado no topo
    paddingTop: 40, // Ajuste a distância do topo da tela se necessário
  },
titulo:{
  padding:25,
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10
  },
textoBotao:{
  color:"#ffffff",
  fontSize:16,
 fontWeight:'bold',
 textAlign:'center'
},

botao:{
    backgroundColor:"#9018e4",
    padding:16,
    borderRadius:8,
    marginBottom:5,
    },
 input:{
    borderWidth:1,
    borderColor:"#999",
    borderRadius:8,
    padding:15,
    fontSize:15,
    marginBottom:15
  },
  card: {
    color:"#c4c4c4",
    marginBottom: 6,
    borderRadius:5,
    padding:10,
    backgroundColor:"#fea7da",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },

  info: {
    fontSize: 14,
    color: "##525252",
    marginBottom: 2,
  },

  filtrosGenero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },

  botaoGenero: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#9018e4",
    borderRadius: 5,
    alignItems: 'center',
  },

})
export default styles;