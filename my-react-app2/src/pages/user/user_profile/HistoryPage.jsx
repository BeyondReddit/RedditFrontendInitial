import React from 'react';


import HistoryList from "./HistoryList.tsx";
import HistoryProvider from "./HistoryProvider.tsx";

import Top3List from "./Top3List.tsx";
import Top3Provider from "./Top3Provider.tsx"

const HistoryPage = () => {


    return (

        <div className="App">
            <header className="App-header">

                <HistoryProvider>
                    <HistoryList />
                </HistoryProvider>

                <Top3Provider>
                    <Top3List/>
                </Top3Provider>


            </header>
        </div>

    );
};

export default HistoryPage;