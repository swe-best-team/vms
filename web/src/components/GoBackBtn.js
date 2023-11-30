import React from 'react'

import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

const Logout = () =>
    <Link to='/'>
        <Button
            fullWidth
            variant='outlined'
            sx={{ mt: 3, mb: 2 }}
            startIcon={<ArrowBackIcon />}
        >Go back</Button>
    </Link>

export default Logout