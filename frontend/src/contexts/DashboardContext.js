import { createContext, useState } from 'react';

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [activeComp, setActiveComp] = useState('MainView');

  const handleActiveComp = (comp) => {
    setActiveComp(comp);
  };

  return (
    <DashboardContext.Provider
      value={{
        handleActiveComp,
        activeComp,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
