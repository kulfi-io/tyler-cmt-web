const Shared = {
    methods: {
        setCellPositionTop: (list: NodeListOf<Element>) => {
            if(list.length) {
                list.forEach((elm: Element) => {
                    const _parent = <HTMLDivElement>elm;
                    if(_parent) {
                        const _cell = <HTMLDivElement>_parent.querySelector('.fp-tableCell');
                        if(_cell) {
                            _cell.style.setProperty('vertical-align', 'top');
                        }
                    }
                });
            }
            
        },
    }
}

export default Shared;