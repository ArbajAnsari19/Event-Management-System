import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AuthContext } from '../../context/auth';
import { EventContext } from '../../context/event';

function EventDetail() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  //@ts-ignore
  const { isLoggedIn, userToken } = useContext(AuthContext);
  //@ts-ignore
  const { getEvents } = useContext(EventContext);

  interface Event {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await fetch(`http://10.81.54.8:5000/api/events/${id}`);
        const data = await response.json();
        if (response.ok) {
          setEvent(data);
        } else {
          throw new Error(data.message || 'Failed to fetch event details');
        }
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [id]);

  const handleUpdate = async () => {
    if (!isLoggedIn) {
      Alert.alert('Error', 'You must be logged in to update the event.');
      return;
    }

    try {
      const response = await fetch(`http://10.81.54.8:5000/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        Alert.alert('Success', 'Event updated successfully');
        setIsEditing(false);
        getEvents();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to update event');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!isLoggedIn) {
      Alert.alert('Error', 'You must be logged in to delete the event.');
      return;
    }
  
    try {
      const response = await fetch(`http://10.81.54.8:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Event deleted successfully');

        router.back(); // Navigate back to the previous screen
        getEvents();
      } else {
        const errorData = await response.json();
        console.log('Server response:', response.status, errorData);
        Alert.alert('Error', errorData.message || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Delete event error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={event.title}
            onChangeText={(text) => setEvent({ ...event, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={event.date}
            onChangeText={(text) => setEvent({ ...event, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={event.time}
            onChangeText={(text) => setEvent({ ...event, time: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={event.location}
            onChangeText={(text) => setEvent({ ...event, location: text })}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            value={event.description}
            onChangeText={(text) => setEvent({ ...event, description: text })}
            multiline
          />
          <View style={styles.buttonRow}>
            <Button title="Update Event" onPress={handleUpdate} color="#27ae60" />
            <Button title="Cancel" onPress={() => setIsEditing(false)} color="#c0392b" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.details}>Date: {event.date}</Text>
          <Text style={styles.details}>Time: {event.time}</Text>
          <Text style={styles.details}>Location: {event.location}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <View style={styles.buttonRow}>
            <Button title="Edit Event" onPress={() => setIsEditing(true)} color="#2980b9" />
            <Button title="Delete Event" onPress={handleDelete} color="#e74c3c" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  loadingText: {
    fontSize: 18,
    color: '#3498db',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 12,
    lineHeight: 22,
  },
  input: {
    height: 40,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default EventDetail;
