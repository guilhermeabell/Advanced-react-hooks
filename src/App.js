import * as React from "react";
import { UserFalback } from "./components/UserFallback";
import { UserView } from "./components/UserView";
import { fetchGithubUser } from "./userService";
import { UserErrorBoundary, UserForm } from "./components/UserForm";

const UserInfo = ({ userName }) => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if(!userName) return;
    fetchGithubUser().then(
      (userData) => {  
        setUser(userData)
    },
    (error) => { 
        setError(error);
    }
    );
  }, [userName])  

  if(error) {
    return (
    <div>
       There was an error 
      <pre style={{ whiteSpace: "normal" }}>{error}</pre>
    </div>
    );
  
 } else if (!userName) {
    return "Submit user";
  } else if(!user) {
  return <UserFalback userName={userName} />
  } else{
    return <UserView user={user} />
  }
};

const UserSection = ({ onSelect, userName }) => (
  <div>
    <div className="flex justify-center ">
      <UserInfo userName={userName} />
    </div>
  </div>
);

const App = () => {
  const [userName, setUserName] = React.useState(null);
  const handleSubmit = (newUserName) => setUserName(newUserName);
  const handleSelect = (newUserName) => setUserName(newUserName);

  return (
    <div>
      <UserForm userName={userName} onSubmit={handleSubmit} />
      <hr />
      <div className="m-4">
        <UserSection onSelect={handleSelect} userName={userName} />
      </div>
    </div>
  );
};

export default App;
