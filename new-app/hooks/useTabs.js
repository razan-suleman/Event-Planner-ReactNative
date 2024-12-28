import { useState } from 'react';

const useTabs = (initialIndex = 0) => {
  const [activeTab, setActiveTab] = useState(initialIndex);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return { activeTab, changeTab };
};

export default useTabs;
