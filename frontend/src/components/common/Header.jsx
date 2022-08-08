import React from 'react';
import { Menubar } from 'primereact/menubar';

function Header(){
    const items = [
        {
            label: 'RentoCar',
            icon: 'pi pi-fw pi-car',
        }
    ];
    return(
        <Menubar model={items} style={{ 'backgroundColor': '#3F51B5' }} />
    )
}
export default Header;