import { useEffect, useState } from "react";
import Button from "./Button";
const Calculator = () =>{
    const [numberStack, setNumberStack] = useState([]);
    const [firstNumber, setFirstNumber] = useState('');
    const pi = 3.1415926535897932384626433832795;
    const [operation,setOperation] = useState('');
    const [hasPoint, setHasPoint] = useState(false);
    const [hasSelected, setHasSelected] = useState(false);
    const [numberClicked, setNumberClicked] = useState(false);
    const [stack, setStack] = useState([]);
    const [history, setHistory] = useState([]);
    const handleNumberClick = (value) =>{
        if (value === 0 && numberStack.length === 0 && !numberClicked) {
            return;
        }
        else{
            if(numberStack.includes(pi)){
                setNumberStack([value]);
            }else{
                if(hasSelected){
                    return;
                }
                else{
                    setNumberClicked(true);
                    setNumberStack((prevStack) => [...prevStack, value]);
                }
            }
        }
    };
    const handleClearClick = () =>{
        setFirstNumber('')
        setStack([]);
        setNumberStack([]);
        setOperation('');
        setNumberClicked(false);
        setHasSelected(false);

    };
    const handlePointClick = (value) => {
        if (hasPoint) {
            return;
        } else {
            if (numberStack.length === 0) {
                setNumberStack(["0"]);
                setHasSelected(true);
            } else {
                setNumberStack((prevStack) => [...prevStack, value]);
            }
            setHasPoint(true);
        }
    };
    const handleDelClick = () =>{
        if (numberStack.length === 0) {
            return;
        }
        if(!hasSelected){
            setNumberStack((prevStack) => prevStack.slice(0, -1));
        }
    };
    const handlePiClick = () =>{
        if(numberStack.length !== 0){
            setNumberStack([pi]);
        }else{
            setNumberStack((prevStack) => [...prevStack, pi]);
        }
    };
    const handleOperationClick = (operation) => {
        let newExpression;
        if (numberStack.length === 0) {
            if(stack.length > 0){
                const updatedStack = stack.slice(0, -1);
                updatedStack.push(operation);
                setStack(updatedStack);
                setOperation(operation);
            }
        } else {
            let result;
            if (firstNumber !== '') {
                switch (operation) {
                    case '+':
                        result = parseFloat(firstNumber) + parseFloat(numberStack.join(''));
                        break;
                    case '-':
                        result = parseFloat(firstNumber) - parseFloat(numberStack.join(''));
                        break;
                    case '*':
                        result = parseFloat(firstNumber) * parseFloat(numberStack.join(''));
                        break;
                    case '/':
                        result = parseFloat(firstNumber) / parseFloat(numberStack.join(''));
                        break;
                    default:
                        return;
                }
                setFirstNumber(result.toString());
                setOperation(operation);
                setStack([result.toString(), operation]);
                setHasPoint(false);
                setNumberStack([]);
                newExpression = `${firstNumber} ${operation} ${numberStack.join('')} = ${result}`;
            }
            else{            
                setOperation(operation);
                setFirstNumber(numberStack.join(''));
                setStack([...numberStack, operation]);
                setHasPoint(false);
                setNumberStack([]);
                
            }

            }   
        if(newExpression !== undefined){
            setHistory([...history, newExpression]);
        }
    };
    
    const handleEqualsClick = () => {
        let result = 0;
        if(operation === '+'){
            result = parseFloat(firstNumber) + parseFloat(numberStack.join(''));
        }
        if(operation === 'x'){
            result = parseFloat(firstNumber) * parseFloat(numberStack.join(''));
        }
        if(operation === '-'){
            result = parseFloat(firstNumber) - parseFloat(numberStack.join(''));
        }
        if(operation === '÷'){
            result = parseFloat(firstNumber) / parseFloat(numberStack.join(''));
        }
        if(operation === '^'){
            result = Math.pow(parseFloat(firstNumber), parseFloat(numberStack.join('')));
        }
        const expression = `${firstNumber} ${operation} ${numberStack.join('')} = ${result}`;
        setHistory([...history, expression]);
        
        setHasSelected(false);
        setHasPoint(false);
        setStack([...stack, numberStack.join('')]);
        setNumberStack([result]);
        setFirstNumber('');
    };

    const handleConvert = () => { 
        if(numberStack.length === 0){
            return;
        }else{
            let convertedNumber = parseFloat(numberStack.join(''));
            let newNumber;
            if(convertedNumber < 0){
                newNumber = convertedNumber * -1;
            }else{
                newNumber = convertedNumber * -1;

            }
            setNumberStack([newNumber.toString()]);
        }
    };
    const handleSquareRoot = () => {
        if (numberStack.length === 0) {
            const dummy = 0;
            const squareRoot = Math.sqrt(dummy);
            const expression = `√${dummy} = ${squareRoot}`;
            setStack([`√${dummy}`]);
            setFirstNumber('');
            setHistory([...history, expression]);
            setNumberStack([squareRoot]);
            return;
        }
    
        const number = parseFloat(numberStack.join(''));
        const squareRoot = Math.sqrt(number);
        const expression = `√${number} = ${squareRoot}`;
        setStack(`√${number}`);
        setFirstNumber('');
        setHistory([...history, expression]);
        setNumberStack([squareRoot]);
    }
    
    const handleSquared = () => { 
        if(numberStack.length === 0){
            return;
        }
    }

    useEffect(() => {
        if(stack.length === 0){
            return;
        }
        console.log(history);
    }, [stack]); 

    return(
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="border-2 p-2 w-[80vw] flex flex-col items-center justify-center rounded md:w-[40vw] lg:w-[32vw] shadow-lg">
                    <div className="flex flex-col w-full mb-2">
                        <label className="h-8 text-right pr-2 text-lg ">
                            {stack}
                        </label>
                        <label
                            className="w-full rounded text-5xl h-14 text-right font-bold pr-2 overflow-hidden" style={{ direction: 'ltr', whiteSpace: 'nowrap', animation: 'scrollText linear infinite 5s' }}
                        >{numberStack.length === 0 ? '0': numberStack.join('')}</label>
                    </div>
                    <div className="grid-cols-7 w-full">
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "2nd"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "π"
                                onClick={handlePiClick}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "e"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "C"
                                onClick={handleClearClick}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24 font-bold"
                                label = "Del"
                                onClick={handleDelClick}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "x²"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "1/x"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "|x|"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "exp"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "mod"
                                
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "√x"
                                onClick={handleSquareRoot}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "("
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = ")"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "n!"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "÷"
                                onClick={() => handleOperationClick('÷')}
                            />
                        </div><div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "x^y"
                                onClick={() => handleOperationClick('^')}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "7"
                                onClick={() => handleNumberClick(7)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "8"
                                onClick={() => handleNumberClick(8)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "9"
                                onClick={() => handleNumberClick(9)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "x"
                                onClick={() => handleOperationClick('x')}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "10^x"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "4"
                                onClick={() => handleNumberClick(4)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "5"
                                onClick={() => handleNumberClick(5)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "6"
                                onClick={() => handleNumberClick(6)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "-"
                                onClick={() => handleOperationClick('-')}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "log"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "1"
                                onClick={() => handleNumberClick(1)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "2"
                                onClick={() => handleNumberClick(2)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "3"
                                onClick={() => handleNumberClick(3)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "+"
                                onClick={() => handleOperationClick('+')}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md md:w-20 lg:w-24"
                                label = "ln"
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "+/-"
                                onClick={handleConvert}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "0"
                                onClick={() => handleNumberClick(0)}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-1 shadow-md md:w-20 lg:w-24"
                                label = "."
                                onClick={() => handlePointClick('.')}
                            />
                            <Button
                                className="p-2 border rounded h-10 w-20 m-0 shadow-md    md:w-20 lg:w-24 font-bold"
                                label = "="
                                onClick={handleEqualsClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}   

export default Calculator