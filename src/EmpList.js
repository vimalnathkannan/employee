import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpList = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate=useNavigate();

    const LoadDetail=(id)=>{
        navigate("/employee/detail/"+id);
    }
    const LoadEdit=(id)=>{
        navigate("/employee/edit/"+id);
    }
    const Removefunction=(id)=>{
        if(window.confirm('Do you want to remove')){
            fetch("http://localhost:8000/Employee/"+id,{
                method:"DELETE"
            }).then((res)=>{
                alert('Remove successfully.')
                window.location.reload();
            }).catch((err)=>{
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/Employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])
    return (
        <div className="container shadow p-3 mb-5 bg-body rounded">
            <div className="card">
                <div className="card-title">
                    <h2>Employee List</h2>
                </div>
                <div className="card-body">
                <div className="divbtn">
                  <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                </div>
                    <table className=" table table-bordered ">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td className="bg-dark text-white">ID</td>
                                <td className="bg-dark text-white">Name</td>
                                <td className="bg-dark text-white">Email</td>
                                <td className="bg-dark text-white">phone</td>
                                <td className="bg-dark text-white">Address</td>
                                <td className="bg-dark text-white">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            { empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address}</td>
                                        <td><a onClick={()=>{LoadEdit(item.id)}} className="btn btn-success">Edit</a>
                                            <a onClick={()=>{Removefunction(item.id)}} className="btn btn-danger">Remove</a>
                                            <a onClick={()=>{LoadDetail(item.id)}} className="btn btn-warning">Detail</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}

export default EmpList;