// styles/loginScreenStyles.ts
import { StyleSheet } from 'react-native';

export const loginScreenStyles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 40,
        width: '100%',
        alignItems: 'center',
    },
    appName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 30,
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 25,
        marginTop: 120,
        alignItems: 'center',
    },
    centeredLogo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 28,
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: '#000',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    inputError: {
        borderColor: 'red',
    },
    passwordInputContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
    button: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#000',
        borderRadius: 8,
        paddingVertical: 15,
    },
    linksContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    link: {
        marginVertical: 8,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
    validationError: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 5,
    },
    validationSuccess: {
        color: 'green',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 5,
    },
});
// styles/registerScreenStyles.ts

export const registerScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
  },
  link: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  validationError: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

const additionalStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    marginTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000', // Bordure noire
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#000000', // Bouton noir
    borderRadius: 8,
    paddingVertical: 15,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});
const passwordStyles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    appName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20,
    },
    container: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginTop: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: '#000000',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000000', // Bordure noire
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#000000', // Bouton noir
        borderRadius: 8,
        paddingVertical: 15,
    },
    link: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export const passwordScreenStyles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    appName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20,
    },
    container: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginTop: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: '#000000',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 15,
    },
    link: {
        marginTop: 20,
        alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    appName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20,
    },
    container: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        marginTop: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
        color: '#000000',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#000000', // Bordure noire
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#000000', // Bouton noir
        borderRadius: 8,
        paddingVertical: 15,
    },
    link: {
        marginTop: 20,
        alignItems: 'center',
    },
});