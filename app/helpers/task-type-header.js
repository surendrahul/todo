import { helper } from '@ember/component/helper';

export function taskTypeHeader(params/*, hash*/) {
  let [isDone, isFav, isTrash]=params;
  if(isDone==='true'){
    return "All completed task"
  }else if(isDone==='false'){
    return 'All pending task'
  }else if(isFav==='true'){
    return 'These are all favourite task'
  }else if(isTrash==='true'){
    return 'All deleted task'
  }else{
    return 'These are all task.'
  }
}

export default helper(taskTypeHeader);
