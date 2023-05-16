import { useState } from 'react';
import { useNavigate } from 'react-router'
import './style.css'
import { Link } from 'react-router-dom';
import AllMembers from './Manager';
import axios from 'axios';

export default function Home()
{
    const navigate = useNavigate();
    const [identity,setIdentity] = useState();
    const [name,setNmae] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHome,setIsHome] = useState(true)
    const [isManager,setIsManager] = useState(false);
    const [isUser,setIsUser] = useState(false);
    const [isButton,setIsButton] = useState(true);
   
    function Stafflogin()
    {
       setIsHome(false);
       navigate('/manger',AllMembers)
    }
    const getUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/person/${identity}`);
          const data = response.data;
          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      };
      
      const UserDetails = async () => {
        const findPerson = await getUserData(identity);
        setIsHome(false);
        console.log(findPerson);
        navigate('user',{state:{findPerson}});
      };
      
      const logIn = async () => {
        setIsModalOpen(false);
        if (identity === '123' && name === 'admin') {
          setIsManager(true);
          setIsButton(false);
        } else {
          const data = await getUserData(identity);
          if (data == null) {
            console.log(data)
            navigate('join');
            setIsHome(false);}
           else{ 
          if(data.name!=name)
          alert('The name does not match, try again')
          else{
            setIsButton(false);
            setIsUser(true);
          }}
        }
      };
    return<>
    <div>
    {isModalOpen && (
         <div className="modal">
         <div className="modal-content">
             <form>
                 <label>enter identity:</label>
                 <input
                 type='text'
                 onChange={(e)=>setIdentity(e.target.value)}></input>
                 <label>enter name:</label>
                 <input
                 type='text'
                 onChange={(e)=>setNmae(e.target.value)}></input>
             </form>
             <button onClick={logIn}>Log In</button>
         </div>
         </div>     
    )}
    </div>
    {isManager?(
        <header>
        <nav>
        <div>
        <ul>
            <li className="link" onClick={Stafflogin}>Introduce the members</li>
            <li><Link to='/about' className="link" onClick={()=>setIsHome(false)}>Corona Summary</Link></li>
            </ul>
        </div>
        </nav> 
        </header>
    ):(<></>)}
   {isUser?(
         <header>
         <nav>
         <div >
             <ul>
             <li><Link to='/about' className="link" onClick={()=>setIsHome(false)}>Corona Summary</Link></li>
             <li className="link" onClick={UserDetails}>Personal Area</li>
             </ul>
         </div>
         </nav> 
         </header>
   ):(<></>)}
   {isHome==true?(<>
   <div>
       <img src="background.png" height="680vh" width="100%" />
       <div className="textImage">
       <b >Welcome to the Corana management system</b><br/>
       {isButton?(
           <button className="button blue" onClick={()=>setIsModalOpen(true)}>Log In</button>
       ):(<></>)}</div>
    </div>
   </> ):(<></>)}
    </>
}