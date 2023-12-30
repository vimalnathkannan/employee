import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const{ empid }=useParams();

    const [empdata,empdatachange]=useState({})

    useEffect(()=>{
        fetch("http://localhost:8000/Employee/"+empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    },[]);
    return ( 
        <div className="container-md shadow-lg p-3 mb-5 bg-body rounded" >
        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title" style={{"textAlign":"center"}}>
                                <h2>Employee Detail</h2>
                            </div>
                            <div className="card-body"></div>
            { empdata &&
                <div style={{"textAlign":"center"}}>
                <h1>The Employee name is : {empdata.name} ({empdata.id})</h1>
                <h3>contact Details </h3>
                <h5>Email is: {empdata.email}</h5>
                <h5>phone is: {empdata.phone}</h5>
                <h5>address is: {empdata.address}</h5>
                <Link className="btn btn-danger" to="/">Back to list </Link>
                </div>
            }
        </div>
        </div>
     );
}
 
export default EmpDetail;