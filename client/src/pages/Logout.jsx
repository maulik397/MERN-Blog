import React from 'react'

function Logout() {
  
     const history = useHistory();

useEffect(() => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  history.push('/login');
}, [history]);

return null;
    
    

}

export default Logout
