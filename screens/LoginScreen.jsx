import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useAuth } from '../navigation';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { login } = useAuth();
  const [method, setMethod] = useState('phone');
  const [identifier, setIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  const redirectUri = AuthSession.makeRedirectUri({ scheme: 'healthcareai' });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO || (global?.expo?.env?.googleClientIdExpo)) ?? 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
      androidClientId: (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID || (global?.expo?.env?.googleClientIdAndroid)) ?? 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
      iosClientId: (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS || (global?.expo?.env?.googleClientIdIos)) ?? 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Token
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      login();
    }
    if (response?.type === 'error' || response?.type === 'dismiss') {
      setOauthLoading(false);
    }
  }, [response, login]);

  const sendOtp = async () => {
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 800);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); login(); }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HealthCare AI</Text>
      <View style={styles.methodRow}>
        <TouchableOpacity onPress={() => setMethod('phone')} style={[styles.methodBtn, method==='phone' && styles.methodActive]}>
          <Text style={[styles.methodText, method==='phone' && styles.methodTextActive]}>Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMethod('email')} style={[styles.methodBtn, method==='email' && styles.methodActive]}>
          <Text style={[styles.methodText, method==='email' && styles.methodTextActive]}>Email</Text>
        </TouchableOpacity>
      </View>

      {!otpSent ? (
        <>
          <TextInput
            style={styles.input}
            keyboardType={method==='phone' ? 'phone-pad' : 'email-address'}
            placeholder={method==='phone' ? 'Enter phone number' : 'Enter email'}
            placeholderTextColor={colors.textSecondary}
            value={identifier}
            onChangeText={setIdentifier}
          />
          <PrimaryButton title={loading ? 'Sending...' : 'Send OTP'} onPress={sendOtp} disabled={!identifier || loading} />
          <TouchableOpacity onPress={async () => { setOauthLoading(true); await promptAsync(); }} style={{ marginTop: spacing.lg }} disabled={!request || oauthLoading}>
            <View style={{ backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingVertical: 14, alignItems: 'center' }}>
              <Text style={{ color: colors.text, fontWeight: '600' }}>{oauthLoading ? 'Connecting to Google...' : 'Continue with Google'}</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            keyboardType='number-pad'
            placeholder='Enter OTP'
            placeholderTextColor={colors.textSecondary}
            value={otp}
            onChangeText={setOtp}
          />
          <PrimaryButton title={loading ? 'Verifying...' : 'Verify OTP'} onPress={verifyOtp} disabled={!otp || loading} />
          <TouchableOpacity onPress={sendOtp} style={{ marginTop: spacing.md }}>
            <Text style={{ color: colors.accent }}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      )}
      <Text style={styles.helper}>OTP flow is simulated. API hooks to be added later.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center'
  },
  methodRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.lg,
    justifyContent: 'center'
  },
  methodBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e4e4e7'
  },
  methodActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  methodText: {
    color: colors.text
  },
  methodTextActive: {
    color: 'white',
    fontWeight: '600'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: spacing.lg,
    color: colors.text
  },
  helper: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xl
  }
});
// Google button inline style (kept here to avoid refactor churn)
const styles2 = StyleSheet.create({
  googleBtn: {}
});


