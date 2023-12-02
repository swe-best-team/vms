import React from 'react'

import { StyleSheet } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'

const CustomCard = ({ title, description, onPress, ...props }) => {
    return (
        <Card style={styles.container}>
            <Card.Content>
                <Text variant='titleLarge'>{title}</Text>
                <Text variant='bodyMedium'>{description}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode='contained'
                    onPress={onPress}
                >SELECT {'->'}</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    }
})

export default CustomCard