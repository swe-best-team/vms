import React, { useEffect, useState } from 'react'

import { useAdmin } from 'context/AdminProvider'
import Card from 'components/Card'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const Vehicles = ({ driver }) => {
    const { getAllVehiclesByDriver } = useAdmin()

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        getAllVehiclesByDriver(driver).then(data => {
            console.log('vehicles found!')
            setVehicles(data)
        }).catch(err => { console.error(err) })
    }, [])

    return (
        <>
            <Typography
                variant='h5'
                sx={{ mt: 3, mb: 3, fontWeight: 'bold' }}
            >Vehicles of the driver:</Typography>
            <Grid container spacing={2}>
                {vehicles.map(v => {
                    const { _id, brand, model, capacity, year } = v
                    return (
                        <Grid key={_id} item xs={4}>
                            <Card
                                title={`${brand} ${model}`}
                                description={`Capacity: ${capacity}; Production year: ${year}`}
                                onClick={() => { }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default Vehicles