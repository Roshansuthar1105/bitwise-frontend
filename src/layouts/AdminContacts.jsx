import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
function AdminContacts() {
  const { authorizationToken ,API } = useAuth();
  const [contact, setContact] = useState([]);
  const fetchContacts = async () => {
    const response = await fetch(`${API}/admin/contacts`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setContact(data);
    } 
  };
  const deletecontact = async(id)=>{
    try {
      const response = await fetch(`${API}/admin/contacts/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization: authorizationToken,
        }
      });
      if(response.ok){
        const data = await response.json();
        toast.success(data.message);
        fetchContacts();
      }else{
        toast.error("Contact not deleted !");
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <table className="data-table" >
          <th> Name</th>
          <th> Email</th>
          <th> Message</th>
          <th> Delete</th>
        {contact.map((curr, ind) => {
              const { username,email,message,_id } = curr;
              return (
                <tr key={ind}>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{message}</td>
                  <td><button onClick={()=>deletecontact(_id)}>delete</button></td>
                  </tr>
              );
            })}
      </table>
    </div>
  );
}

export default AdminContacts;
