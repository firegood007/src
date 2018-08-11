const defaultState={
  userName: ' ',
  password:' '
};

export default (state = defaultState, action)=>{

if(action.type==='change_username'){
  const newState = JSON.parse(JSON.stringify(state));
  newState.userName=action.value;
  //console.log(newState.userName);
  return newState;
}

if(action.type==='change_password'){
  const newState = JSON.parse(JSON.stringify(state));
  newState.password=action.value;
//  console.log(newState.userName);
  return newState;
}

/*if(action.type==='check_info'){
  const newState = JSON.parse(JSON.stringify(state));
  console.log(newState.userName);
  console.log(newState.password);
  if(newState.userName==='haohanqi' && newState.password==='199424'){
     alert('success');
     return newState;
     //console.log(newState);
  }else{

    alert('fail');
    newState.userName=''
    newState.password=''
    return newState;
  //  console.log(newState);

}

}*/


return state



}
