import LoginPage from '../../containers/Auth/Login';
import RegisterPage from '../../containers/Auth/Register';
import LockScreenPage from '../../containers/Auth/LockScreen';
import ForgotPassword from '../../containers/Auth/ForgotPassword';

const authRouterHelper = [
  {
    path: '/auth/login-page',
    name: 'Login Page',
    mini: 'LP',
    component: LoginPage,
  },
  {
    path: '/auth/register-page',
    name: 'Register Page',
    mini: 'RP',
    component: RegisterPage,
  },
  {
    path: '/auth/lock-screen-page',
    name: 'Lock Screen Page',
    mini: 'LSP',
    component: LockScreenPage,
  },
  {
    path: '/auth/forgot-password',
    name: 'Forgot Password Page',
    mini: 'LP',
    component: ForgotPassword,
  },
];

export default authRouterHelper;
