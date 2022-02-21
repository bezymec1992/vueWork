Vue.createApp({
    data() {
        return {
            valueInput: '',
            needDoList: [],
            completeList: []
        };
    },
    async mounted(){
        const data = await localStorage.getItem('needDoList')
        const dataComplete = await localStorage.getItem('completeList')
        data ? this.needDoList = JSON.parse(data) : null
        dataComplete ? this.completeList = JSON.parse(dataComplete) : null

    },
    methods: {
        handlyInput (event) {
            this.valueInput = event.target.value;
        },
        addTask () {
            if(this.valueInput === '') { return };
            
            this.needDoList.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = '';
            localStorage.setItem('needDoList', JSON.stringify(this.needDoList))
        },
        doCheck (index, type){
            if(type=== "need"){
                const completeMask = this.needDoList.splice(index, 1);
                this.completeList.push(...completeMask)
                localStorage.setItem('completeList', JSON.stringify(this.completeList))
                const toDoList = type === 'need' ? this.needDoList : this.completeList;
                localStorage.setItem('needDoList', JSON.stringify(this.needDoList))
            } else {
                const noCompleteMask = this.completeList.splice(index, 1);
                this.needDoList.push(...noCompleteMask);
                localStorage.setItem('completeList', JSON.stringify(this.completeList))
                const toDoList = type === 'need' ? this.needDoList : this.completeList;
                localStorage.setItem('needDoList', JSON.stringify(this.needDoList))
            }
        },
        removeMask (index, type) {
            const toDoList = type === 'need' ? this.needDoList : this.completeList;
            toDoList.splice(index,1);
            localStorage.setItem('needDoList', JSON.stringify(this.needDoList))
            localStorage.setItem('completeList', JSON.stringify(this.completeList))

        }
    }
}).mount('#app');