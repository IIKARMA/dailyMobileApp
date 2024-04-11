import translations from '@src/translations';
import {useCallback, useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
type TToasts = 'success' | 'danger';
interface IToast {
  message?: string;
  type: TToasts;
}
const useShowToast = () => {
  const toast = useToast();
  const [countToast, setCountToast] = useState<number>(0);
  const handleToastShow = useCallback(({message = '', type}: IToast) => {
    try {
    
      toast.show(message ? message : translations.toastMessages.error, {
        type: type,
        placement: 'top',
        animationType: 'slide-in',
      });
      setTimeout(() => {
        toast?.hideAll();
      }, 1500);
    } catch (error) {}
  }, []);
  const hadnleHideAllToast = useCallback(() => {
    toast.hideAll();
    setCountToast(0);
  }, []);
  return {handleToastShow, hadnleHideAllToast};
};
export default useShowToast;
