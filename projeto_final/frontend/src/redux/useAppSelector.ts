import  {useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';

//CRIANDO UM APP SELECTOR PERSONALIZADO(TYPADO)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;