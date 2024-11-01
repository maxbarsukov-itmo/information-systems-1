import useRoute from 'hooks/useRoute';

const useTitleChange = () => {
  const route = useRoute();
  const newTitle = route.title ? `${route.title} | lab1` : 'lab1';
  if (document.title !== newTitle) document.title = newTitle;
};

export default useTitleChange;
