const Shared = {
    methods: {
        setCellPositionTop: (parent: HTMLDivElement) => {
            if(parent) {
                const _cell = <HTMLDivElement>parent.querySelector('.fp-tableCell');
                if(_cell) {
                    _cell.style.setProperty('vertical-align', 'top');
                }
            }
        },
    }
}

export default Shared;