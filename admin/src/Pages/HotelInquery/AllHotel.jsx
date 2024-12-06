import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllHotel = () => {
    const [data, setData] = useState([])
    const getData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/hotel")
            if (res.status === 200) {
                const newDate = res.data.data
                setData(newDate.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteRecord = async (id) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/hotel/" + id)
            if (res.status === 200) {
                toast.success(res.data.message)
                getData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Hotel Inquery</h4>
                </div>
                {/* <div className="links">
                    <Link to="/add-banner" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div> */}
            </div>


            <section className="dis-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Where</th>
                            <th scope="col">Check In</th>
                            <th scope="col">Check Out</th>
                            <th scope="col">Rooms</th>
                            <th scope="col">Adults</th>
                            <th scope="col">Childrens </th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col" className='text-danger'>Action</th>
                            {/* <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.where}</td>
                                    <td>{new Date(item.checkIn).toLocaleDateString()}</td>
                                    <td>{new Date(item.checkOut).toLocaleDateString()}</td>
                                    <td>{item.numberofroom}</td>
                                    <td>{item.adults}</td>
                                    <td>{item?.children || 0}</td>
                                    <td>{item.hotelname}</td>
                                    <td>{item.hotelphone}</td>
                                    <td>{item.hotelemail}</td>
                                    <td>{item.hoteladdress}</td>
                                    {/* <td><Link to={`/edit-tag/${item._id}`} className="bt edit">Edit <i class="fa-solid fa-pen-to-square"></i></Link></td> */}
                                    <td><Link className="bt delete" onClick={() => deleteRecord(item._id)}>Delete <i class="fa-solid fa-trash"></i></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllHotel