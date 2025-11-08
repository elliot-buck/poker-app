import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-web';

// Custom component which gives its children the appropriate border styling
const SelectButtonContainer = ({ 
  style, 
  children, 
  ...props
}) => {
  const childArray = React.Children.toArray(children);

  // Return formatted children
  return (
    <View style={[styles.container, style]} {...props}> {
        React.Children.map(childArray, (child, index) => {
        const position =
          index === 0
            ? 'top'
            : index === childArray.length - 1
            ? 'bottom'
            : 'middle';

        // clone child and inject `position` prop
        return React.cloneElement(child, { position })})
    } </View>  
  ); 
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
})

export default SelectButtonContainer;