import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';

export default function Dashboard(props) {

    const navigate = useNavigate();

    const params = useParams();

    console.log(params);

useEffect(() => {
    //check if user is admin

    const isAdmin = false; 
    //if not redirect the user to /
    if(isAdmin){
        navigate('/');
    }
}, []);

  return (
    <div>
      Dash {params.userId}
    </div>
  )
}
