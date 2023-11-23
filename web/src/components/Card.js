import React from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const CustomCard = ({ title, description, onClick }) =>
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onClick}>Select</Button>
        </CardActions>
    </Card>

export default CustomCard