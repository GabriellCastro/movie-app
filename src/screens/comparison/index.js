import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';

const PriceComparisonScreen = () => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dados mockados de cinemas em Manaus
    const mockData = [
      { 
        name: 'Studio 5', 
        price: 22.00, 
        url: 'https://static.wixstatic.com/media/2caacf_52bacaf3f0dc4f46b7266266a388afb1~mv2.png' 
      },
      { 
        name: 'Cinépolis Ponta Negra', 
        price: 25.00,
        url: 'https://www.cinepolis.com.br/img/post.jpg?1725341784' 
      },
      { 
        name: 'Playarte Manauara', 
        price: 21.00, 
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Grupo_PlayArte_logo.png' 
      },
      { 
        name: 'Kinoplex Amazonas', 
        price: 23.00,
        url: 'https://media.licdn.com/dms/image/v2/D4D1BAQFaC7IkTAz9Mg/company-background_10000/company-background_10000/0/1657823524481/kinoplex_cover?e=2147483647&v=beta&t=r5nzqJ5k0Flyz_mV9c2ksv5qfoYzQL5Ib8XfW-rEjLs' 
      },
      { 
        name: 'UCI Sumaúma', 
        price: 24.00,
        url: 'https://www.exibidor.com.br/fotos/noticias/notundefined_1662058333.jpg' 
      },
      { 
        name: 'Cinemark Studio 5', 
        price: 26.00,
        url: 'https://chequeteatro.com.br/wp-content/uploads/2015/10/cinemark-vector-logo.png' 
      },
    ];

    // Simulação de um tempo de carregamento
    setTimeout(() => {
      setCinemas(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cinemas}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.cinemaName}>{item.name}</Text>
              <Text style={styles.price}>Preço: R$ {item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row', // Imagem e informações lado a lado
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  cinemaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
});

export default PriceComparisonScreen;
