import Component from '@ember/component';

export default Component.extend({
    filterItems:[ {queryParams:{isDone:null, isFav:null, isTrash:null},itemValue:'All',selected:false},
        {queryParams:{isDone:true, isFav:null, isTrash:null},itemValue:'Completed', selected:false},
        {queryParams:{isDone:null, isFav:true, isTrash:null},itemValue:'Favourite', selected:false},
        {queryParams:{isDone:false, isFav:null, isTrash:null},itemValue:'Pending', selected:false},
        {queryParams:{isDone:null, isFav:null, isTrash:true},itemValue:'Trash', selected:false}
    ],
    sortItems:[
        {sortby:{ asc:'titleAsc',desc:'titleDesc'}, itemValue:'Title',selected:false,isClicked:false},
        {sortby:{asc:'startDateUp',desc:'startDateDown'}, itemValue:'Start date',selected:false,isClicked:false},
    ], 
    filterbyOptionItem:[
        {value:'all', selected:false, text:'All'},
        {value:'completed', selected:false, text:'Completed'},
        {value:'favourite', selected:false, text:'Favourite'},
        {value:'pending', selected:false, text:'Pending'},
        {value:'trash', selected:false, text:'Trash'}
    ],  
    sortbyOptionItem:[
        {value:'titleAsc', selected:false, text:'TitleAsc'},
        {value:'titleDesc', selected:false, text:'TitleDesc'},
        {value:'startDateUp', selected:false, text:'StartDateUp'},
        {value:'startDateDown', selected:false, text:'StartDateDown'},
    ],  
    actions:{
        activeFilter(index){
            for(let i=0; i<this.get('filterItems').length; i++){
                Ember.set(this.get('filterItems')[i],'selected',false)
            }
            Ember.set(this.get('filterItems')[index],'selected',true)
        },
        activeSortby(index){
            //console.log(params)
            for(let i=0; i<this.get('sortItems').length; i++){
                Ember.set(this.get('sortItems')[i],'selected',false)
                if(i===index){
                    Ember.set(this.get('sortItems')[index],'selected',true)
                    if(this.get('sortItems')[i].isClicked===true){
                        Ember.set(this.get('sortItems')[i],'isClicked',false)
                    }else{
                        Ember.set(this.get('sortItems')[i],'isClicked',true)
                    }
                    
                }else{
                    Ember.set(this.get('sortItems')[i],'isClicked',false)
                }
            }
        },

        //for drop down 
        updateFilterby(params){
            this.set('forFilter',params)
            this.updateQuery(this.get('forFilter'), this.get('forSort'))
        },
        updateSortby(params){
            this.set('forSort',params)
            this.updateQuery(this.get('forFilter'), this.get('forSort'))
        },
        
    },
    didInsertElement() {
    //didRender(){    
        this._super(...arguments) 
        //stateMantainance for filter by
        if(this.get("isFav")===null && this.get('isDone')===null && this.get('isTrash')===null){
            //console.log("isAll")
            Ember.set(this.get('filterItems')[0],'selected',true)
            Ember.set(this.get('filterbyOptionItem')[0],'selected',true)
        }else if(this.get('isDone')==='true'){
            Ember.set(this.get('filterItems')[1],'selected',true)
            Ember.set(this.get('filterbyOptionItem')[1],'selected',true)
            //console.log('this is completed')
        }else if(this.get('isFav')==='true'){
            Ember.set(this.get('filterItems')[2],'selected',true)
            Ember.set(this.get('filterbyOptionItem')[2],'selected',true)
            //console.log("this is not completed")
        }else if(this.get('isDone')==='false'){
            Ember.set(this.get('filterItems')[3],'selected',true)
            Ember.set(this.get('filterbyOptionItem')[3],'selected',true)
            //console.log('this is favourite')
        }else if(this.get('isTrash')==='true'){
            Ember.set(this.get('filterItems')[4],'selected',true)
            Ember.set(this.get('filterbyOptionItem')[4],'selected',true)
            //console.log("this is trash task")
        }

        //stateMantainance for sortBy link
        if(this.get('sortby')==='titleAsc' || this.get('sortby')==='titleDesc'){
            Ember.set(this.get('sortItems')[0],'selected',true)
            if(this.get('sortby')==='titleAsc'){
                Ember.set(this.get('sortItems')[0],'isClicked',true)
            }else if(this.get('sortby')==='titleDesc'){
                Ember.set(this.get('sortItems')[0],'isClicked',false)
            }
        }else if(this.get('sortby')==='startDateDown' || this.get('sortby')==='startDateUp'){
            Ember.set(this.get('sortItems')[1],'selected',true)
            if(this.get('sortby')==='startDateDown'){
                Ember.set(this.get('sortItems')[1],'isClicked',false)
            }else if(this.get('sortby')==='startDateUp'){
                Ember.set(this.get('sortItems')[1],'isClicked',true)
            }
        }else if(this.get('sortby')==='addDateDown' || this.get('sortby')==='addDateUp'){
            this.set('sortByAddDate',true)
            if(this.get('sortby')==='addDateDown'){
                this.set('sortByAddDateUp',true)
            }else if(this.get('sortby')==='addDateUp'){
                this.set('sortByAddDateUp',false)
            }
        }
        //stateMaintain for sortby dropdown
        if(this.get('sortby')==='titleAsc'){
            Ember.set(this.get('sortbyOptionItem')[0],'selected',true)
        }else if(this.get('sortby')==='titleDesc'){
            Ember.set(this.get('sortbyOptionItem')[1],'selected',true)
        }else if(this.get('sortby')==='startDateUp'){
            Ember.set(this.get('sortbyOptionItem')[2],'selected',true)
        }else if(this.get('sortby')==='startDateDown'){
            Ember.set(this.get('sortbyOptionItem')[3],'selected',true)
        }
    },
    

});
