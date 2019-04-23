import Component from '@ember/component';

export default Component.extend({
    
    isNew:false,
    headline:"add new task here!",
    
    
   
    actions:{
        toggelAddNewForm(){
            //this.toggleProperty('isNew')
            this.set('isNew', true)
            let startDate=new Date()
           // console.log(startDate)
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
        removeNewTaskSection(){
            let conformation=confirm("really you don't want to add new task?")
            if(conformation){
                this.set('isNew',false)
            }

        },
        sendToRefMod(){
            this.refModelAppHbs()
        }
    },
    

});
