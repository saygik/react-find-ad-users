import React from 'react';
import PanelContainer from '../PanelContainer'
import AlertPanel from './AlertPanel'
import PhonesAndIconsPanel from './PhonesAndIconsPanel'
import ContentBodyPanel from './ContentBodyPanel'

export default function ContextPanel({user, searchValue}) {
//    console.log('-SAY1-',user.alerts)
    return (
        <>
           <PanelContainer background={'rgba(51, 197, 62, 0.05)'}>
               <PhonesAndIconsPanel user={user}/>
           </PanelContainer>
            {
                user.alerts && user.alerts.map((alert,index)=>{
//                    console.log('-SAY-',alert)
                    return (
                        <PanelContainer key={index} background={'inherit'} color={'rgb(202, 121, 7)'}>
                            <AlertPanel label={alert.title}/>
                        </PanelContainer>
                        )
                })
            }

            <PanelContainer background={'rgba(51, 197, 62, 0.01)'}>
                <ContentBodyPanel user={user} searchValue={searchValue}/>
           </PanelContainer>
        </>
    );
}
