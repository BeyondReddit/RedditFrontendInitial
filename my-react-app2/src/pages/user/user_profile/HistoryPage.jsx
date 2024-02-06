import React from 'react';


import HistoryList from "./HistoryList.tsx";
import HistoryProvider from "./HistoryProvider.tsx";

const HistoryPage = () => {


    return (

        <div className="App">
            <header className="App-header">

                <HistoryProvider>
                    <HistoryList />
                </HistoryProvider>


            </header>
        </div>

    );
};

export default HistoryPage;