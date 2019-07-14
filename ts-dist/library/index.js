const Shared = {
    methods: {
        setCellPositionTop: (list) => {
            if (list.length) {
                list.forEach((elm) => {
                    const _parent = elm;
                    if (_parent) {
                        const _cell = _parent.querySelector('.fp-tableCell');
                        if (_cell) {
                            _cell.style.setProperty('vertical-align', 'top');
                        }
                    }
                });
            }
        },
    }
};
export default Shared;
//# sourceMappingURL=index.js.map