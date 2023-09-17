import { useSelector, useDispatch } from 'react-redux';
import { setIsLight, setTheme } from './taskSlice';

export function useTheme() {
  const isLight = useSelector((state) => state.tasks.isLight);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = !isLight;
    dispatch(setIsLight(newTheme));
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme.toString());
  };

  return { isLight, toggleTheme };
}
