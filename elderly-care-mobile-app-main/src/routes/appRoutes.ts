import RegistrationScreen from 'screens/auth/signUp/RegistrationScreen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import HomeScreen from 'screens/home/HomeScreen';


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
  
];

export default appRoutes;
