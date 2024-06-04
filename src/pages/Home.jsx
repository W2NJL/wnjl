import React from 'react'
import PublicLayout from '../layouts/public/PublicLayout'
import { useNavigate } from 'react-router'

export default function Home(props) {

    const navigate = useNavigate();


    function onClick(){

        navigate(
            '/contact',{
                state:{
                    heyya: 'outkast',
                }
            }
        )


    }
  return (
  <PublicLayout>
    94.9 WHOM

    <button onClick={onClick}>lick me</button>
  </PublicLayout>
  )
}
