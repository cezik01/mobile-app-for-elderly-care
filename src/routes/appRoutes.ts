import RegistrationScreen from 'screens/auth/signUp/RegistrationScreen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import HomeScreen from 'screens/home/HomeScreen';
import CaregiverProfileScreen from 'screens/profiles/CaregiverProfileScreen';
import PatientProfileScreen from 'screens/profiles/PatientProfileScreen';
import ProfileEditScreen from 'screens/profiles/ProfileEditScreen';
import MedicationScreen from 'screens/menu/MedicationScreen';
import NotificationsScreen from 'screens/profiles/NotificationsScreen';
import AppointmentScreen from 'screens/menu/AppointmentScreen';
import BloodPressureScreen from 'components/ProfileComponents/BloodPressure';
import BloodSugarScreen from 'components/ProfileComponents/BloodSuggar';


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
  },
  {
    name:'NotificationsScreen',
    component: NotificationsScreen,
  },
  {
    name: 'Appointment Screen',
    component: AppointmentScreen,
  },
  {
    name: "Blood Pressure Screen",
    component: BloodPressureScreen,
  },
  {
    name: "Blood Sugar Screen",
    component: BloodSugarScreen,
  }
];

export default appRoutes;
