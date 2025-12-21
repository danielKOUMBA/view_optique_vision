import React, { useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Dashboard from "../Components/dashboard";
import { apiFetch } from "../api/api";
import { ChartData } from "chart.js";


type My_Data= ChartData<'bar',number[],string>
export default function Tresorerie(){
const[res,setRes]=useState('')
const[data,setData]=useState<My_Data>({
    'labels':[],
    'datasets':[]
})
async function tresor(){
        try{
            const response=await apiFetch('/api/tresorerie',{
                method:'POST',
            })
            setRes(response)
        }catch(err){
            console.log(err)
        }
        
    }
 async function datas(){
        try{
            const response=await apiFetch('/api/dash',{
                method:'POST',
            })
            setData({
                labels:response.labels,
                datasets:[
                    { 
                    label:'Ventes',
                    data:response.values,
                    backgroundColor:'rgba(75,192,192,0.4)'
                    }
            ]
        })
        console.log(
            response
        )

        }catch(err){
            console.log(err)
        }
       }
    return(<>
    <Header/>
    <div className="flex justify-center" >
        <div className="absolute top-16">
                <h1 className="font-bold">Statistique en temps reel du chiffre d'affaire</h1>
                <div className="absolute top-25 ">
                    <p className="font-bold ">Tresorerie:{res?res+'fcfa':0+'fcfa'}</p>
                    <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={tresor}>Afficher la tresorerie</button>
                    
                </div>
               
            </div>
            <div className="absolute top-65 ">
                <p className="mt-1 font-bold">statistique comparant le type de verre:</p>
                
                <button className=" border border-blue-900 bg-blue-100 text-black rounded-lg p-1 cursor-pointer" onClick={datas}>rafraichir</button>
                <Dashboard data={data}/>
            </div>
    </div>
        
    <Footer/>
    </>)
}