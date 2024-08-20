import React from 'react';
import Navigation from './src/Component/Navigation';
import { TodoProvider } from './src/Contexts/TodoContext';

const App = () => {
  return (
    <TodoProvider>
      <Navigation />
    </TodoProvider>
  )
};

export default App;