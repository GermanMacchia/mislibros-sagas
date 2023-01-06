import { Toast } from "primereact/toast"
import { useEffect, useRef } from "react"
import ReactDOM from 'react-dom'

export const ToastPortal = ( { info } ) => {
    const toastRef = useRef( null )

    useEffect( () => {
        if( toastRef.current ) {
            toastRef.current.show( {
                severity: info.severity,
                summary: info.summary,
                detail: info.detail,
                life: 3000
            } )
        }
    }, [ info ] )

    return info ? ReactDOM.createPortal( <Toast ref={ toastRef } />, document.querySelector( '#toast' ) ) : null
}