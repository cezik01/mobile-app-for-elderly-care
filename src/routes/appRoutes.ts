import RegistrationScreen from 'screens/auth/signUp/RegistrationScreen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import HomeScreen from 'screens/home/HomeScreen';
import CaregiverProfileScreen from 'screens/profiles/CaregiverProfileScreen';
import PatientProfileScreen from 'screens/profiles/PatientProfileScreen';
import ProfileEditScreen from 'screens/profiles/ProfileEditScreen';
import MedicationScreen from 'screens/menu/MedicationScreen';


const appRoutes = [
  {
    name: 'Registration',
    component: RegistrationScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Caregiver Profile',
    component: CaregiverProfileScreen,
  },
  {
    name: 'Patient Profile',
    component: PatientProfileScreen,
  },
  {
    name: 'Profile Edit Screen',
    component: ProfileEditScreen,
  },
  {
    name: 'Medication Screen',
    component: MedicationScreen,
  }
];

export default appRoutes;
