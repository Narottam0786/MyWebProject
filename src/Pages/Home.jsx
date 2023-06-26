import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Drawer, Fab, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { GenralTabel } from '../Components/GenralTable';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@material-ui/icons/Add';
import { BaseUrl } from '../Services/HttpsFile';
import axios from 'axios';
import "./Home.css";
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { setData,addUser, editUser, deleteUser} from '../Redux/action';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const Home = () => {
    const column=[
        {name:"Id"},
        {name:"Name"},
        {name:"Email"},
        {name:"Phone"},
        {name:"City"},
        {name:"Zip Code"},
        {name:"Edit"},
        {name:"Delete"},
     ]
     const users = useSelector(state => state.data);
    const[UserData,setUserData]=useState([]);
    const [IsOpen,setIsOpen]=useState(false)
    const [IsEditOpen,setEditIsOpen]=useState(false);
    const [EditData,setEditData]=useState();
    const [forceRender, setForceRender] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address:{city:"",zipcode:""}
    });

    const [EditformData, setEditFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address:{city:"",zipcode:""}
    });
  
    const [open, setOpen] =useState(false);
    const [Message, setMessage] =useState("This is a success message!");
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      const updatedFormData = { ...formData };
  
      if (name.includes('.')) {
        // Handle nested properties
        const [parentKey, childKey] = name.split('.');
        updatedFormData[parentKey][childKey] = value;
      } else {
        // Handle non-nested properties
        updatedFormData[name] = value;
      }
  
      setFormData(updatedFormData);
    };
    const handleEditChange = (event) => {
      const { name, value } = event.target;
  
      if (name.includes('.')) {
        // Handle nested properties
        const [parentKey, childKey] = name.split('.');
        setEditFormData((prevFormData) => ({
          ...prevFormData,
          [parentKey]: {
            ...prevFormData[parentKey],
            [childKey]: value,
          },
        }));
      } else {
        // Handle non-nested properties
        setEditFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    };
const manageRows=(res)=>{
  let row=[]
 for(let i=0; i<res.length; i++){
    let rowData={
        id:res[i].id,name:res[i].name,Email:res[i].email,Phone:res[i].phone,City:res[i].address.city,ZipCode:res[i].address.zipcode,Edit:<IconButton color='primary' aria-label="delete"  size="small">
    <BorderColorIcon onClick={()=>{
         
         setEditFormData({
          id: res[i].id,
          name: res[i].name,
          email: res[i].email,
          phone: res[i].phone,
          address: { city:res[i].address.city,zipcode:res[i].address.zipcode },
        });
         setEditIsOpen(true);
    }} fontSize="inherit" />
  </IconButton>,Delete:<IconButton onClick={()=>handleDeleteUser(res[i].id)} style={{color:"crimson"}} aria-label="delete"  size="small">
    <DeleteIcon fontSize="inherit" />
  </IconButton>
  }
  
  row.push(rowData)
    console.log("name",res[i].name)
 }
 setUserData(row);
}

// const deleteUser=async(userId) => {
//   console.log("deleteUser",userId)
//   handleDeleteUser(userId)
//   try {
//     const response = await axios.delete(`${BaseUrl}/${userId}`);
//     console.log(response.data); // Optional: Handle the response as needed
//   } catch (error) {
//     console.error(error);
//   }
//   }

  const list = () => (
    <div
     style={{width:"100vh",height:"100%"}}
      role="presentation"
    >
        <div style={{marginTop:"100px"}}>
            <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h1 style={{color:"crimson"}}>Add New User</h1>
            </div>
        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="Name" style={{width:"40%"}} variant="outlined" value={formData.name} onChange={handleChange} name='name'/>
        <TextField id="standard-basic" label="email" style={{width:"40%"}}  variant="outlined" value={formData.email} onChange={handleChange} name='email'/>
        </div>

        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}} >
        <TextField id="standard-basic" label="phone" style={{width:"90%"}} variant="outlined" value={formData.phone} onChange={handleChange} name='phone' />
       
        </div>


        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="City" style={{width:"90%"}} value={formData.address.city} variant="outlined" onChange={handleChange} name='address.city'/>
        
        </div>

        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="Zip Code" style={{width:"90%"}} alue={formData.address.zipcode} variant="outlined" onChange={handleChange} name='address.zipcode' />
        
        </div>
        </div>
       

        <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Button variant="contained" color="secondary" onClick={handleAddUser}>Submit</Button>
        
        </div>
  
           
    
    </div>
  );

  const Editlist = (data) => {
   
console.log("Edit List",EditformData)
   return(
    <div
     style={{width:"100vh",height:"100%"}}
      role="presentation"
    >
        <div style={{marginTop:"100px"}}>
            <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h1 style={{color:"crimson"}}>Edit {EditformData.name} User</h1>
            </div>
        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="Name" style={{width:"40%"}} variant="outlined" value={EditformData.name} onChange={handleEditChange} name='name'/>
        <TextField id="standard-basic" label="email" style={{width:"40%"}}  variant="outlined" value={EditformData.email} onChange={handleEditChange} name='email'/>
        </div>

        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}} >
        <TextField id="standard-basic" label="phone" style={{width:"90%"}} variant="outlined" value={EditformData.phone} onChange={handleEditChange} name='phone' />
       
        </div>


        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="City" style={{width:"90%"}} value={EditformData.address.city} variant="outlined" onChange={handleEditChange} name='address.city'/>
        
        </div>

        <div style={{marginTop:"50px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
        <TextField id="standard-basic" label="Zip Code" style={{width:"90%"}} value={EditformData.address.zipcode} variant="outlined" onChange={handleEditChange} name='address.zipcode' />
        
        </div>
        </div>
       

        <div style={{marginTop:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Button variant="contained" color="secondary" onClick={()=>handleEditUser(EditformData.id)}>UPDATE</Button>
        
        </div>
  
           
    
    </div>
   )
   };

  

  const handleAddUser = async() => {
    const highestId = Math.max(...UserData.map(user => user.id), 0);
    const newId = highestId + 1;
    const newUser = { ...formData, id: newId };
    try {
      const response = await axios.post(BaseUrl,"/", newUser);
      console.log(response.data); // Optional: Handle the response as needed
    } catch (error) {
      console.error(error);
    }
    dispatch(addUser(newUser));
    setIsOpen(false);
    setMessage(`User ${newUser.name} Data Added`)
    handleClick();
  };

  const handleEditUser =async (userId) => {
    console.log("userId",userId);
    try {
      const response = await axios.put(`${BaseUrl}/${userId}`, EditformData);
      console.log(response.data); // Optional: Handle the response as needed
    } catch (error) {
      console.error(error);
    }
    dispatch(editUser(EditformData));
    setEditIsOpen(false);
    setMessage(`Data Of  ${EditformData.name} Edited `)
    handleClick()
  };

  const handleDeleteUser = async(userId) => {
    try {
      const response = await axios.delete(`${BaseUrl}/${userId}`);
      console.log(response.data); // Optional: Handle the response as needed
    } catch (error) {
      console.error(error);
    }
    dispatch(deleteUser(userId));
    setMessage(`User Delete`)
    handleClick();
  };

 

  useEffect(() => {
    if (users) {
      manageRows(users);
    } else {
      console.log("User Empty");
    }
    console.log("Rerender due to user");
  }, [users]);
    
   
  return (
    <Box  className='aki' style={{display:"flex",justifyContent:"center",alignItems:"center",background:"#F9F5F6",height:"100vh"}}>
       
      <Card className="scrollable-card" 
       style={{
        marginTop: "50px",
        width: "80%",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        height: "80%", // Set the desired height for the scrollable area
        overflow: "auto", // Enable scrolling when content exceeds the height
        scrollbarWidth: "10px", // Customize the width of the scrollbar
        scrollbarColor: "transparent transparent", // Customize the color of the scrollbar
      }}
      
      >
        
        <CardContent>
      
        <Box display="flex" justifyContent="end" alignItems="center" margin="20px" padding="10px">
        <Fab onClick={()=>setIsOpen(true)} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
        </Box >
        {
            UserData.length > 0 && <GenralTabel column={column} rows={UserData} />
        }
        </CardContent>
        
      
      </Card>
     
      <Drawer  open={IsOpen} onClose={()=>setIsOpen(false)}>
            {list()}
          </Drawer>

          <Drawer  open={IsEditOpen} onClose={()=>setEditIsOpen(false)}>
         {EditformData && Editlist(EditData)}
        </Drawer>



       
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          
          {Message}
        </Alert>
      </Snackbar>
     
         
      </Box>
  )
}
