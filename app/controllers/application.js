import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    actions:{
        refModelAppJs(){
            //console.log('hello world in application.js in controller')
            this.send('refreshTheModel')
        },
        
    }
});
