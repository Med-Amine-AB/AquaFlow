import React, { useState, ReactNode, createContext, useContext } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import Navbar from '../components/Navbar';



const TitreContext = createContext({
  titre: 'light',
  setTitre: (titre: string) => {},
});
export const useTitre = () => useContext(TitreContext);
const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [titre, setTitre] = useState('Home Page');

  return (
    <TitreContext.Provider value={{ titre, setTitre }}>
    <div className="bg-stroke text-bodydark-2">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} titre={titre} /> */}
          {/* <!-- ===== Header End ===== --> */}
          <Navbar/>
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className=" mx-auto max-w-screen-2xl p-10 rounded-lg">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
    </TitreContext.Provider>
  );
};

export default DefaultLayout;
