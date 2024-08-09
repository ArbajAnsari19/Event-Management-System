import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth';

export default function Profile() {
  //@ts-ignore
  const { isLoggedIn, userEmail, login, logout, register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    login(email, password);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.profileCard}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.emailText}>{userEmail}</Text>
          <Text>Hey Buddy Welcome and you are logged in.</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <View style={styles.authForm}>
          <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            title={isRegistering ? 'Register' : 'Login'}
            onPress={isRegistering ? handleRegister : handleLogin}
          />
          <Button 
            title={isRegistering ? 'Have an account? Login' : "Don't have an account? Register"}
            onPress={() => setIsRegistering(!isRegistering)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    width: '80%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  authForm: {
    width: '80%',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
