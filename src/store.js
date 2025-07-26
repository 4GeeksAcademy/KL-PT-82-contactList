export const initialStore=()=>{
  return{
    contacts: [],
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      }
    
    default:
      throw Error('Unknown action.');
  }    
}
