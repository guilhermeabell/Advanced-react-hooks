import * as React from "react";
import { UserFalback } from "./components/UserFallback";
import { UserView } from "./components/UserView";
import { fetchGithubUser } from "./userService";
import { UserErrorBoundary, UserForm } from "./components/UserForm";

const UserInfo = ({ userName }) => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState("idle")

  React.useEffect(() => {
    if(!userName) return;
    setUser("null");
    setError("null");
    setStatus("pendding")
    fetchGithubUser().then(
      (userData) => {  
        setUser(userData);
        setStatus("resolved")
    },
    (error) => { 
        setError(error);
        setStatus("rejected");
    }
    );
  }, [userName]);

switch (status) {

  case "idle":
    return "Submit user";

  case "pendding":
    return <UserFalback userName={userName} />;
    
    case "resolved":
    return <UserView user={user} />;

    case "rejected":
      return (
        <div>
           There was an error 
          <pre style={{ whiteSpace: "normal" }}>{error}</pre>
        </div>
        );

  default:
    throw Error('Unhandled status: ${status}');
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
