import {useState,createContext} from 'react'


export const DataContext = createContext();

export const DataContextProvider = props => 
{
  const [isAdmin,setIsAdmin] = useState(false);
  const [users,setUsers] = useState([]);
  const [movies,setMovies] = useState('');
  const [usersLogin,setUsersLogin] = useState([]);
  const [name,setName]=useState('');
  const [members,setMembers]=useState([]);
  const [permissionArr,setPermission] = useState([]);
  const [subscriptons,setSubscriptions] = useState([]);
  const [find,setFind] = useState('');
  const [findF,setfindF] = useState(false);



 return (
   <DataContext.Provider value = {
     { 
       login: [usersLogin, setUsersLogin], 
       nameOfUser: [name, setName],
       admin:[isAdmin,setIsAdmin],
       usersArr:[users,setUsers],
       membersArr: [members,setMembers],
       moviesArr:[movies,setMovies],
       findMovies: [find,setFind],
       findFlag: [findF,setfindF] ,
       subscriptonsArr: [subscriptons,setSubscriptions]

      }}>
   {props.children}
   </DataContext.Provider>
 ) 
}