import { helper } from '@ember/component/helper';

export function taskEmptyMsg(params) {
  let [isDone, isFav, isTrash]=params;
  if(isDone==='true'){
    return "No completed task"
  }else if(isDone==='false'){
    return 'No pending task'
  }else if(isFav==='true'){
    return 'No favourite task'
  }else if(isTrash==='true'){
    return 'Your trash is empty.'
  }else{
    return 'You have not added any task in your todo list!!!'
  }
}

export default helper(taskEmptyMsg);
