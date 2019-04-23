import Controller from '@ember/controller';

export default Controller.extend({
    queryParams:['isDone', 'isFav','isTrash','sortby','limit','offset'],
    isDone:null,
    isFav:null,
    isTrash:null,
    sortby:null,
    // limit:5, 
    // offset:0,
    actions:{
        sendForRefreshModel2(){
            this.send('refreshTheModel')
        },
        updateQueryParamsDropDown(params1, params2){
            this.send('updateQueryParams',params1, params2 )
        },
        // filterByTitle(param){
        //     // console.log(param)
        //     // console.log(this.store.findAll('task'))
        //     if (param !== '') {
        //         console.log(this.store.query('task', { title: param }))
        //         //return this.store.query('task', { title: param });
        //     } else {
        //         console.log(this.store.findAll('task'))
        //     //return this.store.findAll('task');
        //     }
        // }
    }
});
