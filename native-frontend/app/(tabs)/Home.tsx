import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Link } from 'expo-router';
import { EventContext } from '../../context/event';

function Home() {
  //@ts-ignore
  const { events, loading, error } = useContext(EventContext);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Link href={`/event/${item._id}`} style={styles.eventCard}>
            <View style={styles.textContainer}>
  <Text style={styles.title}>{item.title}</Text>
  
  <View style={styles.divider} />
  
  <View style={styles.infoRow}>
    <View style={styles.infoItem}>
      <Text style={styles.icon}>📅</Text>
      <Text style={styles.details}>{item.date.split("T")[0]}   </Text>
    </View>
    <View style={styles.infoItem}>
      <Text style={styles.icon}>⏰</Text>
      <Text style={styles.details}>{item.time}</Text>
    </View>
  </View>
  
  <View style={styles.locationRow}>
    <Text style={styles.icon}>📍</Text>
    <Text style={styles.location}>{item.location}</Text>
  </View>
</View>

          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ecf0f1',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#2c3e50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,  // Increased size for more impact
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#bdc3c7',
    marginVertical: 10,
    borderRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  icon: {
    fontSize: 18,
    color: '#3498db',
    marginRight: 5,

  },
  details: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#95a5a6',
    marginLeft: 5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#2c3e50',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
  },
});


export default Home;
