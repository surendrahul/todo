import Component from '@ember/component';

export default Component.extend({
    store:Ember.inject.service(),
    didInsertElement(){
        this._super(...arguments)
        this.$('.inputTitle').focus();
        //console.log(this)
    },
    actions:{
        saveNewTask(){
            //console.log(this.get('headline'))
            var title=this.get('title')
            var startDate=this.get('startDate')
            var dueDate=this.get('dueDate')
            var description=this.get('description')
            //validation
            if(title==undefined || title.trim().length==0){
                alert('title is mandatory')
            }else{
                if(startDate=='' || startDate==undefined){
                    alert("startDate is mandatory!!!")
                }else{
                    if(dueDate=="" || dueDate==undefined ){
                        alert("due date is mandatory..")
                    }
                }
            }
            if(description==undefined || description.trim().length==0){
                description="This task is without description..."
            }
            if(title!=undefined && title.trim().length!=0 && startDate!=undefined && dueDate!=undefined && startDate!='' && dueDate!=''){
                var newTask=this.store.createRecord('task',{
                    title:title.trim(),
                    description:description.trim(),
                    startDate:startDate,
                    dueDate:dueDate,
                    created:this.get("startDate1"),
                })
                newTask.save()
                this.setProperties({
                    title:'',
                    startDate:'',
                    dueDate:"",
                    description:'',
                    isNew:false,
                    
                })
                this.refMod();
               // console.log('task is saved')
            }
             
        },
        cancleNewTask(){
            let conformation=confirm("really you don't want to add new task?")
            if(conformation){
                this.set('isNew',false)
            }
            
        },
        
        
    },

});
