<img width="2391" height="1012" alt="image" src="https://github.com/user-attachments/assets/21ed8682-048a-4579-944b-e0ee9886366d" />

# 1
<img width="410" height="911" alt="image" src="https://github.com/user-attachments/assets/7488f1df-6643-42b3-b849-8b6cae862a40" />

# 2
<img width="410" height="911" alt="image" src="https://github.com/user-attachments/assets/d1bd494c-db84-4480-8994-96eb0cf3121d" />

# 3
<img width="410" height="911" alt="image" src="https://github.com/user-attachments/assets/54bfc4df-ea70-4f30-b6ad-466d1e953946" />

# 4
<img width="900" height="405" alt="Image" src="https://github.com/user-attachments/assets/0ec0348a-dfcb-44dc-9827-6161770bbfbb" />

# 5

## Squared
<img width="405" height="900" alt="Image" src="https://github.com/user-attachments/assets/e96edd96-97da-4481-8479-8d241c70fa4b" />
<img width="405" height="900" alt="Image" src="https://github.com/user-attachments/assets/d960cfe6-2727-44ce-b56b-f0be8de75f1d" />

## To the square root
<img width="405" height="900" alt="Image" src="https://github.com/user-attachments/assets/200dcdf0-b1a5-4702-88b6-bc7faab832c0" />

## Negative result check (no react)
> <img width="405" height="900" alt="Image" src="https://github.com/user-attachments/assets/7227959e-4473-4e4b-b17a-a5311cb213ed" />

> ### Realization
```
const numToSquareRoot = () =>
{
    let res = calcState.result.includes(minusSymbol)
        ? calcState.result
        : numToRes(Math.sqrt(resToNum(calcState.result)));
    
    setCalcState({...calcState,
        result: res,
        expression: calcState.result.includes(minusSymbol)
         ? '' 
         : `\u00B2\u221a${calcState.result}`,
    });
}
```
