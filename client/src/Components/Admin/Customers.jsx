import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAction } from '../../redux/actions/admin';
import AdminHome from './AdminNavbar';

function Customers() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.adminGS.data)
    console.log("customers is", users)

    useEffect(() => {
        dispatch(getUsersAction())
    }, [dispatch])
    return (
        <div>
            <AdminHome></AdminHome>
            <div>
                <div className="">
                    <h2 className=" text-center mb-4">Customers</h2>
                    <div className="bg-white">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="">
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id} className="border-b hover:bg-gray-100">
                                            <td className="p-3">{index + 1}</td>
                                            <td className="p-3">{user.name}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">{user.mobile}</td>
                                            <td className="p-3">{user.role}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="">
                                            No customers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Customers;
