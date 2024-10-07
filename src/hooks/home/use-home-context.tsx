import { HomeContext } from '@/contexts/home/home';
import { HomeContextType } from '@/types/home/home'
import { useContext } from 'react'

const useHomeContext: () => HomeContextType = () => {
  return useContext(HomeContext);
}

export default useHomeContext