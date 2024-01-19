import RegistrationScreen from 'screens/auth/signUp/RegistrationScreen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import HomeScreen from 'screens/home/HomeScreen';
import CaregiverProfileScreen from 'screens/profiles/caregiver/CaregiverProfileScreen';
import PatientProfileScreen from 'screens/profiles/patient/PatientProfileScreen';
import ProfileEditScreen from 'screens/profiles/profileEdit/ProfileEditScreen';
import MedicationScreen from 'screens/menu/medication/MedicationScreen';
import NotificationsScreen from 'screens/profiles/notification/NotificationsScreen';
import AppointmentScreen from 'screens/menu/appointment/AppointmentScreen';
import MenuScreen from 'screens/menu/MenuScreen'
import BloodPressureScreen from 'components/ProfileComponents/BloodPressure/BloodPressure';
import BloodSugarScreen from 'components/ProfileComponents/BloodSugar/BloodSugar';
import ContactsScreen from 'screens/features/contacts/ContactsScreen';
import PasswordReset from 'screens/auth/login/PasswordReset';
import HelpScreen from 'screens/help/HelpScreen';
import FeedbackScreen from 'screens/feedback/FeedbackScreen';

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
    name: 'Notifications Screen',
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
  },
  {
    name: 'Menu Screen',
    component: MenuScreen,
  },
  {
    name: 'Contacts Screen',
    component: ContactsScreen,
  },
  {
    name: 'PasswordReset',
    component: PasswordReset,
  },
  {
    name: 'Help Screen',
    component: HelpScreen,
  },
  {
    name: 'Feedback Screen',
    component: FeedbackScreen,
  }
];

export default appRoutes;
