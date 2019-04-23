import Route from '@ember/routing/route';


export default Route.extend({
    
    queryParams: { 
        isDone:{refreshModel:true},  
        isFav:{refreshModel:true} ,
        isTrash:{refreshModel:true},
        sortby:{refreshModel:true},
        // limit:{refreshModel:true},
        // offset:{refreshModel:true}
        // name:{refreshModel:true},
        
    },
    
    model(params) {
         console.log(params)
       //console.log(this.store.peekAll('task'))
        let isDone=params.isDone,isFav=params.isFav,isTrash=params.isTrash,sortby=params.sortby;
         //console.log(`isDone: ${isDone} isFav: ${isFav} isTrash: ${isTrash} sortby ${sortby}`)
        // console.log(params)
        
       // var myAllTask= this.store.findAll('task').then(task=>{
        //     console.log("sort by title")
        //    console.log(task.sortBy('title'))
        //    console.log("sort by date")
        //    console.log(task.sortBy('startDate'))
           
       // })
    //    console.log(params.limit, params.offset)
       
        return this.store.findAll('task').then((tasks)=>{
            var secondFilteredTask;
            if(isDone==='true'){
                let firstFilteredTask=tasks.filterBy("isDone",true);
                // return f1;
                secondFilteredTask=firstFilteredTask.filterBy('isTrash',false);
                // return f2;
            } else if (isFav==='true'){
                let firstFilteredTask=  tasks.filterBy("isFav",true);
                //return f1;
                secondFilteredTask=firstFilteredTask.filterBy('isTrash',false);
                // return f2;
            }else if(isDone==='false'){
                let firstFilteredTask= tasks.filterBy('isDone', false);
                //return f1;
                secondFilteredTask=firstFilteredTask.filterBy('isTrash',false);
                // return f2;
            }else if(isTrash==='true'){
                secondFilteredTask= tasks.filterBy('isTrash',true)
                //  return f2;
            }else{
                secondFilteredTask= tasks.filterBy('isTrash',false)
                // return f2;
            }
            //console.log(f2.reverse())

            if(sortby==='titleAsc'){
                //console.log(secondFilteredTask.sortBy('title'))
                return secondFilteredTask.sortBy('title')
            }else if(sortby==='titleDesc'){
                return secondFilteredTask.sortBy('title').reverse()
            }else if(sortby==='startDateUp'){
                //console.log(secondFilteredTask.sortBy("startDate"))
                return secondFilteredTask.sortBy('startDate')
            }else if(sortby==='startDateDown'){
                return secondFilteredTask.sortBy('startDate').reverse()
            }else if(sortby==='addDateUp'){
                //console.log(secondFilteredTask.sortBy("startDate"))
                return secondFilteredTask
            }else if(sortby==='addDateDown'){
                return secondFilteredTask.reverse()
            }else {
                //console.log(secondFilteredTask)
                //console.log(secondFilteredTask.length);

                return secondFilteredTask.reverse()

            }

           // return secondFilteredTask.reverse();
        })
    },
    actions:{

        //this is for loading...
        loading(transition) {
            var controller = this.controllerFor('home');
            controller.set('loading', true);
            transition.finally(function() {
            //    setTimeout((controller)=>{
            //        console.log(controller)
            //         controller.set('loading', false)
            //    },1000,controller)
                Ember.run.later(()=>{
                    controller.set('loading',false)
                },1000)
            });
        },
        refreshTheModel(){
           // console.log("hello I am refresh Model in home.js")
            this.refresh()
        },

        //update the query in url for dropDown

        updateQueryParams(filter, sort){
            console.log(filter, sort)
            let isDone=null;
            let isFav=null;
            let isTrash=null;
            let sortby=null;
            if(sort!==undefined){
                sortby=sort;
            }
            if(filter==='completed'){
                isDone=true
            }else if(filter==='favourite'){
                isFav=true
            }else if(filter==='pending'){
                isDone=false;
            }else if(filter==='trash'){
                isTrash=true
            }
            //console.log(`isDone: ${isDone}, isFav: ${isFav}, isTrash: ${isTrash}, sortby: ${sortby}`)
            this.transitionTo('home', { queryParams: { isDone: isDone, isFav:isFav, isTrash:isTrash, sortby:sortby }});
        },
    },
});
