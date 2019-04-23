import Component from '@ember/component';

export default Component.extend({
    store:Ember.inject.service(),
    isEdit:false,
    //isDone:false,
    
    actions:{
        moveToTrash(id){
            let confirmation=confirm("do you  want to move in trash? this task can be restore.")
            if(confirmation){
                this.store.findRecord('task', id).then(task=>{
                    //task.deleteRecord(),
                    task.set('isTrash',true)
                    task.save();
                    this.refMod()
                })
            }    
        },
        deleteTaskFinally(id){
            let confirmation=confirm("this task can't be restore. it will delete permentaly. do u really want to delete?")
            if(confirmation){
                this.store.findRecord('task', id).then(task=>{
                    task.set('isTrash',false)
                    task.deleteRecord(),
                    task.save();
                    //this.send('sendTorefMod')
                    this.refMod()  
                    //console.log("refMod1")
                })
            } 
        },
        restoreTask(id){
            let confirmation=confirm("do you want to restore this task? this task will be added in your todo list.")
            if(confirmation){
                this.store.findRecord('task', id).then(task=>{
                    task.set('isTrash',false)
                    task.save();
                    this.refMod()
                })
            }    
        },
        editTask(task){
            this.set('task', task)
            this.set('isEdit',true)
            let startDate=new Date()
            //console.log(startDate)
            let startDay=startDate.getDate().toString()
            if(startDay.length==1){
                startDay= 0+startDay
            }
            let startMonth=(startDate.getMonth()+1).toString()
            if(startMonth.length==1){
                startMonth= 0+startMonth
            }
            let startYear=startDate.getFullYear()
            let newStartDate=`${startYear}-${startMonth}-${startDay}`
           // console.log(newStartDate)
           // console.log(new Date(newStartDate))
            this.set('startDate',newStartDate )
        },
        removeEditTaskSection(){
            let conformation=confirm("do you want to cancel editing process? nothing will chage.")
            if(conformation){
                this.set('isEdit',false)
                
            }
        },
        markAsDone(id){
            this.store.findRecord('task',id).then((task)=>{
                let completionDate=new Date()
            // console.log(startDate)
                let startDay=completionDate.getDate().toString()
                if(startDay.length==1){
                    startDay= 0+startDay
                }
                let startMonth=(completionDate.getMonth()+1).toString()
                if(startMonth.length==1){
                    startMonth= 0+startMonth
                }
                let startYear=completionDate.getFullYear()
                let newcompletionDate=`${startYear}-${startMonth}-${startDay}`
                if(task.get('isDone')){
                    task.set("isDone", false)
                    task.set('completedTime','')
                }else{
                    task.set("isDone", true)
                    task.set('completedTime',newcompletionDate)
                }
                task.save()
                this.refMod()                
            })
        },
        markAsFav(id){
            this.store.findRecord('task',id).then(task=>{
                //console.log(this)
                if(task.get('isFav')){
                    task.set('isFav',false)
                }else{
                    task.set('isFav',true)
                }
                task.save()
                this.refMod()
            })
        },
        popupForRestore(id){
            let conformation=confirm("first you have to restore this task for any changes. do you want to restore this task?")
            if(conformation){
                this.store.findRecord('task', id).then(task=>{
                    task.set('isTrash',false)
                    task.save();
                    this.refMod()
                })
            }
        },
    }
});
