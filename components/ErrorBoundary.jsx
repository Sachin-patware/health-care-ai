import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: String(error?.message || error) };
  }

  componentDidCatch(error, info) {
    console.warn('ErrorBoundary caught:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>{this.state.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary,
    textAlign: 'center'
  }
});


