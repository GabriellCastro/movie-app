import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const MovieDetailsScreen = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { movieId } = route.params;

  const TK = '9eaafa7c7afdd6969741ccf61b951f83';

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TK}&language=pt-BR`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar informações do filme.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.releaseDate}>Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</Text>
      <Text style={styles.genre}>Gêneros: {movie.genres.map(g => g.name).join(', ')}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.rating}>Nota: {movie.vote_average}/10</Text>
      <Text style={styles.runtime}>Duração: {movie.runtime} min</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  genre: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  runtime: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default MovieDetailsScreen;