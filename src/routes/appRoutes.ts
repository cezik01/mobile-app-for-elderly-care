import RegistrationScreen from 'screens/auth/signUp/RegistrationScreen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import HomeScreen from 'screens/home/HomeScreen';
import CaregiverProfileScreen from 'screens/profiles/CaregiverProfileScreen';
import PatientProfileScreen from 'screens/profiles/PatientProfileScreen';
import ProfileEditScreen from 'screens/profiles/ProfileEditScreen';


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
    name: 'CaregiverProfile',
    component: CaregiverProfileScreen,
  },
  {
    name: 'PatientProfile',
    component: PatientProfileScreen,
  },
  {
    name: 'ProfileEditScreen',
    component: ProfileEditScreen,
  }
];

export default appRoutes;
