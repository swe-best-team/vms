import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

import { capitalizeFirstLetter } from 'utils'

const Field = ({ name, val }) => {
    if (name === '_id')
        name = 'ID'
    name = capitalizeFirstLetter(name)

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography variant='h6' sx={styles.key}>{name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h6' sx={styles.val}>{val}</Typography>
            </Grid>
        </Grid>
    )
}

const styles = {
    field: {
        flexDirection: 'row',
        marginVertical: 5
    },
    key: {
        flex: 1,
        textAlign: 'right',
        pr: 10,
    },
    val: {
        flex: 2,
        fontWeight: 400
    }
}

export default Field