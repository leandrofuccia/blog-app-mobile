import { AuthProvider } from '@/context/AuthContext';
import DrawerNavigator from '@/navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ConfirmToast from 'components/ConfirmToast';
import CustomToast from 'components/CustomToast';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
     <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <Toast
        config={{
          success: (props) => <CustomToast {...props} type="success" />,
          error: (props) => <CustomToast {...props} type="error" />,
          info: (props) => <CustomToast {...props} type="info" />,
          alert: (props) => <CustomToast {...props} type="alert" />,
          confirm: ({ text1, text2, props }) => (
          <ConfirmToast
            text1={text1 ?? ''}
            text2={text2}
            onConfirm={props?.onConfirm}
            onCancel={props?.onCancel}
          />
          ),
        }}
      />
    </AuthProvider>
  );
}