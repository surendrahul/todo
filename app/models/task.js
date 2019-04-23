import DS from 'ember-data';

export default DS.Model.extend({
    title:DS.attr('string'),
    description:DS.attr('string'),
    startDate:DS.attr('string'),
    dueDate:DS.attr('string'),
    created:DS.attr('string',{defaultValue:function(){
        return new Date()
    }}),
    completedTime:DS.attr('string',{defaultValue:''}),
    isDone:DS.attr('boolean',{defaultValue:false} ),
    isFav:DS.attr('boolean',{defaultValue:false}),
    isTrash:DS.attr('boolean',{defaultValue:false}),

    
});
