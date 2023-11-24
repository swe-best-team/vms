import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import AdminProvider from 'context/AdminProvider'

import AdminScreen from 'screens/admin'
import CreateUserScreen from 'screens/admin/CreateUserScreen'
import CreateTaskScreen from 'screens/admin/CreateTaskScreen'
import CreateVehicleScreen from 'screens/admin/CreateVehicleScreen'

const AdminRouter = createBrowserRouter([
    {
        element: <AdminProvider />,
        children: [
            { path: '/', element: <AdminScreen /> },
            {
                path: '/create', children: [
                    { path: 'user', element: <CreateUserScreen /> },
                    { path: 'task', element: <CreateTaskScreen /> },
                    { path: 'vehicle', element: <CreateVehicleScreen /> }
                ]
            }
        ]
    }
])

export default AdminRouter