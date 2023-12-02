import React, { useEffect, useState } from 'react'

import { useAdmin } from 'context/AdminProvider'
import Card from 'components/Card'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const Maintenances = ({ maintainer }) => {
    const { getAllMaintenancesByMaintainer } = useAdmin()

    const [maintenances, setMaintenances] = useState([])

    useEffect(() => {
        getAllMaintenancesByMaintainer(maintainer._id)
            .then(data => {
                console.log('maintenances found!')
                setMaintenances(data)
            })
            .catch(err => { console.error(err) })
    }, [])

    return (
        <>
            <Typography
                variant='h5'
                sx={{ mt: 3, mb: 3, fontWeight: 'bold' }}
            >Maintenances of the maintainer:</Typography>
            <Grid container spacing={2}>
                {maintenances.map(m => {
                    const { vehicle, date } = m
                    return (
                        <Grid key={_id} item xs={12}>
                            <Card
                                title={`${vehicle}`}
                                description={date}
                                onClick={() => { }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default Maintenances