import React, {useState} from 'react';
import Aside from './Aside';

function Layout({ setLocale }) {
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);


  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app`}>
      <Aside
        image={image}
        collapsed={false}
        rtl={false}
        toggled={false}
        handleToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
}

export default Layout;
