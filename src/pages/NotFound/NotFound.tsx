import MainMenuButton from 'components/Buttons/MainMenuButton/MainMenuButton';
import * as React from 'react';
const NotFound = () => {
    return ( 
        <React.Fragment>
            Page Not found
            <MainMenuButton title='Main Menu' link='/' />
        </React.Fragment>
     );
}
 
export default NotFound;