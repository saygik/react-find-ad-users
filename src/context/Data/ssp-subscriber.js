import React, {useCallback, useEffect, useMemo, useState} from 'react'
import api from "../../api"


export const useSSPSubscriber = (token,signedIn,refreshingToken, refreshData) => {
    const [sspStatus, setSSPStatus]=useState(false)


    const refreshSSPStatus = useCallback(
        () => {
            api.getSSPStatus()
                .then(status=>setSSPStatus(status?.data || false ))
                .catch(()=>setSSPStatus(false ))
        },
        []
    );

    useEffect( ()=> {
            if (token && signedIn && !refreshingToken) {
                const onMessage= (data)=>{
                    console.log('-data-',data)
                    switch (data.ID) {
                        case 0:
                            setSSPStatus(data.Status)
                            return
                        case 1:
                            //actions.addMessage(data)
//                        queryClient.invalidateQueries('messages')
                            refreshData()
                            return
                        case 10:
  //                          actions.addLog(data)
                            return
                        case 11:
//                            actions.addLog(data)
                            return
                        default:
                    }
                }
                const onError = () => {
                    console.log('-dataerr-')
                    refreshSSPStatus()
                }

                if (token) {
                    //               actions.getMessages()
                    api.subscribeToMessages(token, onMessage,onError)
                } else {
                    api.unsubscribeToMessages()
                }
                return () => {
                    //               if (sse) sse.close();
                    api.unsubscribeToMessages()
                };
            } else api.unsubscribeToMessages()
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[token, signedIn, refreshingToken])
    return {sspStatus: !!token && signedIn && !refreshingToken && sspStatus, refreshSSPStatus}
}
