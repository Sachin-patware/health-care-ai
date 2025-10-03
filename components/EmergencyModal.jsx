import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function EmergencyModal({ visible, onClose }) {
  const [sending, setSending] = useState(false);

  const sendAlert = async () => {
    setSending(true);
    setTimeout(() => { setSending(false); onClose && onClose(); }, 1000);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Emergency Alert</Text>
          <Text style={styles.subtitle}>We will fetch your location and notify contacts.</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={onClose}>
              <Text style={styles.btnTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.send]} onPress={sendAlert} disabled={sending}>
              <Text style={styles.btnText}>{sending ? 'Sending...' : 'Confirm SOS'}</Text>
            </TouchableOpacity>
          </View>
          {sending && <ActivityIndicator color={colors.emergency} style={{ marginTop: 12 }} />}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  sheet: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.emergency
  },
  subtitle: {
    marginTop: 6,
    color: '#6b7280'
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancel: {
    backgroundColor: '#f3f4f6'
  },
  send: {
    backgroundColor: colors.emergency
  },
  btnText: {
    color: 'white',
    fontWeight: '700'
  },
  btnTextCancel: {
    color: '#111827',
    fontWeight: '600'
  }
});


