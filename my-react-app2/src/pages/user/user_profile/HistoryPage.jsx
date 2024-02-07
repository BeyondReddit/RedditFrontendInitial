import React from 'react';


import HistoryList from "./HistoryList.tsx";
import HistoryProvider from "./HistoryProvider.tsx";

import Top3List from "./Top3List.tsx";
import Top3Provider from "./Top3Provider.tsx"

import DraftPostList from "./DraftPostList.tsx";
import DraftPostProvider from "./DraftPostProvider.tsx";

import './HistoryPage.css';

const HistoryPage = () => {


    return (

        <div className="App">
            <header className="App-header">
                <div className="component-container">
                    <HistoryProvider>
                        <HistoryList />
                    </HistoryProvider>
                </div>
                <div className="component-container">
                    <Top3Provider>
                        <Top3List/>
                    </Top3Provider>

                    <DraftPostProvider>
                        <DraftPostList/>
                    </DraftPostProvider>
                </div>

            </header>
        </div>

    );
};

export default HistoryPage;