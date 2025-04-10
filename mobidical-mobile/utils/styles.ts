import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { height, width } = Dimensions.get('window');

export const loginScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  
  appName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.palette.black,
    marginTop: 40,
  },
  
  container: {
    width: '100%',
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
    color: colors.palette.black,
  },
  
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.palette.black,
  },
  
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 8,
    backgroundColor: colors.palette.white,
    flexDirection: 'row',     // Ajouté pour permettre le placement des icônes
    alignItems: 'center',     // Ajouté pour aligner verticalement les icônes
    paddingLeft: 10,          // Réduit pour laisser de la place à l'icône
  },
  
  inputText: {
    flex: 1,                  // Pour que le texte occupe l'espace disponible
    paddingLeft: 10,          // Espacement après l'icône
    color: 'black',
  },
  
  inputIcon: {               // Nouveau style pour les icônes
    padding: 10,
    width: 40,
  },
  
  validationError: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  
  validationSuccess: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
  },
  
  inputFieldWithError: {
    borderColor: 'red',
  },
  
  inputFieldWithSuccess: {
    borderColor: 'green',
  },
  
  passwordInputContainer: {
    width: '100%',           // Modifié pour prendre toute la largeur
    position: 'relative',
  },
  
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,                // Ajusté pour le centrage vertical
  },
  
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: colors.palette.black,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  
  link: {
    marginVertical: 8,
    paddingHorizontal: 13,
  },
  
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export const registerScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 23, // Augmenté de 15 à 20 pour plus d'espace global
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: colors.palette.black,
  },
  logo: {
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 23, // Augmenté de 15 à 20
    justifyContent: 'center',
    margin: 10,
    borderRadius: 8,
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 13, // Ajouté pour créer l'espace à gauche et à droite des inputs
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 14,
    color: colors.palette.black,
    fontWeight: '500',
  },
  inputField: {
    borderWidth: 1,
    borderColor: colors.palette.text200,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    height: 40,
  },
  passwordContainer: {
  
    position: 'relative',
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 13, // Ajouté pour créer l'espace à gauche et à droite du champ de mot de passe
  },
  eyeIcon: {
    position: 'absolute',
    right: 22, // Augmenté pour tenir compte du padding ajouté (12 + 10)
    top: 35,
  },
  button: {
    marginTop: 15,
    backgroundColor: colors.palette.black,
    paddingVertical: 12,
    borderRadius: 6,
    height: 44,
    marginHorizontal: 13, // Ajouté pour aligner le bouton avec les champs
  },
  link: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 13, // Ajouté pour créer l'espace à gauche et à droite du champ de mot de passe

  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
  validationError: {
    color: 'red',
    fontSize: 11,
    marginTop: 3,
    borderColor: 'red',
  },
  inputSuccess: {
    borderColor: 'green',
    backgroundColor: colors.palette.text200,
  },
  checkboxContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10, // Ajouté pour aligner avec les champs
  },
  // Styles pour les boutons radio
  radioContainer: {
    marginVertical: 8,
    gap: 8,
    paddingHorizontal: 10, // Ajouté pour aligner avec les champs
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.palette.owlBook,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.palette.black,
  },
  radioLabel: {
    fontSize: 14,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    height: 40,
    marginBottom: 10,
    backgroundColor: colors.palette.white,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    height: 40,
    marginBottom: 10,
    backgroundColor: colors.palette.white,
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
    color: colors.palette.black,
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
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    color: colors.palette.text100,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.palette.black,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: colors.palette.black,
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
    color: colors.palette.black,
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
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    color: colors.palette.text100,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.palette.black,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: colors.palette.black,
    borderRadius: 8,
    paddingVertical: 15,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export const passwordScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  }, header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.palette.black,
    textAlign: 'center',
  },
  logo: {
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.palette.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'black',
  },
  link: {
    color: colors.palette.black,
    textAlign: 'center',
    fontWeight: '500',
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
    color: colors.palette.black,
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
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    color: colors.palette.text100,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: colors.palette.black,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.palette.black,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: colors.palette.black,
    paddingVertical: 15,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export const profileScreenStyles = StyleSheet.create({
  // Vos styles existants...
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: colors.palette.black,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },

  // Nouveau style pour le conteneur de titre centré
  titleContainer: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },

  // Style pour le titre centré
  centerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.palette.black,
    textAlign: 'center',
  },

  profileContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.palette.black
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.palette.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  editButton: {
    padding: 8,
  },

  // Styles modifiés pour l'image de profil interactive
  profileImageContainer: {
    position: 'relative',  // Nouveau
    alignItems: 'center',
    marginBottom: 24
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.palette.black
  },

  // Nouveau style pour l'icône d'appareil photo superposée
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.palette.white,
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: colors.palette.black,
  },

  infoSection: {
    marginBottom: 24
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.palette.black
  },
  infoValue: {
    fontSize: 16,
    color: colors.palette.text100
  },
  separator: {
    height: 1,
    backgroundColor: colors.palette.black,
    marginVertical: 4
  },
  logoutButton: {
    backgroundColor: colors.palette.black,
    color: colors.palette.white,
  }
});
const ChangePasswordstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.palette.black,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.palette.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.palette.black,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.text200,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.palette.black,

  },
  inputError: {
    borderColor: colors.palette.lionRed,
  },
  errorText: {
    marginTop: 4,
    color: colors.palette.lionRed,
    fontSize: 12,
  },
  button: {
    backgroundColor: colors.palette.black,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    color: colors.palette.white
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const editProfilestyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,  
    borderBottomColor: 'transparent', 
  },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.palette.black,
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: colors.palette.black,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.palette.text100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userIcon: {
        opacity: 0.5,
    },
    imageActionButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.palette.owl100,
        borderRadius: 18,
        padding: 8,
        borderWidth: 2,
        borderColor: colors.palette.owl100,
    },
    userImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 6,
        color: colors.palette.black,
        fontWeight: '500',
    },
    inputField: {
        backgroundColor: colors.palette.text200,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: colors.palette.black,
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 30,
    },
    errorText: {
        color: colors.palette.lionRed,
        marginBottom: 10,
    },
    noteText: {
        fontSize: 12,
        color: colors.palette.text200,
        marginTop: 5,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: colors.palette.text100,
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export const settingscreenstyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.palette.black,
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.palette.black,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: colors.palette.white,
    shadowColor: colors.palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.palette.black,
  },
  settingValue: {
    fontSize: 14,
    color: colors.palette.text200,
    marginRight: 8,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  divider: {
    height: 1,
    backgroundColor: colors.palette.text100,
    marginHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: colors.palette.text100,
    fontSize: 16,
    fontWeight: 'bold',
  },
});