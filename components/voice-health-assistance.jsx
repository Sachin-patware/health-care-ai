import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
let Voice;

const PRIMARY_COLOR = '#007AFF';
const BACKGROUND_COLOR = '#F9F9F9';

const fetchResponseFromBackend = async (voiceText) => {
  try {
    // Replace with your backend endpoint and logic
    const response = await fetch('https://your-backend-api.com/health-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: voiceText }),
    });
    const json = await response.json();
    return json.answer || 'Sorry, no response from backend.';
  } catch (error) {
    console.error('Backend fetch error:', error);
    return 'Error connecting to backend service.';
  }
};

const VoiceHealthAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Tap mic and speak your health query');

  useEffect(() => {
    try {
      // Dynamically require to avoid Expo Go bundling error on iOS if module is unavailable
      Voice = require('@react-native-voice/voice').default;
    } catch (e) {
      console.warn('Voice module not available in Expo Go; mic disabled');
    }
    // Voice event handlers
    if (Voice) {
      Voice.onSpeechStart = onSpeechStartHandler;
      Voice.onSpeechEnd = onSpeechEndHandler;
      Voice.onSpeechResults = onSpeechResultsHandler;
      Voice.onSpeechError = onSpeechErrorHandler;
    }

    return () => {
      if (Voice) {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    setStatusMessage('Listening...');
  };

  const onSpeechEndHandler = (e) => {
    setIsRecording(false);
    setStatusMessage('Processing voice input...');
    handleSendQuery(voiceInput);
  };

  const onSpeechResultsHandler = (e) => {
    // e.value is an array of recognized phrases
    if (e.value && e.value.length > 0) {
      setVoiceInput(e.value[0]);
    }
  };

  const onSpeechErrorHandler = (e) => {
    setIsRecording(false);
    setStatusMessage('Recognition error, try again.');
  };

  const startRecording = async () => {
    setResponseText('');
    setVoiceInput('');
    setLoading(false);
    setStatusMessage('Starting recording...');
    try {
      if (!Voice) {
        setStatusMessage('Voice not supported in Expo Go.');
        return;
      }
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (error) {
      console.error('Voice start error:', error);
      setStatusMessage('Could not start recording.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!Voice) return;
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Voice stop error:', error);
    }
  };

  const handleSendQuery = async (query) => {
    if (!query.trim()) {
      setStatusMessage('Please speak something.');
      return;
    }
    setLoading(true);
    setStatusMessage('Fetching response...');
    const backendResponse = await fetchResponseFromBackend(query);
    setResponseText(backendResponse);
    setLoading(false);
    setStatusMessage('You can ask another question.');

    // Speak out response
    Speech.speak(backendResponse, { pitch: 1, rate: 1 });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="heart-circle-outline" size={36} color={PRIMARY_COLOR} />
        <Text style={styles.title}>Voice Health Assistant</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Voice Input</Text>
          <Text style={styles.voiceText}>{voiceInput || 'Waiting for your speech...'}</Text>
        </View>

        <View style={[styles.card, styles.responseCard]}>
          <Text style={styles.cardTitle}>Assistant Response</Text>
          {loading ? (
            <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ marginTop: 10 }} />
          ) : (
            <Text style={styles.responseText}>
              {responseText || 'Response will appear here.'}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.statusText}>{statusMessage}</Text>

        <TouchableOpacity
          style={[styles.micButton, { backgroundColor: isRecording ? '#FF3B30' : PRIMARY_COLOR }]}
          onPress={isRecording ? stopRecording : startRecording}
          activeOpacity={0.8}
        >
          <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={48} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.hintText}>Tap mic to {isRecording ? 'stop' : 'start'} recording</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  responseCard: {
    backgroundColor: PRIMARY_COLOR + '20',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 10,
  },
  voiceText: {
    fontSize: 18,
    color: '#333',
    minHeight: 60,
  },
  responseText: {
    fontSize: 18,
    color: '#333',
    minHeight: 60,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    paddingTop: 20,
  },
  micButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: PRIMARY_COLOR,
  },
  hintText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default VoiceHealthAssistant;