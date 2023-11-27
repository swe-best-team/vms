import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import Screen from 'components/Screen';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: '2.5rem',
    },
    listItem: {
        width: '100%',
        textAlign: 'center',
    },
    paper: {
        width: '50ch', 
        padding: '15px',
    },
    subheading: {
        fontSize: '1.5rem',
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 20,
    },
};

const ViewUsersScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const dummyUsers = [
            { id: 12345678, name: 'Yernur Aubakirov', usertype: 'driver' },
            { id: 21234567, name: 'Alikhan Baidussenov', usertype: 'driver' },
            { id: 31236955, name: 'Nurasyl Sakayev', usertype: 'fueler' },
            { id: 44567891, name: 'Kanagat Kurmambayev', usertype: 'maintainer' },
            { id: 55556666, name: 'Driverrr Driverrrrr', usertype: 'driver' },
            { id: 64567894, name: 'Driver Driver', usertype: 'driver' },
        ];
        setUsers(dummyUsers);
    }, []);

    return (
        <Screen maxWidth='sm'>
            <Typography variant='h3' sx={styles.heading}>
                List of Users
            </Typography>
            {users.length === 0 ? (
                <Typography variant='h1' sx={styles.subheading}>
                    No users found.
                </Typography>
            ) : (
                <List>
                    {users.map((user, index) => (
                        <ListItem key={user.id} sx={styles.listItem}>
                            <Paper elevation={3} style={{ ...styles.paper, marginBottom: index < users.length - 1 ? '1px' : '0' }}>
                                <Typography variant='h5'>
                                    Name: {user.name}
                                    <br />
                                    ID: {user.id}
                                </Typography>
                                <Typography variant='body1' color='textSecondary'>
                                    {user.usertype}
                                </Typography>
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            )}
        </Screen>
    );
};

export default ViewUsersScreen;
