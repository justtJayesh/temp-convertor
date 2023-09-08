import { useState } from "react";
import { TextInput, Title } from "@tremor/react";
import { Select, Button } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
    id: Date.now(),
    tempCurr: "",
    convertTo: "",
    updatedTemp: 0,
};

const Temprature = () => {
    const [tempInput, setTempInput] = useState(initialState);
    const [status, setStatus] = useState(false);

    const handleInputChange = (e) => {
        setStatus(false);
        setTempInput({ ...tempInput, tempCurr: e.target.value });
    };

    const handleCurrSelectItem = (e) => {
        setStatus(false);
        setTempInput({ ...tempInput, convertTo: e.target.value });
    };

    const handleConvertToCelsius = () => {
        if (tempInput.convertTo === "") {
            toast.error(`Please select Current Temperature"`);
        } else {
            // Check if the input is a valid number
            setStatus(false);
            if (tempInput.tempCurr != "" && !isNaN(tempInput.tempCurr)) {
                setTempInput({
                    ...tempInput,
                    updatedTemp: ((+tempInput.tempCurr - 32) * 5) / 9,
                });
                setStatus(true);
            } else {
                toast.error("Please enter a valid number for temperature");
            }
        }
    };

    const handleConvertToFahrenheit = () => {
        if (tempInput.convertTo === "") {
            toast.error(`Please select Current Temperature"`);
        } else {
            setStatus(false);
            // Check if the input is a valid number
            if (tempInput.tempCurr != "" && !isNaN(tempInput.tempCurr)) {
                setTempInput({
                    ...tempInput,
                    updatedTemp: (+tempInput.tempCurr * 9) / 5 + 32,
                });
                setStatus(true);
            } else {
                toast.error("Please enter a valid number for temperature");
            }
        }
    };

    // useEffect(() => {
    //     console.log(tempInput);
    // }, [tempInput]);

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex flex-col gap-4 border border-gray-300 p-8 rounded-lg m-auto w-9/12">
                <TextInput
                    placeholder="Enter Temperature"
                    value={tempInput.tempCurr}
                    onChange={handleInputChange}
                />

                {/* select current temperature */}
                <Select
                    value={tempInput.convertTo}
                    placeholder="Select current temperature"
                    size={"md"}
                    onChange={handleCurrSelectItem}
                >
                    <option value="celsius">Celsius</option>
                    <option value="fahrenheit">Fahrenheit</option>
                </Select>

                <Button
                    onClick={handleConvertToCelsius}
                    colorScheme="blue"
                    variant="outline"
                    isDisabled={status || tempInput.convertTo === "celsius"}
                >
                    Convert to Celsius
                </Button>
                <Button
                    onClick={handleConvertToFahrenheit}
                    colorScheme="blue"
                    variant="outline"
                    isDisabled={status || tempInput.convertTo === "fahrenheit"}
                >
                    Convert to Fahrenheit
                </Button>

                <hr />

                {status ? (
                    <Title className="border border-gray-300 rounded-lg p-3">
                        {tempInput.convertTo == "celsius"
                            ? tempInput.tempCurr +
                              "°C is equal to " +
                              tempInput.updatedTemp +
                              "°F."
                            : tempInput.tempCurr +
                              "°F is equal to " +
                              tempInput.updatedTemp.toFixed(2) +
                              "°C"}
                    </Title>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Temprature;
