import React, { useState} from "react"
import logos from '../assets/logos.JPG'
import { apiFetch } from "../api/api"
import setToken from "../api/api"
import { Link, useNavigate } from "react-router-dom"


export default function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const navigate=useNavigate()
   
    
  async function handleSubmit(e){
            e.preventDefault()
            try{
                const data = await apiFetch('/api/login',{
                    method:'POST',
                    body:JSON.stringify({email,password })
                })

                if (data.token){
                    setToken(data.token)
                    navigate('/accueil')
                }else{
                    setError(data.erreur)
                    console.log(data.erreur)
                }

            }catch(err){
                console.log('erreur fetch:',err)
            }
       
    }
    return(<>
   <div className="flex items-center justify-center gap-2">
     <h2 className="font-bold">the view optique vision</h2>
     <img src={logos} alt="logos" className="w-20 rounded-full" />
   </div>
   {error && <div className="bg-red-500 text-center p-2 w-1/2 flex justify-center mx-auto rounded-lg">
      {error}
    </div>}
    <div className="flex justify-center items-center p-4 ">
        <form onSubmit={handleSubmit} className=" rounded-lg p-2">
            <input type="email" 
            placeholder="email" 
            value={email}
            className="mt-1 block w-full border border-gray-700 rounded-md px-3 py-2  focus:outline-none"
             required onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" 
            placeholder="mot de passe" 
            value={password}
            className="mt-1 block w-full border border-gray-700 rounded-md px-3 py-2  focus:outline-none" 
            required onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="mt-1 block bg-blue-200 rounded-lg border-b border-t border-l border-r border-blue-500 p-2 cursor-pointer" >se connecter</button>
            <Link to='/register' className="text-blue-bold hover:underline">modifier mon mot de passe?</Link>
        </form>
    </div>
    </>)
}