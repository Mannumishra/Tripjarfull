import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Mystyles.css';

const AllFlight = () => {
    const [oneWayData, setOneWayData] = useState([]);
    const [roundTripData, setRoundTripData] = useState([]);
    const [multiCityData, setMultiCityData] = useState([]);
    const [activeTable, setActiveTable] = useState('oneWay'); // Default table

    // Fetch data for one-way flights
    const getOneWayData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/flight");
            if (res.status === 200) {
                const allData = res.data.data
                const filterData = allData.filter((x) => x.returnDate === null)
                setOneWayData(filterData.reverse());
                setActiveTable('oneWay');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch data for round-trip flights
    const getRoundTripData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/flight");
            if (res.status === 200) {
                const allData = res.data.data
                const filterData = allData.filter((x) => x.returnDate !== null)
                setRoundTripData(filterData.reverse());
                setActiveTable('roundTrip');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch data for multi-city flights
    const getMultiCityData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/get-all-enquery");
            if (res.status === 200) {
                setMultiCityData(res.data.data.reverse());
                setActiveTable('multiCity');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOneWayData(); // Fetch one-way data by default
    }, []);


    const deleteOneWayRecord = async (id) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/flight-delete/" + id)
            if (res.status === 200) {
                toast.success("One Way Flight Deleted Successfully")
                getOneWayData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRoundRecord = async (id) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/flight-delete/" + id)
            if (res.status === 200) {
                toast.success("Round Trip Flight Deleted Successfully")
                getRoundTripData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMultiRecord = async (id) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/delete-record/" + id)
            if (res.status === 200) {
                toast.success("Multi-City Flight Deleted Successfully")
                getMultiCityData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Render table for one-way flight
    const renderOneWayTable = () => (
        <div>
            <h5>One Way Flight Inquiry</h5>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {oneWayData.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{new Date(item.departure).toLocaleDateString()}</td>
                            <td>{item.totalAdults}</td>
                            <td>{item?.totalChildren || 0}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td><button className='bt delete' onClick={() => deleteOneWayRecord(item._id)}>Delete <i className="fa-solid fa-trash"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Render table for round-trip flight
    const renderRoundTripTable = () => (
        <div>
            <h5>Round Trip Flight Inquiry</h5>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Return Date</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {roundTripData.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{new Date(item.departure).toLocaleDateString()}</td>
                            <td>{new Date(item.returnDate).toLocaleDateString()}</td>
                            <td>{item.totalAdults}</td>
                            <td>{item?.totalChildren || 0}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td><button className='bt delete' onClick={() => deleteRoundRecord(item._id)}>Delete <i className="fa-solid fa-trash"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Render table for multi-city flight
    const renderMultiCityTable = () => (
        <div>
            <h5>Multi-City Flight Inquiry</h5>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th className='text-danger'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {multiCityData.map((item, parentIndex) =>
                        item.allCity.map((allData, index) => (
                            <tr key={`${parentIndex}-${index}`} >
                                {/* Render Sr. No. for the first row of each group */}
                                {index === 0 && (
                                    <th rowSpan={item.allCity.length}>
                                        {parentIndex + 1}
                                    </th>
                                )}
                                <td>{allData.from}</td>
                                <td>{allData.to}</td>
                                <td>{new Date(allData.departure).toLocaleDateString()}</td>
                                <td>{allData.totalAdults}</td>
                                <td>{allData?.totalChildren || 0}</td>
                                {/* Render parent details only for the first row of the group */}
                                {index === 0 && (
                                    <>
                                        <td rowSpan={item.allCity.length}>{item.name}</td>
                                        <td rowSpan={item.allCity.length}>{item.phone}</td>
                                        <td rowSpan={item.allCity.length}>{item.email}</td>
                                        <td rowSpan={item.allCity.length}>{item.address}</td>
                                        <td rowSpan={item.allCity.length}><button onClick={() => { deleteMultiRecord(item._id) }} className='bt delete'>Delete <i className="fa-solid fa-trash"></i></button></td>
                                    </>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );


    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Flight Inquiry</h4>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    <button
                        onClick={getOneWayData}
                        className={activeTable === 'oneWay' ? 'active' : ''}
                    >
                        One Way Flight Inquiry
                    </button>
                    <button
                        onClick={getRoundTripData}
                        className={activeTable === 'roundTrip' ? 'active' : ''}
                    >
                        Round Trip Flight Inquiry
                    </button>
                    <button
                        onClick={getMultiCityData}
                        className={activeTable === 'multiCity' ? 'active' : ''}
                    >
                        Multi-City Flight Inquiry
                    </button>
                </div>
            </div>


            <section className="dis-table">
                {activeTable === 'oneWay' && renderOneWayTable()}
                {activeTable === 'roundTrip' && renderRoundTripTable()}
                {activeTable === 'multiCity' && renderMultiCityTable()}
            </section>
        </>
    );
};

export default AllFlight;
