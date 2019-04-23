import Component from '@ember/component';

export default Component.extend({
    store:Ember.inject.service(),
    isSaveButtonEnable:true,
    actions:{
        cancleEditedTask(){
            console.log(" isSaveButton ", this.get('isSaveButtonEnable'))
            if(this.get('isSaveButtonEnable')===true){
                this.set('isEdit',false)
            }else{
                let conformation=confirm("do you want to cancel editing process? nothing will change.")
                if(conformation){
                    this.task.set("title",this.get('oTitle'))
                    this.task.set("description",this.get('oDescription'))
                    this.task.set("dueDate",this.get('oDueDate'))
                    this.task.set("startDate",this.get('oStartDate'))
                    this.task.save()
                    this.set('isEdit',false)
                }
            }
        },
        saveEditedTask(){
            var title=this.get('task.title')
            var description=this.get('task.description')
            var startDate=this.get('task.startDate')
            var dueDate=this.get("task.dueDate")
            //if description is blank then set default value of description
            if(description==undefined || description.trim().length==0){
                description="This task is without description..."
                this.task.set('description', description)
            }
            
            
            if(title!=undefined && title.trim().length!=0  && startDate!=undefined && dueDate!=undefined && startDate!='' && dueDate!=''){
                this.task.save()
                this.set('isEdit', false) 
            }
        },  
    },
    didInsertElement(){
        this._super(...arguments)
        this.$('.inputTitle').focus();
        this.store.findRecord('task', this.get("task.id")).then(task=>{
            this.set("oTitle",task.title)
            this.set('oDescription',task.description)
            this.set('oDueDate',task.dueDate)
            this.set('oStartDate',task.startDate)
        })
    },
    input(){
        this.set("nTitle",this.get('task.title'))
        this.set('nDescription',this.get('task.description'))
        this.set('nDueDate',this.get('task.dueDate'))
        this.set('nStartDate',this.get('task.startDate'))
        
        
        if(this.get('oTitle').trim()===this.get('nTitle').trim()){
            this.set("isTitleChanged",false)
            // console.log("title is same")
        }else{
            this.set("isTitleChanged",true)
            // console.log("title is not same")
        }
        if(this.get('oDescription').trim()===this.get('nDescription').trim()){
            this.set("isDescriptionChanged",false)
            // console.log("description is same")
        }else{
            this.set("isDescriptionChanged",true)
            // console.log("description is not same")
        }
        if(this.get('oStartDate')===this.get('nStartDate')){
            this.set("isStartDateChanged",false)
            // console.log("start date is same")
        }else{
            this.set("isStartDateChanged",true)
            // console.log(" startdate is not same")
        }
        if(this.get('oDueDate')===this.get('nDueDate')){
            this.set("isDueDateChanged",false)
            // console.log("duedate is same")
        }else{
            this.set("isDueDateChanged",true)
            // console.log("duedate is not same")
        }


        if(this.get('nTitle')==undefined || this.get('nTitle').trim().length==0){
            this.set("isTitleEmpty",true)
            //console.log('title is empty')
        }else{
            this.set("isTitleEmpty",false)
            //console.log('title is not empty')
        }
        if(this.get('nStartDate')=='' || this.get('nStartDate')==undefined){
            this.set("isNewStartDateEmpty",true)
            //console.log('startdate is empty')
        }else{
            this.set("isNewStartDateEmpty",false)
            //console.log('startDate is not empty')
        }
        if(this.get('nDueDate')=="" || this.get('nDueDate')==undefined ){
            this.set("isNewDueDateEmpty",true)
            //console.log('dueDate is empty')
        }else{
            this.set("isNewDueDateEmpty",false)
            //console.log('dueDate is not empty')
        }

        if(this.get("isTitleChanged")==false && this.get('isDescriptionChanged')==false && this.get('isStartDateChanged')==false && this.get('isDueDateChanged')==false){
            //console.log("nothing is changed")
            this.set('isSaveButtonEnable', true)
        }else{
            if(this.get("isTitleEmpty")==false && this.get("isNewStartDateEmpty")==false && this.get("isNewDueDateEmpty")==false){
                //console.log("somthing change without empty")
                this.set('isSaveButtonEnable', false)
            } else{
                //console.log('changes with empty')
                this.set('isSaveButtonEnable', true)
            }
        }
    },
})

