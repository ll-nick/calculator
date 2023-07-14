function Button(props) {
    const handleClick = () => {
        props.onClick(props.value);
    };

    return (
        <button id={props.name} className={"button " + props.class} style={{ "gridArea": props.name }} onClick={handleClick}>{props.value}</button>
    )
}

function NumberButton(props) {
    return (
        <Button name={props.name} class="number" value={props.value} onClick={props.onClick}></Button>
    )
}

function OperatorButton(props) {
    return (
        <Button name={props.name} class="operator" value={props.value} onClick={props.onClick}></Button>
    )
}

function DecimalButton(props) {
    return (
        <button id="decimal" className="button" style={{ "gridArea": "decimal" }} onClick={props.onClick}>.</button>
    )
}

function ClearButton(props) {
    return (
        <button id="clear" className="button" style={{ "gridArea": "clear" }} onClick={props.onClick}>AC</button>
    )
}

function EqualsButton(props) {
    return (
        <button id="equals" className="button" style={{ "gridArea": "equals" }} onClick={props.onClick}>=</button>
    )
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="container">
                <div id="formula-display" className="display" style={{ "gridArea": "formula-display" }}>{this.props.formula}</div>
                <div id="display" className="display" style={{ "gridArea": "display" }}>{this.props.input}</div>
                <ClearButton onClick={this.props.submitClear}></ClearButton>
                <OperatorButton name="divide" value="/" onClick={this.props.submitOperator}></OperatorButton>
                <OperatorButton name="multiply" value="*" onClick={this.props.submitOperator}></OperatorButton>
                <NumberButton name="seven" value="7" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="eight" value="8" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="nine" value="9" onClick={this.props.submitNumber}></NumberButton>
                <OperatorButton name="subtract" value="-" onClick={this.props.submitOperator}></OperatorButton>
                <NumberButton name="four" value="4" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="five" value="5" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="six" value="6" onClick={this.props.submitNumber}></NumberButton>
                <OperatorButton name="add" value="+" onClick={this.props.submitOperator}></OperatorButton>
                <NumberButton name="one" value="1" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="two" value="2" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="three" value="3" onClick={this.props.submitNumber}></NumberButton>
                <NumberButton name="zero" value="0" onClick={this.props.submitNumber}></NumberButton>
                <DecimalButton onClick={this.props.submitDecimal}></DecimalButton>
                <EqualsButton onClick={this.props.submitEquals}></EqualsButton>
            </div>
        );
    }
}


// Connect to Redux store
const mapStateToProps = (state) => {
    return {
        formula: state.formula,
        input: state.input
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNumber: (number) => {
            dispatch(submitNumber(number))
        },
        submitOperator: (operator) => {
            dispatch(submitOperator(operator))
        },
        submitDecimal: () => {
            dispatch(submitDecimal())
        },
        submitClear: () => {
            dispatch(submitClear())
        },
        submitEquals: () => {
            dispatch(submitEquals())
        }
    }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const CalculatorContainer = connect(mapStateToProps, mapDispatchToProps)(Calculator);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CalculatorContainer />
            </Provider>
        );
    }
};

// Render main component
const container = document.getElementById('app-wrapper');
const root = ReactDOM.createRoot(container);
root.render(<AppWrapper />);