import { StyleSheet } from "react-native";

export const globalColors = {
  primary: '#222831',
  secondary: '#393E46',
  tertiary: '#a0a0a0ff' ,
  accent: '#00ADB5',
  error: '#96243bff',
  background: '#EEEEEE',
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.primary,
  },
  header2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.primary,
  },
  title: {
    fontSize: 14,
    fontWeight: 'medium',
    color: globalColors.primary,
  },
  titleBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: globalColors.primary,
  },
  date: {
    fontSize: 12,
    fontWeight: 'light',
    fontStyle: 'italic'
  },
  description: {
    fontSize: 14,
    fontWeight: 'regular',
    color: globalColors.secondary,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: globalColors.secondary,
  },
  accentButton: {
    marginTop: 20,
    padding: 10,
    width: '50%',
    backgroundColor: globalColors.accent,
    alignItems: 'center',
    borderRadius: 10,
  },
  accentButtonText: {
    color: globalColors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  }
});