import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useAuth } from '../navigation/auth';

// Optional in Expo Go; removing to avoid dependency on expo-web-browser

export default function LoginScreen() {
  const { login } = useAuth();
  const [method, setMethod] = useState('phone');
  const [identifier, setIdentifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setOauthLoading(true);
      const AuthSession = await import('expo-auth-session');
      const clientId = (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_EXPO || (global?.expo?.env?.googleClientIdExpo)) ?? 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com';
      // For Expo Go on iOS/Android, prefer proxy redirect without custom scheme
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent('openid profile email')}&prompt=select_account`;
      const result = await AuthSession.startAsync({ authUrl, returnUrl: redirectUri });
      if (result.type === 'success') {
        login();
      }
    } catch (e) {
      console.warn('Google login unavailable:', e?.message || e);
    } finally {
      setOauthLoading(false);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    setErrorMsg('');
    // Generate a 6-digit demo OTP and "send"
    const generated = String(Math.floor(100000 + Math.random() * 900000));
    setExpectedOtp(generated);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 600);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setLoading(false);
      if (otp && expectedOtp && otp.trim() === expectedOtp) {
        login();
      } else {
        setErrorMsg('Invalid OTP. Please try again or resend.');
      }
    }, 400);
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
          <TouchableOpacity onPress={handleGoogleLogin} style={{ marginTop: spacing.lg }} disabled={oauthLoading}>
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
      {!!errorMsg && <Text style={[styles.helper, { color: colors.emergency }]}>{errorMsg}</Text>}
      <Text style={styles.helper}>OTP flow is simulated. Enter the 6-digit code sent to your contact.</Text>
      {otpSent && (
        <Text style={[styles.helper, { marginTop: spacing.md }]}>Demo OTP for testing: {expectedOtp}</Text>
      )}
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


