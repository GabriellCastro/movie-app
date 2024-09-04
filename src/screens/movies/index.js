import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const TK = '9eaafa7c7afdd6969741ccf61b951f83';

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TK}&language=pt-BR`)
      .then(response => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar filmes..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.movieCard} 
            onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <View style={styles.movieDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.releaseDate}>Lançamento: {new Date(item.release_date).toLocaleDateString('pt-BR')}</Text>
              <Text style={styles.overview}>{item.overview.slice(0, 100)}...</Text>
              <Text style={styles.genre}>{item.genre_ids.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.compareButton} onPress={() => navigation.navigate('Comparador')}>
        <Text style={styles.compareButtonText}>Comparar Preços</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieDetails: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  genre: {
    fontSize: 14,
    color: '#999',
  },
  compareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  compareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoviesScreen;
