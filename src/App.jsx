import { Metric } from "@tremor/react";
import "./App.css";
import Temprature from "./Temprature";

function App() {
    return (
        <div>
            <div className="flex justify-center items-center h-60 w-full mb-10 bg-gradient-to-r from-red-500 to-orange-500">
                <Metric className="mb-5 text-white">Temperature Convertor</Metric>
            </div>
            <Temprature />
        </div>
    );
}

export default App;
