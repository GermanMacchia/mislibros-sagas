import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Spinner(){
    return (
        <div>
            <div className="card">"
                <ProgressSpinner  style={{width: '80px', height: '80px' }} strokeWidth="7" fill="#201f1f" animationDuration=".5s"/>
            </div>
        </div>
    );
}