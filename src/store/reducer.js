const INITIAL_STATE = {
    chart: {
        options: {
            chart: {
                id: 'chart'
            },
            xaxis: {
                categories: ['00:00', '00:01']
            }
        },
        series: []
    }
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'generate_chart':
            console.log(action)
            return { ...state, chart: {
                ...state.chart,
                series: action.payload.chart.series
            } };
        default:
            return state;
    }
}

export default reducer;