
const INITIAL_STATE = { input: '0', formula: '', result: '0' };

const submitNumber = (number) => {
    return {
        type: 'NUMBER',
        input: number
    }
}

const submitOperator = (operator) => {
    return {
        type: 'OPERATOR',
        input: operator
    }
}

const submitDecimal = () => {
    return {
        type: 'DECIMAL'
    }
}

const submitClear = () => {
    return {
        type: 'CLEAR'
    }
}

const submitEquals = () => {
    return {
        type: 'EQUALS'
    }
}

function removeLeadingZeros(str) {
    return str.replace(/^0+(?!\.|$)/, '')
}

function addLeadingZero(str) {
    return str.replace(/^\./, '0.')
}

function removeDoubleOperators(str) {
    return str.replace(/[\/\*\+-]+$/, (match) => {
        const lastChar = match.charAt(match.length - 1);
        const secondToLastChar = match.charAt(match.length - 2);
        if (lastChar === '-') {
            return match.slice(-2);
        }
        return lastChar;
    });
}

function removeLeadingOperator(str) {
    return str.replace(/^[\/|\*|\+](?!$)/, '').replace(/^--(?!$)/, '-')
}

function replaceDoubleNegatives(str) {
    return str.replace(/--/g, '+')
}

const inputReducer = (state = INITIAL_STATE, action) => {
    let newState = { ...state };
    if (state.formula.includes('=')) {
        newState.formula = state.result;
    }

    switch (action.type) {
        case 'NUMBER':
            newState.input = state.input.concat(action.input);
            newState.formula = state.formula.concat(action.input);
            break;
        case 'DECIMAL':
            if (state.input.includes('.')) {
                break;
            }
            newState.input = state.input.concat('.');
            newState.formula = state.formula.concat('.');
            break;
        case 'CLEAR':
            newState = INITIAL_STATE;
            break;
        case 'OPERATOR':
            newState.input = action.input;
            newState.formula = newState.formula.concat(action.input);
            break;
        case 'EQUALS':
            if (state.formula == '') {
                break;
            }
            newState.formula = replaceDoubleNegatives(state.formula)
            newState.result = String(eval(newState.formula))
            newState.input = newState.result
            newState.formula = state.formula.concat(' = ' + newState.result)
            break;
        default:
            return state;
    }

    newState.input = removeLeadingZeros(newState.input);
    newState.input = addLeadingZero(newState.input);
    newState.input = removeLeadingOperator(newState.input);

    newState.formula = removeLeadingZeros(newState.formula);
    newState.formula = addLeadingZero(newState.formula);
    newState.formula = removeDoubleOperators(newState.formula)

    return newState
}

const store = Redux.createStore(inputReducer);