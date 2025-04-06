import { StyleSheet, SafeAreaView, Platform, StatusBar, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import React from 'react';

interface SafeScreenViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function SafeScreenView({ children, style }: SafeScreenViewProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView 
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? '#000' : '#fff'
        },
        style
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
}); 